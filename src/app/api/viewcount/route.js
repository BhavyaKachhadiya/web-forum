import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function handle(req, res) {
    try {
        const { postId } = await req.json(); // Change req.json() to req.body
    
        // Increment the post_view count for the specified post
        const postView =  await prisma.post.update({
          where: { id: postId },
          data: { post_view: { increment: 1 } },
        });
    
        return NextResponse.json({postView});
      } catch (error) {
        console.error('Error updating post view count:', error);
        return NextResponse.json({ success: false, error: 'An error occurred while updating post view count.' });
      }
    }
    
export { handle as GET, handle as POST };
