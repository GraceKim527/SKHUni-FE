'use client';
import { useState, useRef, useEffect } from 'react';
import { EnrollmentStatus } from '@/types/users';
import { ENROLLMENT_STATUS_LABELS } from '@/constants/labels';
import Image from 'next/image';

interface EnrollmentStatusDropdownProps {
  selected: EnrollmentStatus | undefined;
  onSelect: (status: EnrollmentStatus | undefined) => void;
}

const EnrollmentStatusDropdown = ({ selected, onSelect }: EnrollmentStatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (status: EnrollmentStatus | undefined) => {
    onSelect(status);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-[8rem] flex justify-between items-center px-4 py-2 text-sm rounded-md border border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected ? ENROLLMENT_STATUS_LABELS[selected] : '재학 상태'}</span>
        <Image
          src="/assets/icons/chevronDown.svg"
          alt="dropdown"
          width={16}
          height={16}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-lg">
          <div
            className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect(undefined)}
          >
            전체
          </div>
          {Object.entries(ENROLLMENT_STATUS_LABELS).map(([key, label]) => (
            <div
              key={key}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(key as EnrollmentStatus)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollmentStatusDropdown;
