'use client'
import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '@/app/components/Post';

const CategoryPosts = ({ category }) => {
  const [categoryPosts, setCategoryPosts] = useState([]);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const response = await axios.get(`/api/category?name=${category}`);
        setCategoryPosts(response.data);
      } catch (error) {
        console.error('Error fetching category posts:', error);
      }
    };

    fetchCategoryPosts();
  }, [category]);

  return (
    <div className='flex flex-col-reverse'>
      {categoryPosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const Page = ({ params }) => {
  return (
    <>
      <Navbar />
      <div className='flex gap-[10rem]'>
        <div><Sidebar /></div>
        <div className='w-[60rem] h-[4.69rem]'>
          {/* Render the CategoryPosts component passing the category parameter */}
          <CategoryPosts category={params.category} />
        </div>
      </div>
    </>
  );
};

export default Page;
