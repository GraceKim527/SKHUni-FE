'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface TechStackDropdownProps {
  stackList: string[];
  value: string[];
  onChange: (newSelected: string[]) => void;
  placeholder?: string;
}

export default function TechStackDropdown({
  stackList,
  value,
  onChange,
  placeholder = '기술 스택 선택',
}: TechStackDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (stack: string) => {
    if (!value.includes(stack)) {
      onChange([...value, stack]);
    }
  };

  const handleRemove = (stack: string) => {
    onChange(value.filter((s) => s !== stack));
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-700">스택 선택</label>
      <div ref={ref} className="relative w-full">
        {/* 선택된 스택들 + 토글 버튼 */}
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex flex-wrap gap-2 justify-between items-center px-4 py-2 bg-white rounded-lg border border-gray-300 cursor-pointer outline-[#F4C430]"
        >
          <div className="flex flex-wrap gap-2">
            {value.length > 0 ? (
              value.map((stack) => (
                <span
                  key={stack}
                  onClick={() => handleRemove(stack)}
                  className="flex gap-1 items-center px-2 py-1 text-sm bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                >
                  {stack} x
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">{placeholder}</span>
            )}
          </div>
          <Image src="/assets/icons/chevronDown.svg" alt="chevronDown" width={16} height={16} />
        </div>

        {/* 드롭다운 목록 */}
        {isOpen && (
          <ul className="overflow-y-auto absolute z-10 mt-2 w-full max-h-48 bg-white rounded-lg border border-gray-300 shadow-sm">
            {stackList
              .filter((stack) => !value.includes(stack))
              .map((stack) => (
                <li
                  key={stack}
                  onClick={() => handleSelect(stack)}
                  className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  {stack}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
