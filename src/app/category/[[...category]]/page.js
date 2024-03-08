import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import React from 'react'

const page = ({ params }) => {
  return (
    <>
      <Navbar />
      <div div className='flex gap-[10rem]'>
        <div><Sidebar /></div>
        <div className=' w-[60rem] h-[4.69rem] '>
          {params.category}

        </div>
      </div>
    </>
  )
}

export default page