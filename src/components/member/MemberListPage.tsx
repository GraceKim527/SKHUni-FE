'use client';

import { useEffect, useState } from 'react';
import { MemberCard } from './MemberCard';
import Pagination from './Pagination';
import { MemberFilterBar } from './filters/MemberFilterBar';
import { getMemberList } from '@/apis/members';
import { EnrollmentStatus, Field, MemberList } from '@/types/users';
import LoadingSpinner from '../common/LoadingSpinner';

export const MemberListPage = () => {
  const [memberList, setMemberList] = useState<MemberList>({
    members: [],
    pageInfo: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  // 필터 상태 (page를 currentPage로만 사용)
  const [filters, setFilters] = useState<{
    name: string | undefined;
    field: Field | undefined;
    enrollmentStatus: EnrollmentStatus | undefined;
    coffeeChat: boolean;
    codeReview: boolean;
    page?: number;
  }>({
    name: undefined,
    field: undefined,
    enrollmentStatus: undefined,
    coffeeChat: false,
    codeReview: false,
    page: 1,
  });

  useEffect(() => {
    // 멤버 리스트 조회
    const fetchMemberList = async () => {
      setIsLoading(true);
      const res = await getMemberList(
        filters.name,
        filters.field,
        filters.enrollmentStatus,
        filters.coffeeChat,
        filters.codeReview,
        filters.page,
        10
      );
      setMemberList({
        members: res.data.members,
        pageInfo: res.data.pageInfo,
      });
      setIsLoading(false);
    };
    fetchMemberList();
  }, [filters]);

  // 페이지 변경 시 filters.page 업데이트
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      <MemberFilterBar filters={filters} setFilters={setFilters} />
      {isLoading ? (
        <div className="flex justify-center items-center h-[20rem]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {memberList.members.map((member) => (
            <MemberCard key={member.memberId} member={member} />
          ))}
          {memberList.members.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">결과가 없습니다.</p>
            </div>
          )}
        </div>
      )}
      <Pagination
        currentPage={filters.page || 1}
        totalCount={memberList.pageInfo.totalItems}
        pageSize={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
