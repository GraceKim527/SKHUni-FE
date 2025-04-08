import Link from 'next/link';

export const BackLink = ({ href }: { href: string }) => {
  return (
    <div className="flex">
      <button
        type="button"
        className="px-4 py-2 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
      >
        <Link href={href} className="text-sm text-gray-500">
          뒤로가기
        </Link>
      </button>
    </div>
  );
};
