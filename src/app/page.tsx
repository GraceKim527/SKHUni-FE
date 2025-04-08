'use client';

import { getMemberList } from '@/apis/members';
import { UserInfo } from '@/types/users';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserCountBanner } from '@/components/main/UserCountBanner';
import { MemberPreviewSection } from '@/components/main/MemberPreviewSection';
export default function Home() {
  const [members, setMembers] = useState<UserInfo[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await getMemberList();
      setMembers(response.data.members);
    };
    fetchMembers();
  }, []);

  // 커피챗 및 코드리뷰 가능자 멤버 일부 조회
  const coffeeChatMembers = members.filter((m) => m.coffeeChatOpen).slice(0, 4);
  const codeReviewMembers = members.filter((m) => m.codeReviewOpen).slice(0, 4);

  console.log(codeReviewMembers, coffeeChatMembers);

  return (
    <div className="flex flex-col justify-center items-center mb-16">
      <Image src="/assets/img/skhuni_banner.png" alt="logo" width={1920} height={600} />
      <section className="flex flex-col w-[70rem]">
        <UserCountBanner count={members.length} />
        <div className="flex flex-col gap-16">
          <MemberPreviewSection type="coffeeChat" members={coffeeChatMembers} />
          <MemberPreviewSection type="codeReview" members={codeReviewMembers} />
        </div>
      </section>
    </div>
  );
}
