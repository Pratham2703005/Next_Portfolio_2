import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { auth } from '@/utils/auth';
import BlogPostServer from '@/components/blog/BlogPostServer';
interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
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

async function getBlog(slug: string, trackView: boolean = false): Promise<Blog | null> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
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
    }) as Blog | null;

    if (!blog) {
      return null;
    }

    // Only return published blogs unless user is admin
    const session = await auth();
    const isAdmin = session?.user?.email === 'pk2732004@gmail.com';
    
    if (!blog.published && !isAdmin) {
      return null;
    }

    // Track view server-side to prevent duplication
    if (trackView) {
      await prisma.blog.update({
        where: { id: blog.id },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });
    }

    // Convert dates to strings for serialization
    return {
      ...blog,
      createdAt: blog.createdAt.toString(),
      updatedAt: blog.updatedAt.toString(),
    };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
}
type BlogProps = Promise<{slug:string}>;
export async function generateMetadata(props : {params : BlogProps}): Promise<Metadata> {
  const {slug} = await props.params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const excerpt = blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';

  return {
    title: `${blog.title} | Your Portfolio Blog`,
    description: excerpt,
    keywords: blog.tags.length > 0 ? blog.tags.join(', ') : undefined,
    authors: [{ name: blog.author.name }],
    openGraph: {
      title: blog.title,
      description: excerpt,
      type: 'article',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author.name],
      tags: blog.tags,
      url: `/blog/${blog.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: excerpt,
    },
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
  };
}

// type BlogProps =  Promise<{slug:string}>;

// export default async function BlogPostPage(
//   props: {params : BlogProps}
// ) {
//   const {slug} = await props.params;
//   // Track view on server side
//   const blog = await getBlog(slug, true)
  
//   if (!blog) {
//     notFound();
//   }
//   return <BlogPostClient blog={blog}/>;
// }
export default async function BlogPostPage(props: {params : BlogProps}) {
  const {slug} = await props.params;
  const blog = await getBlog(slug, true);
  const session = await auth();
  
  if (!blog) {
    notFound();
  }

  return <BlogPostServer blog={blog} session={session} />;
}

// components/blog/BlogPostServer.tsx (Server Component)
