import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="flex justify-between items-center px-4 py-4 w-full sm:px-8 sm:py-8">
        <h3 className="text-sm font-bold text-gray-800 md:text-2xl">
          Fly your Ideas with your Colleagues
        </h3>
        <div className="flex gap-4">
          <Link href="https://www.instagram.com/skhuthon/" target="_blank">
            <Image src="/assets/icons/instagram.svg" alt="Instagram" width={32} height={32} />
          </Link>
          <Link href="https://github.com/SKHUniArchive" target="_blank">
            <Image src="/assets/icons/github.svg" alt="Github" width={32} height={32} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
