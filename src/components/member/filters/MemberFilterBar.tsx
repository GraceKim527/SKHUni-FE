'use client';
import { useState } from 'react';
import { SearchInput } from './SearchInput';
import FieldDropdown from './FieldDropdown';
import { Field } from '@/constants/fields';
import ToggleFilters from './ToggleFilters';

export const MemberFilterBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedField, setSelectedField] = useState<Field | ''>('');
  const [coffeeChat, setCoffeeChat] = useState(false);
  const [codeReview, setCodeReview] = useState(false);

  const handleToggleChange = (field: 'coffeeChat' | 'codeReview', value: boolean) => {
    if (field === 'coffeeChat') {
      setCoffeeChat(value);
    } else {
      setCodeReview(value);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex gap-4 justify-between">
      <div className="flex gap-4">
        <FieldDropdown selected={selectedField} onSelect={setSelectedField} />
        <ToggleFilters
          coffeeChat={coffeeChat}
          codeReview={codeReview}
          onChange={handleToggleChange}
        />
      </div>
      <div className="w-[12rem]">
        <SearchInput value={searchValue} onChange={handleSearchChange} />
      </div>
    </div>
  );
};
