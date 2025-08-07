'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';

interface AdminActionsProps {
  blogId: string;
}

export default function AdminActions({ blogId }: AdminActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          router.push('/blog');
        } else {
          console.error('Failed to delete blog post');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/blogs/edit/${blogId}`}
        className=""
      >
        <Edit size={16} className='text-gray-500 hover:text-gray-300'/>
      </Link>
      <button
        onClick={handleDelete}
        className=""
      >
        <Trash2 size={16} className='text-gray-500 hover:text-gray-300' />
      </button>
    </div>
  );
}