'use client'
import {signIn} from "next-auth/react"
import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/navigation";
const page = () => {
    const router = useRouter();

    const handleSignInWithGoogle = async () => {
        await signIn("google");
        router.push("/"); // Redirecting to home page after signing in with Google
      };
    return (
        <div className='relative'>
        <div className=' w-[20rem] h-[20rem] bg-s-blue px-2 py-2 border-0 rounded-md'>
            <div>
                <label htmlFor="email">Email</label>
            
                <input type="email" name="email" id="" placeholder='Enter your Email' className='bg-transparent outline-none w-screen' />
            </div>

            <div className='mt-8'>
                <label htmlFor="password">Password</label>
            
                <input type="password" name="password" id="" placeholder='Enter your Password' className='bg-transparent outline-none w-screen' />
            </div>

            <div className='mt-5 '>
                <button className='py-1 px-2 bg-red w-[100%] border-0 rounded-md'>Login</button>
            </div>

            <hr className='mt-5' />
            <div className='mt-5'>
                <button className='py-1 px-2 bg-blue w-[100%] border-0 rounded-md'  onClick={handleSignInWithGoogle}>Login with Google</button>
            </div>

            <div className='mt-5'>
                <p className='text-[.75rem] text-center'>Want New create a new account? <Link href={"/signup"} className='text-blue font-semibold'>Sign Up</Link></p>
            </div>
        </div>
        <div className='absolute right-5 top-2 '>
                <Link href={"/"} className='text-red'>X</Link>
            </div>
        </div>
    )
}

export default page