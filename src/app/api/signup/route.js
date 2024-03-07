import { PrismaClient } from '@prisma/client'
import { connectDB } from "../../../../utils";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();
export const POST = async(req) =>
{
    try {
        const {name,email,password} = await req.json();
        if(!name || !email || !password)
        {
        return NextResponse.json({error: "Invalid Data"},{status:422});

        }
        await connectDB();
        const existUser = await prisma.user.findFirst({where:{email}})
        if(existUser)  return NextResponse.json({message:"User already regsitered"},{status: 403});

        const hashPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({data:{name,email,password:hashPassword}});
        return NextResponse.json({user},{status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message},{status:500});
    } finally
    {
        await prisma.$disconnect();
    }
};