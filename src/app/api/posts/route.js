import { PrismaClient } from '@prisma/client'
import { connectDB } from "../../../../utils";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export const GET = async (req) => {
    try {
        await connectDB();
        const posts = await prisma.post.findMany();
        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const POST = async (req, res) => {
    try {
        const { title, userId, content, category_name } = await req.json();

        await connectDB();
        const user =  await prisma.user.findFirst({
            where:{id:userId}
        })
        // Create the post with the user ID and category name
        const post = await prisma.post.create({
            data: {
                title,
                content,
                category_name,
                user: { connect: { id: userId } }, // Connect the post to the user by their ID
                userName: user.name, // Store the userName in the post table
                userImage: user.user_profile, // Store the userEmail in the post table
            },
            include: { user: true }, // Include the user information in the response
        });

        // Update the user's posts array using the $connect operation
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { posts: { connect: { id: post.id } } }, // Connect the post to the user's posts array
            include: { posts: true }, // Include the user's posts in the response
        });

        // Return the updated user including their posts in the response
        return NextResponse.json({ updatedUser }, { status: 200 });


    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
