import { ENROLLMENT_STATUS_LABELS, FIELD_LABELS } from '@/constants/labels';
import { EnrollmentStatus, UserInfo } from '@/types/users';
import { useRouter } from 'next/navigation';

export const MemberCardVertical = ({ member }: { member: UserInfo }) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-4 items-center p-4 bg-gray-50 rounded-lg shadow-md transition-shadow cursor-pointer hover:shadow-lg"
      onClick={() => {
        router.push(`/member/${member.memberId}`);
      }}
    >
      <img src={member.picture} alt={member.name} className="object-cover w-24 h-24 rounded-full" />
      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-sm text-gray-500">{FIELD_LABELS[member.fieldType] || '분야 미정'}</p>
        <h6 className="text-sm font-normal leading-none text-gray-700">
          {member.studentId}학번 (
          {ENROLLMENT_STATUS_LABELS[member.enrollmentStatus ?? EnrollmentStatus.ENROLLED]})
        </h6>
      </div>
    </div>
  );
};
