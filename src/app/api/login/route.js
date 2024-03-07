import { PrismaClient } from '@prisma/client'
import { connectDB } from "../../../../utils";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();
export const POST = async(req) =>
{
    try {
        const {email,password} = await req.json();
        if( !email || !password)
        {
        return NextResponse.json({error: "Invalid Data"},{status:422});

        }
        await connectDB();
        const existUser = await prisma.user.findFirst({where:{email}})
        if(!existUser)
        {
            return NextResponse.json({message: "User not registered"},{status:401});
        }

        const isPasswordCorrect = await bcrypt.compare(password,existUser.password);
        if(!isPasswordCorrect)
        {
            return NextResponse.json({error:"Invalid Password"},{status:403});
        }
        return NextResponse.json({message:"logged in",user:existUser},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message},{status:500});
    } finally
    {
        await prisma.$disconnect();
    }
};