import { Suspense } from 'react';
import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
import Footer from '@/components/shared/Footer';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogControls from '@/components/blog/BlogControls';
import BlogTable from '@/components/blog/BlogTable';
import BlogPagination from '@/components/blog/BlogPagination';

export const metadata: Metadata = {
  title: 'Blog | Your Portfolio',
  description: 'Thoughts, insights, and experiences from my journey in tech. Explore articles about web development, programming, and technology.',
  keywords: ['blog', 'tech', 'programming', 'web development', 'tutorials', 'insights'],
  openGraph: {
    title: 'Blog | Your Portfolio',
    description: 'Thoughts, insights, and experiences from my journey in tech',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Your Portfolio',
    description: 'Thoughts, insights, and experiences from my journey in tech',
  },
};

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  featured: boolean;
  category: string | null;
  tags: string[];
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  _count: {
    likes: number;
  };
}

interface BlogsResponse {
  blogs: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

async function getBlogs(
  page: number = 1,
  limit: number = 10,
  search: string = '',
  sortBy: string = 'createdAt',
  sortOrder: string = 'desc'
): Promise<BlogsResponse> {
  try {
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.BlogWhereInput = {
      published: true,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy clause
    const orderBy: Prisma.BlogOrderByWithRelationInput = {
      [sortBy]: sortOrder as 'asc' | 'desc',
    };

    const [blogs, totalCount] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy,
        skip,
        take: limit,
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
      }),
      prisma.blog.count({ where }),
    ]);
    

    const totalPages = Math.ceil(totalCount / limit);

    // Convert dates to strings for serialization
    const serializedBlogs = blogs.map(blog => ({
      ...blog,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    }));

    return {
      blogs: serializedBlogs as Blog[],
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      blogs: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

interface SearchParams {
  searchParams : Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function BlogPage({
  searchParams,
} :SearchParams
) {
  const s = await searchParams;
  const page = Number(s.page) || 1;
  const search = (s.search as string) || '';
  const sortBy = (s.sortBy as string) || 'createdAt';
  const sortOrder = (s.sortOrder as string) || 'desc';
  
  const initialData = await getBlogs(page, 10, search, sortBy, sortOrder);

  return (
    <>
      <div className="max-w-7xl mx-auto text-white">
        <div className="container mx-auto px-4 py-20">
          {/* Server-rendered header */}
          <BlogHeader />
          
          {/* Client component for search and controls */}
          <Suspense fallback={<div>Loading controls...</div>}>
            <BlogControls initialSearch={search} />
          </Suspense>
          
          {/* Server-rendered blog table */}
          <BlogTable 
            blogs={initialData.blogs}
            sortBy={sortBy}
            sortOrder={sortOrder}
            totalCount={initialData.pagination.totalCount}
          />
          
          {/* Server-rendered pagination */}
          {initialData.pagination.totalPages > 1 && (
            <BlogPagination
              currentPage={initialData.pagination.currentPage}
              totalPages={initialData.pagination.totalPages}
              totalCount={initialData.pagination.totalCount}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}