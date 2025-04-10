import { UserInfo } from '@/types/users';
import { MemberCardVertical } from './MemberCardVertical';
import Link from 'next/link';
import Image from 'next/image';
interface MemberPreviewSectionProps {
  type: 'coffeeChat' | 'codeReview' | 'random';
  members: UserInfo[];
}

export const MemberPreviewSection = ({ type, members }: MemberPreviewSectionProps) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-bold text-gray-900">
        {type === 'coffeeChat'
          ? '커피챗 신청 가능한 학우'
          : type === 'codeReview'
          ? '코드리뷰 신청 가능한 학우'
          : '랜덤 추천 학우'}
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
        {members.map((member) => (
          <MemberCardVertical key={member.memberId} member={member} />
        ))}
      </div>
      <div className="flex justify-end items-center">
        <Link href="/member" className="flex gap-2 items-center">
          <span className="text-sm leading-none text-gray-500 underline hover:text-gray-700">
            더 많은 학우들 보러가기
          </span>
          <Image src="/assets/icons/chevronRight.svg" alt="chevronRight" width={16} height={16} />
        </Link>
      </div>
    </section>
  );
};
