import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="w-full px-8 py-8 flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Fly your Ideas with your Colleagues</h3>
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
