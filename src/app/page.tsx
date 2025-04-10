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

  // 랜덤으로 5명의 멤버 선택
  const getRandomMembers = (count: number) => {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const coffeeChatMembers = getRandomMembers(5);
  const codeReviewMembers = getRandomMembers(5);

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
