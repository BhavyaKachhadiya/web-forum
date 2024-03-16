import { PrismaClient } from '@prisma/client'
import { connectDB } from "../../../../../utils";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export const GET = async(req, { params }) =>
{
    try {
        await connectDB();
        const post=await prisma.post.findMany({
            where:{id: params.id}
        })
        return NextResponse.json({post},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message},{status:502});
    } finally
    {
        await prisma.$disconnect();
    }
};
export const PUT = async(req, { params }) =>
{
    try {
        const {title,content} = await req.json();
        await connectDB();
        const updatedPost=await prisma.post.update({data:{title:title,content:content},where:{ id:params.id}})
        return NextResponse.json({updatedPost},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message},{status:500});
    } finally
    {
        await prisma.$disconnect();
    }
};
export const DELETE = async(req, { params }) =>
{
    try {
        await connectDB();
        const updatedPost=await prisma.post.delete({where:{ id:params.id}})
        return NextResponse.json({updatedPost},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message},{status:500});
    } finally
    {
        await prisma.$disconnect();
    }
};