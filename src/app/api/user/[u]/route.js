import { PrismaClient } from '@prisma/client'
import { connectDB } from "../../../../../utils";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export const GET = async (req,{ params }) => {
    try {
        await connectDB();
        const user = await prisma.user.findFirst(
            {where: {name :params.u},include:{posts:true,_count:true,Comment:true}}
        );
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


