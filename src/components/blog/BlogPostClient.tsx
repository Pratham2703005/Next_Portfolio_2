'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, Heart, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import Footer from '../shared/Footer';

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

interface BlogPostClientProps {
  blog: Blog;
}

export default function BlogPostClient({ blog }: BlogPostClientProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog._count.likes);
  const [isCheckingLike, setIsCheckingLike] = useState(true); // Loading state
  const lastLikeRequest = useRef(0);
  const likeRequestCount = useRef(0);

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

  useEffect(() => {
    console.log("blog", blog, session)
    if (blog && session?.user) {
      checkLikeStatus();
    } else {
      setIsCheckingLike(false);
    }
  }, [session]);

  const checkLikeStatus = async () => {
    if (!blog || !session?.user) return;

    try {
      const response = await fetch(`/api/blogs/${blog.id}/like`);
      if (response.ok) {
        const data = await response.json();
        setLiked(data.liked);
        console.log("data", data)
      }
    } catch (error) {
      console.error('Error checking like status:', error);
    } finally {
      setIsCheckingLike(false);
    }
  };

  const handleLike = async () => {
    if (!blog || !session?.user) return;
    
    // Rate limiting implementation
    const now = Date.now();
    const timeDiff = now - lastLikeRequest.current;
    
    // Reset counter if more than 1 minute has passed
    if (timeDiff > 10000) {
      likeRequestCount.current = 0;
    }
    
    // Limit to 10 requests per minute
    if (likeRequestCount.current >= 10) {
      console.warn('Rate limit exceeded for likes');
      return;
    }
    
    // Prevent multiple rapid requests (debounce)
    if (timeDiff < 1000) {
      console.warn('Too many requests, please wait');
      return;
    }
    
    lastLikeRequest.current = now;
    likeRequestCount.current++;
    
    // Optimistic update for instant feedback
    const wasLiked = liked;
    const currentCount = likeCount;
    
    setLiked(!wasLiked);
    setLikeCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      const response = await fetch(`/api/blogs/${blog.id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        // Server response should match our optimistic update
        setLiked(data.liked);
        
        // Update count from server response
        setLikeCount(data.likeCount);
      } else {
        // Revert optimistic update on error
        setLiked(wasLiked);
        setLikeCount(currentCount);
      }
    } catch {
      // Revert optimistic update on error
      setLiked(wasLiked);
      setLikeCount(currentCount);
    }
  };

  const handleDelete = async () => {
    if (!blog || !isAdmin) return;

    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blogs/${blog.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          router.push('/blog');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="max-w-7xl mx-auto h-full text-white">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
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
                
                {/* Like Button with improved UX */}
                {session?.user ? (
                  <button
                    onClick={handleLike}
                    disabled={isCheckingLike}
                    className={`flex items-center gap-1 transition-all duration-200 hover:scale-105 ${isCheckingLike ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <Heart 
                      size={16} 
                      className={`transition-all duration-200 ${
                        liked ? 'fill-current scale-110 text-red-800' : 'text-gray-400 hover:text-red-400'
                        
                      }`} 
                    />
                    {isCheckingLike ? 'Loading...' : ''} {likeCount.toLocaleString()} {likeCount >1 ? 'Likes' : 'Like'}
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-gray-400">
                    <Heart size={16} />
                    {likeCount.toLocaleString()} likes
                  </div>
                )}
              </div>
            </div>

            {isAdmin && (
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/blogs/edit/${blog.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
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
        <div className="prose prose-invert prose-lg max-w-none mb-8">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

      </div>

      {/* Custom styles for blog content */}
      <style jsx global>{`
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          color: #ffffff;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .blog-content p {
          color: #d1d5db;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        
        .blog-content a {
          color: #a855f7;
          text-decoration: underline;
        }
        
        .blog-content a:hover {
          color: #c084fc;
        }
        
        .blog-content img {
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #a855f7;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #d1d5db;
        }
        
        .blog-content code {
          background-color: #374151;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        
        .blog-content pre {
          background-color: #fff;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .blog-content ul,
        .blog-content ol {
          color: #d1d5db;
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
      </div>
      <Footer/>
    </>
  );
}