import { FIELD_LABELS } from '@/constants/labels';
import { AbleBadge } from '../common/AbleBadge';
import { Field, UserInfo } from '@/types/users';

interface MemberCardProps {
  member: UserInfo;
}

export const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <div className="flex gap-8 w-full">
      <img
        src={member.picture}
        alt="profile"
        width={100}
        height={100}
        style={{ width: '100px', height: '100px' }}
        className="rounded-full"
      />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg font-bold">{member.name}</h3>
          <span>·</span>
          <p className="text-sm text-gray-500">
            {FIELD_LABELS[member.fieldType as Field] || '분야 미정'}
          </p>
        </div>
        <p className="text-sm text-gray-500">{member.introLine || '한줄소개가 없습니다'}</p>

        <div className="flex gap-2">
          <AbleBadge able={member.coffeeChatOpen} type="coffee" />
          <AbleBadge able={member.codeReviewOpen} type="code" />
        </div>
      </div>
    </div>
  );
};
