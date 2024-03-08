'use client'
import React, { useState } from 'react';
import Link from 'next/link';



const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const data = [
        {
            category: "All Post",
            link: "/",

        },
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
            link: "/category/other"
        }
    ];

    const listItems = data.map(category => (
        <li key={category.category}>
            {category.link ? (
                <Link href={category.link}>{category.category}</Link>
            ) : (
                <span>{category.category}</span>
            )}
            <ul>
                {category?.subcategories?.map(subcategory => (
                    <li className='ml-3 text-s-blue' key={subcategory.name}>
                        <Link href={subcategory.link}>{subcategory.name}</Link>
                    </li>
                ))}
            </ul>
        </li>
    ));

    return (
        <>
            <div className="lg:relative">
                {/* Hamburger menu icon for mobile */}
                <div className='lg:hidden'>
                    <button onClick={toggleMenu}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                {/* Sidebar content */}
                <ul className={`md:relative lg:flex lg:flex-col fixed lg:top-0 top-20 left-5 lg:left-0 z-50 lg:bg-[#15191E] bg-[#1c2228] w-60 lg:w-min ${isOpen ? 'hidden' : 'flex flex-col'} overflow-hidden transition-all duration-300 ease-in-out`}>
            <div className='my-[.5rem]'>
                <Link href={"/post/create"} className='bg-red px-2 py-1 font-medium text-[.75rem]'>Start Asking</Link>
            </div>
                    {listItems}
                </ul>
            </div>
        </>

    );
}

export default Sidebar;
