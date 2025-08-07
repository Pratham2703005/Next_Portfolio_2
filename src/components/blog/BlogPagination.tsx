import Link from 'next/link';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export default function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    return `/blog${params.toString() ? `?${params}` : ''}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={`px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg transition-colors ${
          currentPage === 1 
            ? 'opacity-50 cursor-not-allowed pointer-events-none' 
            : 'hover:bg-gray-700'
        }`}
      >
        Previous
      </Link>
      
      <span className="px-4 py-2 text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      
      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg transition-colors ${
          currentPage === totalPages 
            ? 'opacity-50 cursor-not-allowed pointer-events-none' 
            : 'hover:bg-gray-700'
        }`}
      >
        Next
      </Link>
    </div>
  );
}