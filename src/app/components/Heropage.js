import React from 'react'
import Sidebar from './Sidebar'
import Posts from './Posts'

const Heropage = () => {
  return (
    <div className='flex lg:gap-[7.5rem]'>
       <div><Sidebar/></div> 
        <div className=' w-[60rem] h-[4.69rem] '>
            <Posts/>
            
        </div> 
    </div>
  )
}

export default Heropage