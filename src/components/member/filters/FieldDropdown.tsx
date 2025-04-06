'use client';

import { useState, useRef, useEffect } from 'react';
import { Field, FIELD_LABELS, FIELD_OPTIONS } from '@/constants/fields';
import Image from 'next/image';

interface FieldDropdownProps {
  selected: Field | '';
  onSelect: (value: Field) => void;
}

export default function FieldDropdown({ selected, onSelect }: FieldDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-sm w-[8rem]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center px-4 py-2 bg-white rounded-lg border border-gray-300 outline-[#F4C430] hover:bg-gray-50"
      >
        <span className="mr-4">{selected ? FIELD_LABELS[selected] : '분야 선택'} </span>
        <Image src="/assets/icons/chevronDown.svg" alt="chevronDown" width={16} height={16} />
      </button>
      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white rounded-md border border-gray-200 shadow-md">
          {FIELD_OPTIONS.map(({ value, label }) => (
            <li
              key={value}
              onClick={() => {
                onSelect(value);
                setOpen(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
