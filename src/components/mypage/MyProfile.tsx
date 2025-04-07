'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MarkdownPreview } from './MarkdownPreview';
import { UserInfo } from '@/types/users';
import { Field, EnrollmentStatus } from '@/types/users';
import { ENROLLMENT_STATUS_LABELS, FIELD_LABELS } from '@/constants/labels';

interface MyProfileProps {
  userInfo: UserInfo | null;
}

export const MyProfile = ({ userInfo }: MyProfileProps) => {
  const socialLinks = [
    { key: 'github', label: 'Github', icon: '/assets/icons/github.svg', url: userInfo?.github },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: '/assets/icons/linkedin.svg',
      url: userInfo?.linkedIn,
    },
    { key: 'notion', label: 'Notion', icon: '/assets/icons/notion.svg', url: userInfo?.notion },
    { key: 'etc1', label: 'Etc1', icon: '/assets/icons/link.svg', url: userInfo?.etc1 },
    { key: 'etc2', label: 'Etc2', icon: '/assets/icons/link.svg', url: userInfo?.etc2 },
  ];

  return (
    <div className="flex flex-col gap-10 justify-between">
      <div className="flex gap-8">
        <img
          src={userInfo?.picture ?? '/assets/img/profile.png'}
          alt="profile"
          width={120}
          height={120}
          className="overflow-hidden rounded-full"
        />
        <div className="flex justify-between w-[400px]">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-700">{userInfo?.name}</h3>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Image src="/assets/icons/mail.svg" alt="mail" width={16} height={17} />
                <p className="text-sm leading-none text-gray-700">{userInfo?.email}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Image src="/assets/icons/school.svg" alt="학번" width={16} height={16} />
                <h6 className="text-sm font-normal leading-none text-gray-700">
                  {userInfo?.studentId}학번 (
                  {
                    ENROLLMENT_STATUS_LABELS[
                      userInfo?.enrollmentStatus ?? EnrollmentStatus.ENROLLED
                    ]
                  }
                  )
                </h6>
              </div>
              <div className="flex gap-2 items-center">
                <Image src="/assets/icons/fieldBook.svg" alt="분야" width={16} height={16} />
                <h6 className="text-sm font-normal leading-none text-gray-700">
                  {FIELD_LABELS[userInfo?.fieldType ?? Field.FRONTEND]}
                </h6>
              </div>
            </div>
          </div>
          <Link
            href="/mypage/edit"
            className="h-8 px-3 py-1 text-sm rounded-md text-gray-500 border-none bg-[#F5F5F5] flex items-center"
          >
            내 정보 수정
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">한줄 소개</h3>
        <p className="text-sm text-gray-500">{userInfo?.introLine ?? '소개글이 없습니다.'}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">자기소개</h3>
        <MarkdownPreview content={userInfo?.introduction ?? '자기소개가 없습니다.'} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">기술 스택</h3>
        {userInfo?.techStack ? (
          <div className="flex gap-2">
            <img
              src={`https://skillicons.dev/icons?i=${userInfo?.techStack}`}
              alt="github"
              width={32}
              height={32}
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500">기술 스택이 없습니다.</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">링크</h3>
        <div className="flex gap-2">
          {socialLinks
            .filter((link) => link.url?.trim())
            .map((link) => (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                className="w-10 h-10 rounded-sm border-gray-300 border-[1px] flex justify-center items-center"
              >
                <Image src={link.icon} alt={link.label} width={32} height={32} />
              </a>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">외부 컨택 여부</h3>
        <div className="flex gap-4">
          <div className="flex gap-1 items-center">
            <p className="text-base">커피챗 오픈 여부</p>
            <Image
              src={
                userInfo?.coffeeChatOpen
                  ? '/assets/icons/successCheck.svg'
                  : '/assets/icons/errorX.svg'
              }
              alt="successCheck"
              width={16}
              height={16}
            />
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-base">코드리뷰 오픈 여부</p>
            <Image
              src={
                userInfo?.codeReviewOpen
                  ? '/assets/icons/successCheck.svg'
                  : '/assets/icons/errorX.svg'
              }
              alt="errorX"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
