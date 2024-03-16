'use client'
import Navbar from "@/app/components/Navbar";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Post from "@/app/components/Post";
export default function Page({ params }) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        // Function to fetch all posts
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/user/${params.u}`); // Assuming this endpoint returns all posts
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setUser(data.user); // Assuming the response contains an array of posts
                console.log(data)
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        // Call the fetchPosts function when the component mounts
        fetchUsers();

        // Clean up function (optional)
        return () => {
            // Any cleanup code can go here
        };
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div>
            <Navbar />

            <h2 className="text-[2rem] text-red font-semibold capitalize">All post</h2>
            <div className='flex flex-col-reverse'>
                {user?.posts?.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}