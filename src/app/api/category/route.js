import { PrismaClient } from '@prisma/client';
import { connectDB } from "../../../../utils";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const handle = async (req, res) => {

const category = new URL(req.url, 'http://localhost/api/category').searchParams.get('name');
console.log(category);
  
  try {
    await connectDB();
    const posts = await prisma.post.findMany({ where: { category_name: category } });
    return NextResponse.json(posts); // Return JSON response directly
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }); // Return error message
  } finally {
    await prisma.$disconnect();
  }
};

export { handle as GET, handle as POST };
