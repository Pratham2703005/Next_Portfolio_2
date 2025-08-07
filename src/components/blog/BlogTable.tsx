import { format } from 'date-fns';
import { Calendar, Eye } from 'lucide-react';
import Link from 'next/link';
import BlogSortButton from './BlogSortButton';
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
  sortBy: string;
  sortOrder: string;
  totalCount: number;
}

export default function BlogTable({ blogs, sortBy, sortOrder }: BlogTableProps) {
  if (blogs.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No blogs found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 font-semibold text-sm uppercase tracking-wide">
        <BlogSortButton 
          field="createdAt" 
          currentSort={sortBy} 
          currentOrder={sortOrder}
          className="col-span-3"
        >
          <Calendar size={16} />
          Date
        </BlogSortButton>
        
        <BlogSortButton 
          field="title" 
          currentSort={sortBy} 
          currentOrder={sortOrder}
          className="col-span-6"
        >
          Title
        </BlogSortButton>
        
        <BlogSortButton 
          field="viewCount" 
          currentSort={sortBy} 
          currentOrder={sortOrder}
          className="col-span-3"
        >
          <Eye size={16} />
          Views
        </BlogSortButton>
      </div>

      {/* Table Body */}
      <div className="border-b border-gray-700 divide-y divide-gray-700">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700/50 transition-colors group block"
          >
            <div className="col-span-3 text-gray-400 text-sm">
              {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
            </div>
            <div className="col-span-6">
              <h3 className="font-medium ">
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
            <div className="col-span-3 text-gray-400 text-sm flex gap-1 justify-start items-start">
              {/* <Eye size={14} /> */}
              {blog.viewCount.toLocaleString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}