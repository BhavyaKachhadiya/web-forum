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


export const POST = async(req) => {
    try {
        const { title, userId, content, category_name } = await req.json();
        if (!title || !userId || !content || !category_name) {
            return NextResponse.json({ error: "Invalid Data" }, { status: 422 });
        }

        await connectDB();

        // Find or create the user
        let user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            // Create a new user if not found
            user = await prisma.user.create({
                data: {
                    id: userId, // Assuming ID is passed in the request
                    // Add other user fields as needed
                }
            });
        }

        // Create the post with the user ID
        const post = await prisma.post.create({
            data: {
                title,
                userId,
                content,
                category_name
            }
        });

        return NextResponse.json({ post }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};