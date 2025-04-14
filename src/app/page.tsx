'use client';

import { getMemberList } from '@/apis/members';
import { UserInfo, PageInfo } from '@/types/users';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserCountBanner } from '@/components/main/UserCountBanner';
import { MemberPreviewSection } from '@/components/main/MemberPreviewSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import OnboardingBanner from '@/components/main/OnboardingBanner';

export default function Home() {
  const [members, setMembers] = useState<UserInfo[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      const response = await getMemberList(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        50
      );
      setMembers(response.data.members);
      setPageInfo(response.data.pageInfo);
      setIsLoading(false);
    };
    fetchMembers();
  }, []);

  // 랜덤으로 5명의 멤버 선택
  const getRandomMembers = (type: 'coffeeChat' | 'codeReview', count: number) => {
    if (members.length === 0) return [];
    if (type === 'coffeeChat') {
      const coffeeChatMembers = members.filter((member) => member.codeReviewOpen === true);
      const shuffled = [...coffeeChatMembers].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    } else {
      const codeReviewMembers = members.filter((member) => member.coffeeChatOpen === true);
      const shuffled = [...codeReviewMembers].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  };

  const coffeeChatMembers = getRandomMembers('coffeeChat', 5);
  const codeReviewMembers = getRandomMembers('codeReview', 5);

  return (
    <div className="flex flex-col justify-center items-center mb-16">
      <div className="w-full h-[20rem] relative md:h-[25rem]">
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
        <section className="flex flex-col w-full lg:w-[70rem] px-4">
          <OnboardingBanner />
          <UserCountBanner count={pageInfo.totalItems} />
          <div className="flex flex-col gap-16">
            <MemberPreviewSection type="coffeeChat" members={coffeeChatMembers} />
            <MemberPreviewSection type="codeReview" members={codeReviewMembers} />
          </div>
        </section>
      )}
    </div>
  );
}
