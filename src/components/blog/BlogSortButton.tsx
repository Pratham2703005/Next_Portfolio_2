'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface BlogSortButtonProps {
  field: string;
  currentSort: string;
  currentOrder: string;
  children: React.ReactNode;
  className?: string;
}

export default function BlogSortButton({ 
  field, 
  currentSort, 
  currentOrder, 
  children, 
  className = '' 
}: BlogSortButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (currentSort === field) {
      params.set('sortOrder', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sortBy', field);
      params.set('sortOrder', 'desc');
    }

    router.push(`/blog?${params.toString()}`);
  };

  const SortIcon = () => {
    if (currentSort !== field) return null;
    return currentOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <button
      onClick={handleSort}
      className={`flex items-center gap-2 text-left hover:text-purple-400 transition-colors ${className}`}
    >
      {children}
      <SortIcon />
    </button>
  );
}