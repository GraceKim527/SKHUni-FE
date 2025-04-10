'use client';

import { getMemberList } from '@/apis/members';
import { UserInfo } from '@/types/users';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserCountBanner } from '@/components/main/UserCountBanner';
import { MemberPreviewSection } from '@/components/main/MemberPreviewSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
export default function Home() {
  const [members, setMembers] = useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      const response = await getMemberList();
      setMembers(response.data.members);
      setIsLoading(false);
    };
    fetchMembers();
  }, []);

  // 커피챗 및 코드리뷰 가능자 멤버 일부 조회
  const coffeeChatMembers = members.filter((m) => m.coffeeChatOpen).slice(0, 4);
  const codeReviewMembers = members.filter((m) => m.codeReviewOpen).slice(0, 4);

  return (
    <div className="flex flex-col justify-center items-center mb-16">
      <div className="w-full h-[20rem] relative md:h-[30rem]">
        <Image
          src="/assets/img/skhuni_banner.png"
          alt="logo"
          fill
          className="object-cover"
          priority
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <section className="flex flex-col w-full lg:w-[70rem]">
          <UserCountBanner count={members.length} />
          <div className="flex flex-col gap-16">
            <MemberPreviewSection type="coffeeChat" members={coffeeChatMembers} />
            <MemberPreviewSection type="codeReview" members={codeReviewMembers} />
          </div>
        </section>
      )}
    </div>
  );
}
