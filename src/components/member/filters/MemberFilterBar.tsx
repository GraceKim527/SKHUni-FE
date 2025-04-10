'use client';
import { useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';
import FieldDropdown from './FieldDropdown';
import { EnrollmentStatus, Field } from '@/types/users';
import ToggleFilters from './ToggleFilters';
import EnrollmentStatusDropdown from './EnrollmentStatusDropdown';

interface MemberFilterBarProps {
  filters: {
    name: string | undefined;
    field: Field | undefined;
    enrollmentStatus: EnrollmentStatus | undefined;
    coffeeChat: boolean;
    codeReview: boolean;
    page?: number;
  };
  setFilters: (filters: MemberFilterBarProps['filters']) => void;
}

export const MemberFilterBar = ({ filters, setFilters }: MemberFilterBarProps) => {
  const [searchValue, setSearchValue] = useState(filters.name);

  // 디바운싱 검색
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({ ...filters, name: searchValue, page: 1 });
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  const handleToggleChange = (field: 'coffeeChat' | 'codeReview', value: boolean) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="flex flex-col gap-4 justify-between sm:flex-row">
      <div className="flex flex-col not-only-of-type:gap-4 md:flex-row">
        <div className="flex gap-4">
          <FieldDropdown
            selected={filters.field}
            onSelect={(field) => setFilters({ ...filters, field })}
          />
          <EnrollmentStatusDropdown
            selected={filters.enrollmentStatus}
            onSelect={(status) => setFilters({ ...filters, enrollmentStatus: status })}
          />
        </div>

        <ToggleFilters
          coffeeChat={filters.coffeeChat}
          codeReview={filters.codeReview}
          onChange={handleToggleChange}
        />
      </div>
      <div className="w-[12rem]">
        <SearchInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      </div>
    </div>
  );
};
