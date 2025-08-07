import { format } from 'date-fns';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';

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

interface BlogTableProps {
  blogs: Blog[];
}

export default function BlogTable({ blogs }: BlogTableProps) {
  if (blogs.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No blogs found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="hover:bg-gray-800/40 transition-all rounded-lg p-4">
            <Link href={`/blog/${blog.slug}`} className="block space-y-2">
              <div className="flex justify-between items-start gap-3">
                <h3 className="text-white font-medium text-sm leading-tight flex-1">
                  {blog.title}
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {format(new Date(blog.createdAt), 'MMM dd')}
                </span>
              </div>
              
              {blog.excerpt && (
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-400 text-xs">
                  <EyeIcon size={14} className="mr-1"/>
                  <span>{blog.viewCount.toLocaleString()} views</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Tablet View */}
      <div className="hidden sm:block md:hidden">
        <div className="space-y-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="hover:bg-gray-800/40 transition-all rounded-lg p-4">
              <Link href={`/blog/${blog.slug}`} className="block">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-white font-medium leading-tight flex-1">
                        {blog.title}
                      </h3>
                      <span className="text-sm text-gray-400 whitespace-nowrap">
                        {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    
                    {blog.excerpt && (
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <div className="inline-flex items-center text-gray-400 text-sm hover:text-white transition-colors">
                    <EyeIcon size={16} className="mr-2"/>
                    <span>{blog.viewCount.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <tbody className="border-b-gray-800 divide-y divide-gray-800">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-800/40 transition-all">
                <td className="px-2 py-1 md:p-6 text-sm text-gray-400 whitespace-nowrap">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                  </Link>
                </td>
                <td className="px-2 py-1 md:px-16 md:py-6 md:space-y-3">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="block text-white transition-colors font-medium"
                  >
                    {blog.title}
                  </Link>
                  {blog.excerpt && (
                    <p className="hidden md:block text-sm text-gray-400 mt-1 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  )}
                </td>
                <td className="md:px-10 md:py-6 text-sm text-gray-400 text-end md:text-center whitespace-nowrap">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <EyeIcon size={16} className="mr-1 md:mr-2"/>
                    {blog.viewCount.toLocaleString()}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}