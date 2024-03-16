'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomReactQuill = styled(ReactQuill)`
.ql-toolbar.ql-snow , .ql-container.ql-snow{border: none !important;}
  

.ql-editor.ql-blank::before 
{
  color: #5C6470;
  font-weight: medium;
  font-size:1.3rem;
}

.ql-editor
{
  color: #5C6470;
  font-weight: medium;
  font-size:1.3rem;
}

.ql-container.ql-snow
{
  height:20rem;
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
  background: #15191E;
  border-color: #15191E;
  color: #5C6470;
}
.ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected,.ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,.ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected,.ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:hover .ql-fill {
  color:#FF1717;
  stroke:#FF1717;
}
`;
const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const [value, setValue] = useState('');

  const handleChange = (content) => {
    setValue(content);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const data = [
    {
      category: "Frontend",
      link: "frontend",
      subcategories: [
        { name: "Framework", link: "framework" },
        { name: "UI Framework", link: "ui-framework" },
        { name: "State Management", link: "state-management" }
      ]
    },
    {
      category: "Backend",
      link: "backend",
      subcategories: [
        { name: "Database", link: "database" },
        { name: "API", link: "api" },
        { name: "Authentication", link: "authentication" },
        { name: "ORM", link: "orm" }
      ]
    },
    {
      category: "Deployment",
      link: "deployment",
      subcategories: [
        { name: "DevOps", link: "devops" },
        { name: "Continuous Integration", link: "ci" },
        { name: "Containerization", link: "containerization" },
        { name: "Serverless", link: "serverless" }
      ]
    },
    {
      category: "Other",
      link: "other",
      subcategories: [
        { name: "Other", link: "other" },
      ]
    }
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Collect form data using formData (consider using state management for large forms)
    const title = event.target.title.value;
    const category_name = event.target.category.value;
    const content = value; // Assuming value contains the content from the editor
    const userId = session?.user?.id // Assuming you have access to the user ID from the session
    const user = session?.user?.id // Assuming you have access to the user ID from the session
    // const user = session?.user?.name // Assuming you have access to the user ID from the session


    try {
      const response = await axios.post('/api/posts', {
        title,
        userId,
        content,
        category_name,
        user
      });
      console.log("i am in")
      
      if (response.status === 200) {
        // Handle successful response (e.g., redirect to success page)
        router.push('/');
      } else{
        throw new Error('Failed to post data');
        
      }
    } catch (error) {
      console.error('Error:', error);
      notify();
      // Handle errors appropriately (e.g., display error messages to the user)
    }
  };

  const notify = () => toast.error('Please, do login', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition:"Bounce",
    });

  const [ReactQuill, setReactQuill] = useState(null);
  useEffect(() => {
    // Dynamically import ReactQuill
    async function importReactQuill() {
      try {
        const reactQuillModule = await import('react-quill');
        setReactQuill(() => reactQuillModule.default);
      } catch (error) {
        console.error('Error importing ReactQuill:', error);
      }
    }

    importReactQuill();
    if (typeof window !== 'undefined') {
      // Code that relies on browser-specific objects like `location`
      let location = window.location;
      console.log("Location : " + location);
    }

  }, []);
  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="top flex mt-5">
          <div className='img'>
            <Image src={session?.user?.image} className='border-0 rounded-full' width={75} height={75} />
          </div>
          <div className='lg:ml-10 ml-3 flex flex-col justify-between w-[100%]'>
            <div className='flex flex-row  justify-between '> <input type="text" name="title" id="title" className='outline-none bg-transparent placeholder:text-[1rem] placeholder:text-s-blue text-s-blue lg:w-[50rem] w-[15rem]' placeholder='Write a Question' /> <Link href={"/"} className='text-red'>X</Link> </div>
            <div className="tags">
              <select className='bg-transparent text-s-blue ' name="category" defaultValue={"other"}>
                {data.map((item, index) => (
                  <optgroup label={item.category} key={index} className='bg-blue'>
                    {item.subcategories && item.subcategories.map((subItem, subIndex) => (
                      <option value={subItem.link} key={subIndex} className='bg-blue focus-visible:bg-white' >{subItem.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="bottom mt-5">
          <CustomReactQuill
            value={value}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            theme="bubble"
            placeholder="Write Description"
            className="custom-toolbar"
          />
        </div>

        <div>
          <button type='submit' onError={()=> notify()} className='bg-red px-2 py-1 border-0 rounded-md'>Post</button>
          <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition="Bounce"
        />
        </div>
      </form>
    </div>
  )
}

export default page