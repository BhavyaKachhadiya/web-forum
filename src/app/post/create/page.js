'use client'
import Image from 'next/image'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import Link from 'next/link';

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
`;
const page = () => {
  const [value, setValue] = useState('');

  const handleChange = (content) => {
    setValue(content);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
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
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const toolbarStyle = {
    color: 'red', // Change the color to your desired color
  };
  const data = [
    {
      category: "Frontend",
      link: "/category/frontend",
      subcategories: [
        { name: "Framework", link: "/category/frontend/framework" },
        { name: "UI Framework", link: "/category/frontend/ui-framework" },
        { name: "State Management", link: "/category/frontend/state-management" }
      ]
    },
    {
      category: "Backend",
      link: "/category/backend",
      subcategories: [
        { name: "Database", link: "/category/backend/database" },
        { name: "API", link: "/category/backend/api" },
        { name: "Authentication", link: "/category/backend/authentication" },
        { name: "ORM", link: "/category/backend/orm" }
      ]
    },
    {
      category: "Deployment",
      link: "/category/deployment",
      subcategories: [
        { name: "DevOps", link: "/category/deployment/devops" },
        { name: "Continuous Integration", link: "/category/deployment/ci" },
        { name: "Containerization", link: "/category/deployment/containerization" },
        { name: "Serverless", link: "/category/deployment/serverless" }
      ]
    },
    {
      category: "Other",
      link: "/category/other",
      subcategories: [
        { name: "Other", link: "/category/other" },
      ]
    }
  ];

  return (
    <div>
      <div className="top flex mt-5">

        <div className='img'>
          <Image src={"/image.png"} width={75} height={75} />
        </div>
        <div className='lg:ml-10 ml-3 flex flex-col justify-between w-[100%]'>
          <div className='flex flex-row  justify-between '> <input type="text" name="question" id="" className='outline-none bg-transparent placeholder:text-[1rem] placeholder:text-s-blue text-s-blue lg:w-[50rem] w-[15rem]' placeholder='Write a Question' /> <Link href={"/"} className='text-red'>X</Link> </div>
          <div className="tags">
            <select className='bg-transparent text-s-blue ' defaultValue={"/category/other"}>
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
        <button className='bg-red px-2 py-1 border-0 rounded-md'>Post</button>
      </div>
    </div>
  )
}

export default page