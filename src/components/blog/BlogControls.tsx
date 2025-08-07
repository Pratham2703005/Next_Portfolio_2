'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';

interface BlogControlsProps {
  initialSearch: string;
}

export default function BlogControls({ initialSearch }: BlogControlsProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [mount, setMount] = useState(false)
  
  const isAdmin = session?.user?.email === 'pk2732004@gmail.com';

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      
      const url = `/blog${params.toString() ? `?${params}` : ''}`;
      router.push(url);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, router]);
  useEffect(()=>{
    setMount(true)
  },[])

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
{mount && (      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>)}

      {isAdmin && (
        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-400 border border-gray-500 hover:border-gray-400 rounded-full py-1 px-2"
        >
          <Plus size={16} />
          New Blog
        </Link>
      )}
    </div>
  );
}