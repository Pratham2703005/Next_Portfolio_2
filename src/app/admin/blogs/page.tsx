import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import AdminAuthCheck from '@/components/admin/AdminAuthCheck';
import { prisma } from '@/lib/db';

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  scheduledAt: Date | null;
  viewCount: number;
  likeCount: number;
  _count: {
    likes: number;
  };
}

async function getAllBlogs(): Promise<Blog[]> {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { likes: true } },
      },
    });

    return blogs.map(blog => ({
      ...blog,
      likeCount: blog._count.likes,
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function AdminBlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-transparent text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 max-w-5xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Blog Management
                </h1>
                <p className="text-gray-400">
                  Manage all your blog posts ({blogs.length} total)
                </p>
              </div>

              <Link
                href="/admin/blogs/create"
                className="flex items-center w-fit gap-1 text-sm text-gray-500 hover:text-gray-400 border border-gray-500 hover:border-gray-400 rounded-full py-1 px-2"
              >
                <Plus size={16} />
                New Blog
              </Link>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden max-w-6xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-300">Title</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-300">Status</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-300">Views</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-300">Likes</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-300">Scheduled</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {blogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 px-6 text-center text-gray-400">
                        No blogs found. Create your first blog post!
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-700/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-medium text-white">{blog.title}</div>
                          <div className="text-sm text-gray-400 mt-1">/blog/{blog.slug}</div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              blog.published
                                ? 'bg-green-900/50 text-green-400'
                                : 'bg-yellow-900/50 text-yellow-400'
                            }`}
                          >
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                          {blog.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-400 ml-2">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-gray-300 text-center">
                          {blog.viewCount.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-gray-300 text-center">
                          {blog.likeCount.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {blog.scheduledAt ? (
                            <div className="flex items-center gap-1 text-sm text-gray-300 justify-center">
                              <Calendar size={16} />
                              {new Date(blog.scheduledAt).toLocaleDateString()}
                            </div>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              className="p-2 text-gray-400 hover:text-white transition-colors"
                              title="View blog"
                            >
                              <Eye size={18} />
                            </Link>
                            <Link
                              href={`/admin/blogs/edit/${blog.id}`}
                              className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                              title="Edit blog"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete blog"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {blogs.length === 0 ? (
              <p className="text-center text-gray-400">No blogs found.</p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className=" border-b-gray-700 p-4 bg-gray-800/40"
                >
                  <h2 className="font-medium text-lg text-white">{blog.title}</h2>
                  <p className="text-sm text-gray-400 mb-2">/blog/{blog.slug}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        blog.published
                          ? 'bg-green-900/50 text-green-400'
                          : 'bg-yellow-900/50 text-yellow-400'
                      }`}
                    >
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                    {blog.featured && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-400">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>👁 {blog.viewCount.toLocaleString()} views</span>
                    <span>❤️ {blog.likeCount.toLocaleString()} likes</span>
                  </div>

                  <div className="text-sm text-gray-400 mb-3">
                    {blog.scheduledAt ? (
                      <>
                        <Calendar size={14} className="inline-block mr-1" />
                        {new Date(blog.scheduledAt).toLocaleDateString()}
                      </>
                    ) : (
                      'Not Scheduled'
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-gray-400 hover:text-white"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/blogs/edit/${blog.id}`}
                      className="text-gray-400 hover:text-blue-400"
                    >
                      <Edit size={18} />
                    </Link>
                    <button className="text-gray-400 hover:text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminAuthCheck>
  );
}
