import { PrismaClient } from '@prisma/client'
import { connectDB } from "../../../../utils";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export const GET = async(req) =>
{
    try {
        await connectDB();
        const posts =await prisma.post.findMany();
        return NextResponse.json({posts},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message},{status:500});
    } finally
    {
        await prisma.$disconnect();
    }
};


export const POST = async(req) =>
{
    try {
        const {title,userId,content} = await req.json();
        if(!title|| !userId || !content)
        {
        return NextResponse.json({error: "Invalid Data"},{status:422});

        }
        await connectDB();
        const user = await prisma.user.findFirst({where: {id: userId}});
        if (!user)
        {
            return NextResponse.json({message: "Invalid User"},{status:401});
        }
        const post = await prisma.post.create({data: {title,userId,content}});
        return NextResponse.json({post},{status:200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message},{status:500});
    } finally
    {
        await prisma.$disconnect();
    }
};