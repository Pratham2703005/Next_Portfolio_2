import Link from 'next/link';
import { ArrowLeft, Eye, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import Footer from '../shared/Footer';
import LikeButton from './LikeButton';
import AdminActions from './AdminActions';
import { Session } from 'next-auth';
import BlogPostStyles from './BlogPostStyles';
import { Toaster } from 'react-hot-toast';

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

interface BlogPostServerProps {
  blog: Blog;
  session: Session | null;
}

export default function BlogPostServer({ blog, session }: BlogPostServerProps) {
  const isAdmin = session?.user?.email === 'pk2732004@gmail.com';

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 160),
    author: {
      '@type': 'Person',
      name: blog.author.name,
      image: blog.author.image,
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_BASE_URL || ''}/blog/${blog.slug}`,
    },
    publisher: {
      '@type': 'Person',
      name: blog.author.name,
      image: blog.author.image,
    },
    keywords: blog.tags.join(', '),
    articleSection: blog.category || 'Technology',
    wordCount: blog.content.replace(/<[^>]*>/g, '').split(' ').length,
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="max-w-4xl mx-auto h-full text-white">
        <div className="container mx-auto px-4 py-20">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </div>

          {/* Blog Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {blog.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {blog.author.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    {blog.viewCount.toLocaleString()} views
                  </div>
                  
                  {/* Like Button - Client Component */}
                  <LikeButton 
                    blogId={blog.id}
                    initialLikeCount={blog._count.likes}
                    isAuthenticated={!!session?.user}
                  />
                </div>
              </div>

              {/* Admin Actions - Client Component */}
              {isAdmin && (
                <AdminActions blogId={blog.id} />
              )}
            </div>

            {/* Category and Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {blog.category && (
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                  {blog.category}
                </span>
              )}
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-invert prose-lg max-w-[98%] mx-auto mb-8 !text-white">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>

        {/* Custom styles for blog content */}
        <BlogPostStyles/>
      </div>
      <Toaster position='bottom-right' reverseOrder={false}/>
      <Footer />
    </>
  );
}