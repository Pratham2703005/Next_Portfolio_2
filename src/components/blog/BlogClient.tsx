'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Plus, Eye, Calendar, ChevronUp, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

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

type SortField = 'createdAt' | 'title' | 'viewCount';
type SortOrder = 'asc' | 'desc';

interface BlogClientProps {
  initialData: BlogsResponse;
}

export default function BlogClient({ initialData }: BlogClientProps) {
  const [mount, setMount] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [blogs, setBlogs] = useState<Blog[]>(initialData.blogs);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [sortField, setSortField] = useState<SortField>((searchParams.get('sortBy') as SortField) || 'createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>((searchParams.get('sortOrder') as SortOrder) || 'desc');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(initialData.pagination.totalPages);
  const [totalCount, setTotalCount] = useState(initialData.pagination.totalCount);

  const isAdmin = session?.user?.email === 'pk2732004@gmail.com';

  useEffect(() => {
    setMount(true);
  }, []);

  const updateURL = (params: Record<string, string | number>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value.toString());
      } else {
        newSearchParams.delete(key);
      }
    });

    // Remove page if it's 1
    if (newSearchParams.get('page') === '1') {
      newSearchParams.delete('page');
    }

    const newURL = `/blog${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
    router.push(newURL, { scroll: false });
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm,
        sortBy: sortField,
        sortOrder: sortOrder,
      });

      const response = await fetch(`/api/blogs?${params}`);
      if (response.ok) {
        const data: BlogsResponse = await response.json();
        setBlogs(data.blogs);
        setTotalPages(data.pagination.totalPages);
        setTotalCount(data.pagination.totalCount);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mount) {
      fetchBlogs();
      updateURL({
        page: currentPage,
        sortBy: sortField,
        sortOrder: sortOrder,
        search: searchTerm,
      });
    }
  }, [currentPage, sortField, sortOrder]);

  useEffect(() => {
    if (mount) {
      const debounceTimer = setTimeout(() => {
        setCurrentPage(1);
        fetchBlogs();
        updateURL({
          page: 1,
          sortBy: sortField,
          sortOrder: sortOrder,
          search: searchTerm,
        });
      }, 500);

      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <>
      {mount && (
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Blogs
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Thoughts, insights, and experiences from my journey in tech
            </p>
          </motion.div>

          {/* Search and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {isAdmin && (
              <Link
                href="/admin/blogs/create"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 font-medium"
              >
                <Plus size={20} />
                New Blog
              </Link>
            )}
          </motion.div>

          {/* Blog Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden"
          >
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No blogs found</p>
                {isAdmin && (
                  <Link
                    href="/admin/blogs/create"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 font-medium"
                  >
                    <Plus size={20} />
                    Create Your First Blog
                  </Link>
                )}
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 bg-gray-800/70 font-semibold text-sm uppercase tracking-wide">
                  <button
                    onClick={() => handleSort('createdAt')}
                    className="col-span-3 flex items-center gap-2 text-left hover:text-purple-400 transition-colors"
                  >
                    <Calendar size={16} />
                    Date
                    <SortIcon field="createdAt" />
                  </button>
                  <button
                    onClick={() => handleSort('title')}
                    className="col-span-6 flex items-center gap-2 text-left hover:text-purple-400 transition-colors"
                  >
                    Title
                    <SortIcon field="title" />
                  </button>
                  <button
                    onClick={() => handleSort('viewCount')}
                    className="col-span-3 flex items-center gap-2 text-left hover:text-purple-400 transition-colors"
                  >
                    <Eye size={16} />
                    Views
                    <SortIcon field="viewCount" />
                  </button>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-700">
                  {blogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700/50 transition-colors group"
                      >
                        <div className="col-span-3 text-gray-400 text-sm">
                          {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                        </div>
                        <div className="col-span-6">
                          <h3 className="font-medium group-hover:text-purple-400 transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                          {blog.excerpt && (
                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                              {blog.excerpt}
                            </p>
                          )}
                          {blog.category && (
                            <span className="inline-block mt-2 px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">
                              {blog.category}
                            </span>
                          )}
                        </div>
                        <div className="col-span-3 text-gray-400 text-sm flex items-center gap-1">
                          <Eye size={14} />
                          {blog.viewCount.toLocaleString()}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center gap-2 mt-8"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
              
              <span className="px-4 py-2 text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                Next
              </button>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-8 text-gray-400 text-sm"
          >
            Showing {blogs.length} of {totalCount} blog{totalCount !== 1 ? 's' : ''}
          </motion.div>
        </div>
      )}
    </>
  );
}