import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/utils/auth';

// POST /api/blogs/[id]/like - Toggle like on blog
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const id = (await params).id;
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required to like blogs' },
        { status: 401 }
      );
    }

    // Rate limiting - check if user has liked/unliked recently
    const recentLike = await prisma.blogLike.findFirst({
      where: {
        userId: session.user.id,
        blogId: id,
        createdAt: {
          gte: new Date(Date.now() - 1000), // 1 second cooldown
        },
      },
    });

    if (recentLike) {
      return NextResponse.json(
        { error: 'Please wait before liking/unliking again' },
        { status: 429 }
      );
    }

    // Check if blog exists
    const blog = await prisma.blog.findUnique({
      where: { id},
      include: {
        _count: {
          select: { likes: true }
        }
      }
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if user already liked this blog
    const existingLike = await prisma.blogLike.findUnique({
      where: {
        userId_blogId: {
          userId: session.user.id,
          blogId: id,
        },
      },
    });

    let updatedBlog;

    if (existingLike) {
      // Unlike - remove the like
      await prisma.blogLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Get updated blog with new count
      updatedBlog = await prisma.blog.findUnique({
        where: { id},
        include: {
          _count: {
            select: { likes: true }
          }
        }
      });

      return NextResponse.json({ 
        liked: false, 
        likeCount: updatedBlog?._count.likes || 0,
        message: 'Blog unliked successfully' 
      });
    } else {
      // Like - add the like
      await prisma.blogLike.create({
        data: {
          userId: session.user.id,
          blogId:id,
        },
      });

      // Get updated blog with new count
      updatedBlog = await prisma.blog.findUnique({
        where: { id },
        include: {
          _count: {
            select: { likes: true }
          }
        }
      });

      return NextResponse.json({ 
        liked: true, 
        likeCount: updatedBlog?._count.likes || 0,
        message: 'Blog liked successfully' 
      });
    }
  } catch (error) {
    console.error('Error toggling blog like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}

// GET /api/blogs/[id]/like - Check if user liked the blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ liked: false });
    }

    const existingLike = await prisma.blogLike.findUnique({
      where: {
        userId_blogId: {
          userId: session.user.id,
          blogId: id,
        },
      },
    });

    return NextResponse.json({ liked: !!existingLike });
  } catch (error) {
    console.error('Error checking blog like status:', error);
    return NextResponse.json({ liked: false });
  }
}