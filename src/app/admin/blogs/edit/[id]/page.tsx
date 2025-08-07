import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import AdminAuthCheck from '@/components/admin/AdminAuthCheck';
import BlogForm from '@/components/admin/BlogForm';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  featured: boolean;
  category: string | null;
  tags: string[];
  slug: string;
  viewCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  _count: {
    likes: number;
  };
}

async function getBlog(id: string): Promise<Blog | null> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
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
      return null;
    }

    return {
      ...blog,
      likeCount: blog._count.likes,
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

type BlogProps = Promise<{id: string}>
export default async function EditBlogPage(props : {params: BlogProps} ) {
  const {id} = await props.params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  const initialData = {
    title: blog.title,
    content: blog.content,
    excerpt: blog.excerpt || '',
    published: blog.published,
    featured: blog.featured,
    category: blog.category || '',
    tags: blog.tags || [],
  };

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-transparent max-w-4xl mx-auto text-white">
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <div className="mb-8">
            <Link
              href={`/blog/${blog.slug}`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Blog Post
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Edit Blog Post
            </h1>
            <p className="text-gray-400">
              Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Stats */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4 mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">Post Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Views:</span>
                <span className="ml-2 text-white font-medium">{blog.viewCount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-400">Likes:</span>
                <span className="ml-2 text-white font-medium">{blog.likeCount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-400">Created:</span>
                <span className="ml-2 text-white font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <span className={`ml-2 font-medium ${blog.published ? 'text-green-400' : 'text-yellow-400'}`}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <BlogForm 
            mode="edit" 
            blogId={blog.id} 
            initialData={initialData} 
          />
        </div>
      </div>
    </AdminAuthCheck>
  );
}