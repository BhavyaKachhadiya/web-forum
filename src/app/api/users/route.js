import { PrismaClient } from '@prisma/client'
import { connectDB } from "../../../../utils";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export const GET = async(req) =>
{
    try {
        await connectDB();
        const users=await prisma.user.findMany({include:{posts:true,_count:true}});
        return NextResponse.json({users},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message},{status:500});
    } finally
    {
        await prisma.$disconnect();
    }
};