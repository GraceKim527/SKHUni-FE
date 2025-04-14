'use client';

import Link from 'next/link';

export default function OnboardingBanner() {
  return (
    <div className="my-8 w-full bg-[#F3EFFF] rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h2 className="text-xl font-bold text-[#512DA8]">스쿠니가 처음이신가요?</h2>
        <p className="text-sm text-gray-700">
          어떤 서비스인지 간단히 알고 싶다면 버튼을 눌러보세요!
        </p>
      </div>
      <Link
        href="/about"
        className="px-5 py-2 bg-[#512DA8] text-white rounded-lg text-sm hover:bg-[#3f2291] transition"
      >
        <span className="text-white">스쿠니 소개 보러가기</span>
      </Link>
    </div>
  );
}
