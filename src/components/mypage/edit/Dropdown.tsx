'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  label,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="flex relative flex-col gap-1 w-full max-w-xs">
      <label className="text-xs text-gray-700">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-[40px] flex justify-between items-center px-4 py-2 w-full text-sm text-left text-gray-700 bg-white rounded-lg border border-gray-300 outline-[#F4C430] "
      >
        <span className="mr-2">{value || placeholder}</span>
        <Image src="/assets/icons/chevronDown.svg" alt="chevronDown" width={16} height={16} />
      </button>

      {isOpen && (
        <ul className="absolute top-16 z-10 p-1 mt-1 w-full bg-white rounded-lg border border-gray-300 shadow-sm">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
