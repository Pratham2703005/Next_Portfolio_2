import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AdminAuthCheck from '@/components/admin/AdminAuthCheck';
import BlogForm from '@/components/admin/BlogForm';

export default function CreateBlogPage() {
  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-transparent max-w-5xl mx-auto text-white">
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Create New Blog
            </h1>
          </div>

          {/* Form */}
          <BlogForm mode="create" />
        </div>
      </div>
    </AdminAuthCheck>
  );
}