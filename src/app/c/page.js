import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Link from 'next/link';

const page = () => {
    const data = [
        {
            category: "Frontend",
            link: "/category/frontend",
            id:"frontend",
            subcategories: [
                { name: "Framework", link: "/category/framework" },
                { name: "UI Framework", link: "/category/ui-framework" },
                { name: "State Management", link: "/category/state-management" }
            ]
        },
        {
            category: "Backend",
            link: "/category/backend",
            id:"backend",
            subcategories: [
                { name: "Database", link: "/category/database" },
                { name: "API", link: "/category/api" },
                { name: "Authentication", link: "/category/authentication" },
                { name: "ORM", link: "/category/orm" }
            ]
        },
        {
            category: "Deployment",
            link: "/category/deployment",
            id:"deployment",
            subcategories: [
                { name: "DevOps", link: "/category/devops" },
                { name: "Continuous Integration", link: "/category/ci" },
                { name: "Containerization", link: "/category/containerization" },
                { name: "Serverless", link: "/category/serverless" }
            ]
        }
    ];
    return (
        <div>
            <Navbar />
            <div className='flex lg:gap-[7.5rem]'>
                <div><Sidebar /></div>
                <div className=' w-[60rem] h-[4.69rem]'>
                {data.map(categoryItem => (
                <div key={categoryItem.name} className="container-category mb-7" >
                    <h2 className='main-category-name text-[2rem] font-semibold text-red mb-4' id={categoryItem.id}>{categoryItem.category}</h2>
                    <div className='grid grid-cols-2 gap-x-10 gap-y-4'>
                        {categoryItem.subcategories && categoryItem.subcategories.map(subcategory => (
                            <div key={subcategory.name} className='border-2 border-[#5c6470] rounded-md'>
                                <Link href={subcategory.link} className='category-name text-xl mx-3 my-2 underline-offset-4 underline decoration-s-blue hover:text-red hover:decoration-red'>{subcategory.name}</Link>
                                <p className='mx-3 my-2'>Gain a fundamental understanding of <span className='text-red'>{subcategory.name}</span> by exploring the questions covered in this section.</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
                </div>
            </div>
        </div>
    )
}

export default page