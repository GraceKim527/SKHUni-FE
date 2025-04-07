'use client';

import Image from 'next/image';

interface LinkAddProps {
  icon: string;
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
}

export const LinkAdd = ({ icon, label, value, onChange }: LinkAddProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <Image src={icon} alt={label} width={32} height={32} />
        <input
          type="text"
          placeholder="URL을 입력해주세요"
          className="px-3 py-2 w-full h-10 text-xs font-normal leading-4 text-gray-700 rounded-lg border border-gray-300 outline-[#F4C430]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
