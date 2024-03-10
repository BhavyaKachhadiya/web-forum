import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function handle(req, res) {
  try {
    const { postId } = await req.json(); // Corrected the syntax here

    // Increment the post_like count for the specified post
    await prisma.post.update({
      where: { id: postId },
      data: { post_like: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json({ success: false, error: 'An error occurred while liking the post.' });
  }
}

export { handle as GET, handle as POST };
