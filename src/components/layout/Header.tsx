// src/components/layout/Header.tsx

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white fixed top-0 left-0 z-999">
      <div className="w-full px-8 py-4 flex justify-between items-center">
        <div className="w-1/3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            SKHUni
          </Link>
          <nav className="flex gap-8">
            <Link href="/about" className="px-2 py-1 hover:bg-gray-100 rounded-md">
              About
            </Link>
            <Link href="/projects" className="px-2 py-1 hover:bg-gray-100 rounded-md">
              Project
            </Link>
            <Link href="/members" className="px-2 py-1 hover:bg-gray-100 rounded-md">
              Member
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Link href="/login">로그인/회원가입</Link>
        </div>
      </div>
    </header>
  );
}
