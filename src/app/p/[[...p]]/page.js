'use client'
import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const modules = {
    toolbar: [],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };

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


`;
const Page = ({ params }) => {
    const [postData, setPostData] = useState({});
    const [likeCount, setLikeCount] = useState(postData?.post?.[0]?.post_like); 
    const [DislikeCount, setDisLikeCount] = useState(postData?.post?.[0]?.post_dislike); 
    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/post/${params.p}`);
            if (response.ok) {
                const data = await response.json();
                setPostData(data);
                console.log(data);
            } else {
                console.error('Failed to fetch post data');
            }
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    };
    
    
    let date = postData?.post?.[0]?.post_date;
    let newdate = String(date);
    let fdate = newdate.substring(0, 10)
    
    const handleLike = async () => {
        try {
            // Call the API route to increment the post_like count
            await axios.post('/api/like', { postId: postData?.post[0]?.id});
    
            // Fetch updated post data to get the latest post_like count
            await fetchPost();
    
            // Update the like count in the UI
            setLikeCount(prevCount => prevCount + 1);
            console.log("Liked");
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    const handleDisLike = async () => {
        try {
            // Call the API route to increment the post_like count
            await axios.post('/api/dislike', { postId: postData?.post[0]?.id});
    
            // Fetch updated post data to get the latest post_like count
            await fetchPost();
    
            // Update the like count in the UI
            setDisLikeCount(prevCount => prevCount + 1);
            console.log("UnLiked");
        } catch (error) {
            console.error('Error Disliking post:', error);
        }
    };
    
    useEffect(() => {
        fetchPost(); // Fetch post data when the component mounts
    }, [params.p]); // Re-run fetchPost when params.p changes

    return (
        <>
            <Navbar />
            <div className='h-[10rem] bg-s-blue my-5 flex justify-evenly items-center flex-col'>
                <div className="c">
                    <p className='font-medium text-[.75rem] bg-red w-min px-[.35rem] py-[.1rem] border-0 rounded-md'>{postData?.post?.[0]?.category_name}</p>
                </div>
                <div className="post title">
                    <p className='font-medium lg:text-[1.3rem] text-[.8rem] text-center'>{postData?.post?.[0]?.title}</p>
                </div>
            </div>

            {postData && (
                <div>
                <div className='profile flex'>
                    <div className='img'>
                        <Image src={postData?.post?.[0]?.userImage} className='border-0 rounded-full' height={100} width={100}></Image>
                    </div>
                    <div className="detail flex justify-between flex-col ml-6">
                        <div className="p1">
                            <div className="name text-[.75rem] font-medium">{postData?.post?.[0]?.userName}</div>
                            <div className="post-date text-[.75rem] font-medium text-s-blue ">{fdate}</div>
                        </div>
                        <div className="p2 flex gap-3">

                            <div className='view flex gap-2'>

                                <div className="view-icon">

                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <g clip-path="url(#clip0_15_66)">

                                            <path d="M9.99999 1.125C7.19443 1.125 4.9479 2.41875 3.31249 3.95859C1.68749 5.48438 0.600681 7.3125 0.086792 8.56758C-0.0277913 8.84531 -0.0277913 9.15469 0.086792 9.43242C0.600681 10.6875 1.68749 12.5156 3.31249 14.0414C4.9479 15.5813 7.19443 16.875 9.99999 16.875C12.8055 16.875 15.0521 15.5813 16.6875 14.0414C18.3125 12.5121 19.3993 10.6875 19.9167 9.43242C20.0312 9.15469 20.0312 8.84531 19.9167 8.56758C19.3993 7.3125 18.3125 5.48438 16.6875 3.95859C15.0521 2.41875 12.8055 1.125 9.99999 1.125ZM4.99999 9C4.99999 7.65734 5.52677 6.36967 6.46445 5.42027C7.40213 4.47087 8.6739 3.9375 9.99999 3.9375C11.3261 3.9375 12.5978 4.47087 13.5355 5.42027C14.4732 6.36967 15 7.65734 15 9C15 10.3427 14.4732 11.6303 13.5355 12.5797C12.5978 13.5291 11.3261 14.0625 9.99999 14.0625C8.6739 14.0625 7.40213 13.5291 6.46445 12.5797C5.52677 11.6303 4.99999 10.3427 4.99999 9ZM9.99999 6.75C9.99999 7.99102 9.00346 9 7.77776 9C7.53124 9 7.29513 8.95781 7.0729 8.88398C6.88193 8.8207 6.65971 8.94023 6.66665 9.14414C6.67707 9.38672 6.71179 9.6293 6.77776 9.87187C7.25346 11.6719 9.08332 12.7406 10.8611 12.259C12.6389 11.7773 13.6944 9.92461 13.2187 8.12461C12.8333 6.66563 11.559 5.68477 10.1423 5.625C9.94096 5.61797 9.8229 5.83945 9.8854 6.03633C9.95832 6.26133 9.99999 6.50039 9.99999 6.75Z" fill="#5C6470" />

                                        </g>

                                        <defs>

                                            <clipPath id="clip0_15_66">

                                                <rect width="20" height="18" fill="white" />

                                            </clipPath>

                                        </defs>

                                    </svg>



                                </div>

                                <div className="view-number text-[.75rem] font-medium text-s-blue "><span>{postData?.post?.[0]?.post_view}</span></div>

                            </div>

                            <div className='comments flex gap-2'>

                                <div className="comments-icon">

                                    <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <g clip-path="url(#clip0_15_64)">

                                            <path d="M3.03178 10.2631C3.36865 9.65547 3.26553 8.9084 2.77396 8.41035C2.04178 7.6666 1.6499 6.77344 1.6499 5.84375C1.6499 3.73535 3.84303 1.59375 7.1499 1.59375C10.4568 1.59375 12.6499 3.73535 12.6499 5.84375C12.6499 7.95215 10.4568 10.0938 7.1499 10.0938C6.69959 10.0938 6.26303 10.0506 5.85053 9.97422C5.49303 9.90781 5.12178 9.9543 4.79521 10.1137C4.65428 10.1834 4.5099 10.2498 4.36209 10.3129C3.81209 10.552 3.23115 10.7611 2.64678 10.9105C2.74303 10.7578 2.8324 10.6084 2.91834 10.459C2.95615 10.3959 2.99396 10.3295 3.02834 10.2631H3.03178ZM-9.86555e-05 5.84375C-9.86555e-05 7.23164 0.591151 8.50332 1.57771 9.50605C1.54678 9.5625 1.5124 9.62227 1.48146 9.67539C1.1274 10.2863 0.714901 10.8873 0.223339 11.4053C-0.00353615 11.6377 -0.0619737 11.9764 0.0652138 12.2652C0.199276 12.5607 0.494901 12.75 0.824901 12.75C2.30303 12.75 3.79834 12.3084 5.04271 11.7639C5.20771 11.6908 5.37271 11.6145 5.53084 11.5381C6.0499 11.6377 6.59303 11.6875 7.1499 11.6875C11.0996 11.6875 14.2999 9.07109 14.2999 5.84375C14.2999 2.61641 11.0996 0 7.1499 0C3.20021 0 -9.86555e-05 2.61641 -9.86555e-05 5.84375ZM14.8499 15.9375C15.4068 15.9375 15.9465 15.8844 16.469 15.7881C16.6271 15.8645 16.7921 15.9408 16.9571 16.0139C18.2015 16.5584 19.6968 17 21.1749 17C21.5049 17 21.8005 16.8107 21.9312 16.5186C22.0618 16.2264 21.9999 15.8877 21.773 15.6586C21.2849 15.1406 20.8724 14.5396 20.5149 13.9287C20.484 13.8723 20.4496 13.8158 20.4187 13.7594C21.4087 12.7533 21.9999 11.4816 21.9999 10.0938C21.9999 6.95937 18.9783 4.39941 15.1868 4.25664C15.3277 4.76133 15.3999 5.29258 15.3999 5.84375V5.86367C18.3974 6.08613 20.3499 8.10488 20.3499 10.0938C20.3499 11.0234 19.958 11.9166 19.2258 12.657C18.7343 13.1551 18.6312 13.9055 18.968 14.5098C19.0058 14.5762 19.0437 14.6426 19.078 14.7057C19.164 14.8551 19.2568 15.0045 19.3496 15.1572C18.7652 15.0078 18.1843 14.802 17.6343 14.5596C17.4865 14.4965 17.3421 14.4301 17.2012 14.3604C16.8746 14.201 16.5033 14.1545 16.1458 14.2209C15.7299 14.3006 15.2968 14.3404 14.8465 14.3404C12.7255 14.3404 11.0652 13.4605 10.144 12.2719C9.59396 12.4512 9.01646 12.584 8.42521 12.6637C9.59053 14.6027 12.0312 15.9375 14.8499 15.9375Z" fill="#5C6470" />

                                        </g>

                                        <defs>

                                            <clipPath id="clip0_15_64">

                                                <rect width="22" height="17" fill="white" />

                                            </clipPath>

                                        </defs>

                                    </svg>





                                </div>

                                <div className="comment-number text-[.75rem] font-medium text-s-blue "><span>1k</span></div>

                            </div>

                            <button className='like flex gap-2 '  onClick={handleLike} >

                                <div className="like-icon">

                                    <svg  width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <path className='active:fill-red focus:ring focus:fill-red ' d="M12.2422 0.0356663C13.2578 0.23297 13.918 1.19293 13.7148 2.17945L13.625 2.612C13.418 3.62508 13.0352 4.58883 12.5 5.46531H18.125C19.1602 5.46531 20 6.28109 20 7.28658C20 7.98853 19.5898 8.59941 18.9883 8.90296C19.4141 9.23685 19.6875 9.74908 19.6875 10.322C19.6875 11.2099 19.0312 11.9498 18.168 12.1091C18.3398 12.3861 18.4375 12.7086 18.4375 13.0539C18.4375 13.8621 17.8945 14.5489 17.1445 14.7841C17.1719 14.9093 17.1875 15.0421 17.1875 15.1787C17.1875 16.1842 16.3477 17 15.3125 17H11.5039C10.7617 17 10.0391 16.7875 9.42188 16.3891L7.91797 15.414C6.875 14.7386 6.25 13.6003 6.25 12.3823V10.9291V9.10785V8.16306C6.25 7.05513 6.76953 6.01169 7.65625 5.31734L7.94531 5.09347C8.98047 4.28908 9.6875 3.15838 9.94531 1.89867L10.0352 1.46612C10.2383 0.4796 11.2266 -0.161637 12.2422 0.0356663ZM1.25 6.0724H3.75C4.44141 6.0724 5 6.61499 5 7.28658V15.7858C5 16.4574 4.44141 17 3.75 17H1.25C0.558594 17 0 16.4574 0 15.7858V7.28658C0 6.61499 0.558594 6.0724 1.25 6.0724Z" fill="#5C6470" />

                                    </svg>



                                </div>

                                <div className="like-number text-[.75rem] font-medium text-s-blue"><span >{postData?.post?.[0]?.post_like}</span></div>

                            </button>

                            <button className='unlike flex gap-2' onClick={handleDisLike}>

                                <div className="unlike-icon">

                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <path className='active:fill-red focus:ring focus:fill-red ' d="M12.2422 17.9622C13.2578 17.7533 13.918 16.7369 13.7148 15.6923L13.625 15.2344C13.418 14.1617 13.0352 13.1412 12.5 12.2132H18.125C19.1602 12.2132 20 11.3494 20 10.2848C20 9.54156 19.5898 8.89474 18.9883 8.57334C19.4141 8.2198 19.6875 7.67744 19.6875 7.0708C19.6875 6.1307 19.0312 5.34729 18.168 5.17856C18.3398 4.88528 18.4375 4.54379 18.4375 4.1782C18.4375 3.32247 17.8945 2.5953 17.1445 2.34622C17.1719 2.21364 17.1875 2.07303 17.1875 1.9284C17.1875 0.863762 16.3477 0 15.3125 0H11.5039C10.7617 0 10.0391 0.22498 9.42188 0.646817L7.91797 1.67931C6.875 2.39443 6.25 3.59968 6.25 4.8893V6.428V8.3564V9.35675C6.25 10.5299 6.76953 11.6347 7.65625 12.3699L7.94531 12.6069C8.98047 13.4586 9.6875 14.6558 9.94531 15.9896L10.0352 16.4476C10.2383 17.4922 11.2266 18.1711 12.2422 17.9622ZM1.25 14.1416H3.75C4.44141 14.1416 5 13.5671 5 12.856V3.8568C5 3.1457 4.44141 2.5712 3.75 2.5712H1.25C0.558594 2.5712 0 3.1457 0 3.8568V12.856C0 13.5671 0.558594 14.1416 1.25 14.1416Z" fill="#5C6470" />

                                    </svg>





                                </div>

                                <div className="unlike-number text-[.75rem] font-medium text-s-blue "><span>{postData?.post?.[0]?.post_dislike}</span></div>

                            </button>

                        </div>

                    </div>

                </div>
                <div>
                <CustomReactQuill
                value={postData?.post?.[0]?.content}
                readOnly={true}
                modules={modules}
            />
                </div>
                </div>
            )}
        </>

    )

}



export default Page
