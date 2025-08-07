'use client'
import { format } from 'date-fns';
import { EyeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter()
  if (blogs.length === 0) {
    return (
      // <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No blogs found</p>
        </div>
      // </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        
        <tbody className="border-b-gray-800 divide-y divide-gray-800">
          {blogs.map((blog) => (
            <tr key={blog.id} className="hover:bg-gray-800/40 transition-all" onClick={()=>router.push(`/blog/${blog.slug}`)} style={{cursor:'pointer'}}>
              <td className="px-6 py-6 text-sm text-gray-400 whitespace-nowrap">
                {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
              </td>
              <td className="px-16 py-6 space-y-3  ">
                <p className='block text-white transition-colors font-medium'>
                  {blog.title}
                </p>
                {blog.excerpt && (
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{blog.excerpt}</p>
                )}
              </td>
              <td className="px-10 py-6 text-sm text-gray-400 text-center whitespace-nowrap">
                <EyeIcon size={16} className="inline-block mr-2"/>
                {blog.viewCount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
