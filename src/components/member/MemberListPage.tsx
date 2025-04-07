'use client';

import { useEffect, useState } from 'react';
import { MemberCard } from './MemberCard';
import Pagination from './Pagination';
import { MemberFilterBar } from './filters/MemberFilterBar';
import { getMemberList } from '@/apis/members';
import { EnrollmentStatus, Field, MemberList } from '@/types/users';
export const MemberListPage = () => {
  const [memberList, setMemberList] = useState<MemberList>({
    members: [],
    pageInfo: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
    },
  });

  // 필터 상태
  const [filters, setFilters] = useState<{
    name: string | undefined;
    field: Field | undefined;
    enrollmentStatus: EnrollmentStatus | undefined;
    coffeeChat: boolean;
    codeReview: boolean;
    page: number;
  }>({
    name: undefined,
    field: undefined,
    enrollmentStatus: undefined,
    coffeeChat: false,
    codeReview: false,
    page: 1,
  });

  // 멤버 리스트 조회
  const fetchMemberList = async () => {
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
  };

  useEffect(() => {
    fetchMemberList();
  }, [filters]);

  const [currentPage, setCurrentPage] = useState(filters.page);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-16">
      <MemberFilterBar filters={filters} setFilters={setFilters} />
      <div className="flex flex-col gap-12">
        {memberList.members.map((member) => (
          <MemberCard key={member.memberId} member={member} />
        ))}
        {memberList.members.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={memberList.pageInfo.totalItems}
        pageSize={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
