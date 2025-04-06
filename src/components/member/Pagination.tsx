'use client';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalCount,
  pageSize = 10,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 페이지가 하나면 숨김
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center items-center mt-6 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border disabled:opacity-30"
      >
        이전
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border ${
            page === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border disabled:opacity-30"
      >
        다음
      </button>
    </div>
  );
}
