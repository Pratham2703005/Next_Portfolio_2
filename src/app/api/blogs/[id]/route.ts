import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/utils/auth';

// GET /api/blogs/[id] - Get single blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const blog = await prisma.blog.findUnique({
      where: {id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Only return published blogs unless user is admin
    const session = await auth();
    const isAdmin = session?.user?.email === 'pk2732004@gmail.com';
    
    if (!blog.published && !isAdmin) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const id = (await params).id;
    if (!session?.user?.email || session.user.email !== 'pk2732004@gmail.com') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, excerpt, published, featured, category, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Generate new slug if title changed
    let slug = existingBlog.slug;
    if (title !== existingBlog.title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check if new slug already exists
      const slugExists = await prisma.blog.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'A blog with this title already exists' },
          { status: 400 }
        );
      }
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || content.substring(0, 200) + '...',
        published: published ?? existingBlog.published,
        featured: featured ?? existingBlog.featured,
        category: category ?? existingBlog.category,
        tags: tags ?? existingBlog.tags,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const id = (await params).id;
    if (!session?.user?.email || session.user.email !== 'pk2732004@gmail.com') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Delete all related likes first
    await prisma.blogLike.deleteMany({
      where: { blogId: id},
    });

    // Delete the blog
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}