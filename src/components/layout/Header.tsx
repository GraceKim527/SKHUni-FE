// src/components/layout/Header.tsx
import LoginButton from './LoginButton';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-999">
      <div className="flex justify-between items-center px-8 py-4 w-full">
        <div className="flex justify-between items-center w-1/3">
          <Link href="/" className="text-xl font-bold">
            SKHUni
          </Link>
          <nav className="flex gap-8">
            <Link href="/about" className="px-2 py-1 rounded-md hover:bg-gray-100">
              About
            </Link>
            <Link href="/projects" className="px-2 py-1 rounded-md hover:bg-gray-100">
              Project
            </Link>
            <Link href="/members" className="px-2 py-1 rounded-md hover:bg-gray-100">
              Member
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
