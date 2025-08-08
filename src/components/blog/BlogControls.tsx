import { auth } from '@/utils/auth';
import { Plus } from 'lucide-react';
import Link from 'next/link';


export async function BlogControls() {
  const  session = await auth();
  const isAdmin = session?.user?.email === 'pk2732004@gmail.com';


  return (
    <div className="mb-2 flex gap-4 items-center justify-end">

      {isAdmin && (
        <>
          <Link
            href="/admin/blogs"
            className="text-sm text-gray-500 hover:text-gray-400 border border-gray-500 hover:border-gray-400 rounded-full py-1 px-2"
          >
            View All
          </Link>
          <Link
            href="/admin/blogs/create"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-400 border border-gray-500 hover:border-gray-400 rounded-full py-1 px-2"
          >
            <Plus size={16} />
            New Blog
          </Link>
        </>
      )}
    </div>
  );
}