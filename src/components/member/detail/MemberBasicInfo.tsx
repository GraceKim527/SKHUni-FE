'use client';

import { EnrollmentStatus, UserInfo } from '@/types/users';
import { ENROLLMENT_STATUS_LABELS, FIELD_LABELS } from '@/constants/labels';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AbleBadge } from '@/components/common/AbleBadge';
import { RequestModal } from './RequestModal';
import { useAuthStore } from '@/store/useAuthStore';

export default function MemberBasicInfo({ member }: { member: UserInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'커피챗 요청' | '코드리뷰 요청' | null>(
    null
  );
  const role = useAuthStore((state) => state.role);
  const isGuest = role === 'ROLE_GUEST';

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    if (isGuest) {
      alert('로그인 후 이용 가능해요.');
      return;
    }
    if (
      (option === '커피챗 요청' && !member.coffeeChatOpen) ||
      (option === '코드리뷰 요청' && !member.codeReviewOpen)
    ) {
      return;
    }
    setSelectedOption(option as '커피챗 요청' | '코드리뷰 요청');
    setIsOpen(false);
  };

  const socialLinks = [
    { key: 'github', label: 'Github', icon: '/assets/icons/github.svg', url: member.github },
    {
      key: 'linkedIn',
      label: 'LinkedIn',
      icon: '/assets/icons/linkedIn.svg',
      url: member.linkedIn,
    },
    { key: 'notion', label: 'Notion', icon: '/assets/icons/notion.svg', url: member.notion },
    { key: 'etc1', label: 'Etc1', icon: '/assets/icons/link.svg', url: member.etc1 },
    { key: 'etc2', label: 'Etc2', icon: '/assets/icons/link.svg', url: member.etc2 },
  ];

  return (
    <div className="flex justify-between p-4 w-full bg-white rounded-lg border border-gray-300 md:w-auto md:gap-8 sm:px-8 sm:py-6">
      <div className="flex flex-col gap-8 items-center w-full md:flex-row md:w-auto">
        <div className="flex flex-col gap-4">
          <img
            src={member.picture}
            alt="member-profile"
            className="object-cover w-32 h-32 rounded-full"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <AbleBadge able={member.coffeeChatOpen} type="coffee" />
            <AbleBadge able={member.codeReviewOpen} type="code" />
          </div>

          <div className="flex gap-1 items-center">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <span>·</span>
            <p className="text-sm text-gray-500">{FIELD_LABELS[member.fieldType] || '분야 미정'}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <Image src="/assets/icons/mail.svg" alt="mail" width={16} height={17} />
              <p className="text-sm leading-none text-gray-700">
                {member.contactEmail || '이메일 비공개'}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Image src="/assets/icons/school.svg" alt="학번" width={16} height={16} />
              <h6 className="text-sm font-normal leading-none text-gray-700">
                {member.studentId
                  ? `${member.studentId}학번 (${
                      ENROLLMENT_STATUS_LABELS[member.enrollmentStatus ?? EnrollmentStatus.ENROLLED]
                    })`
                  : '학번 미공개'}
              </h6>
            </div>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">
            {member.introLine || '한줄소개가 없습니다'}
          </p>

          <div className="flex gap-3">
            {socialLinks
              .filter((link) => link.url?.trim())
              .map((link) => (
                <a key={link.key} href={link.url} target="_blank">
                  <Image src={link.icon} alt={link.label} width={24} height={24} />
                </a>
              ))}
          </div>
        </div>
      </div>
      <div className="relative" ref={dropdownRef}>
        {!member.isMine && (
          <button
            type="button"
            className="relative w-24 h-10 bg-[#512DA8] text-white rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            Contact
          </button>
        )}

        {isOpen && (
          <ul className="absolute right-0 top-12 z-10 p-1 mt-1 w-40 bg-white rounded-lg border border-gray-300 shadow-sm">
            {['커피챗 요청', '코드리뷰 요청'].map((option) => {
              const isDisabled =
                (option === '커피챗 요청' && !member.coffeeChatOpen) ||
                (option === '코드리뷰 요청' && !member.codeReviewOpen);

              return (
                <li key={option}>
                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-lg ${
                      isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                    } ${
                      isDisabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {selectedOption && (
        <RequestModal
          type={selectedOption}
          onClose={() => setSelectedOption(null)}
          toMemberId={member.memberId}
        />
      )}
    </div>
  );
}
