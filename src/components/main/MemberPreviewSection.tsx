import { UserInfo } from '@/types/users';
import { MemberCardVertical } from './MemberCardVertical';

interface MemberPreviewSectionProps {
  type: 'coffeeChat' | 'codeReview';
  members: UserInfo[];
}

export const MemberPreviewSection = ({ type, members }: MemberPreviewSectionProps) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-bold text-gray-900">
        {type === 'coffeeChat' ? '커피챗 신청 가능한 학우' : '코드리뷰 신청 가능한 학우'}
      </h2>
      <div className="grid grid-cols-4 gap-6 sm:grid-cols-4 md:grid-cols-5">
        {members.map((member) => (
          <MemberCardVertical key={member.memberId} member={member} />
        ))}
      </div>
    </section>
  );
};
