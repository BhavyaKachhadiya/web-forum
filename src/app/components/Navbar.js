import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between'>
        <div className='font-semibold text-[1rem]'><Link href={"/"}> WEB <span className='text-red'>FORUM</span></Link></div>
        <div className='flex gap-3 text-s-blue font-semibold'>
            <div className='Search flex justify-center items-center  bg-[#5c647025] p-1 border-0 rounded-sm'><input type="search" name="search" id="" placeholder='Search' className='outline-none bg-transparent text-s-blue font-semibold placeholder:text-s-blue placeholder:font-semibold w-[10rem]' /><svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.563 5.28048C10.563 6.44574 10.1847 7.52214 9.54734 8.39545L12.762 11.612C13.0793 11.9293 13.0793 12.4447 12.762 12.762C12.4446 13.0793 11.9291 13.0793 11.6117 12.762L8.39709 9.54548C7.52361 10.1852 6.44699 10.561 5.28151 10.561C2.36398 10.561 0 8.19743 0 5.28048C0 2.36352 2.36398 0 5.28151 0C8.19903 0 10.563 2.36352 10.563 5.28048ZM5.28151 8.93619C5.76168 8.93619 6.23714 8.84163 6.68076 8.65792C7.12438 8.4742 7.52746 8.20492 7.86699 7.86546C8.20652 7.52599 8.47585 7.12299 8.65961 6.67946C8.84336 6.23593 8.93794 5.76055 8.93794 5.28048C8.93794 4.8004 8.84336 4.32503 8.65961 3.88149C8.47585 3.43796 8.20652 3.03496 7.86699 2.6955C7.52746 2.35603 7.12438 2.08675 6.68076 1.90304C6.23714 1.71932 5.76168 1.62476 5.28151 1.62476C4.80134 1.62476 4.32587 1.71932 3.88225 1.90304C3.43863 2.08675 3.03555 2.35603 2.69602 2.6955C2.35649 3.03496 2.08716 3.43796 1.90341 3.88149C1.71966 4.32503 1.62508 4.8004 1.62508 5.28048C1.62508 5.76055 1.71966 6.23593 1.90341 6.67946C2.08716 7.12299 2.35649 7.52599 2.69602 7.86546C3.03555 8.20492 3.43863 8.4742 3.88225 8.65792C4.32587 8.84163 4.80134 8.93619 5.28151 8.93619Z" fill="#5C6470"/>
</svg>
 </div>
            <div className='bg-[#5c647025] p-1 border-0 rounded-sm'><button>Login</button></div>
        </div>
    </div>
  )
}

export default Navbar