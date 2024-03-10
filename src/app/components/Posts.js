'use client'
import React, { useState, useEffect } from 'react';
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Function to fetch all posts
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts'); // Assuming this endpoint returns all posts
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.posts); // Assuming the response contains an array of posts
        console.log(data.posts)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Call the fetchPosts function when the component mounts
    fetchPosts();

    // Clean up function (optional)
    return () => {
      // Any cleanup code can go here
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
