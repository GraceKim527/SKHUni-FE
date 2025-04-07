'use client';

interface SearchInputProps {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <input
      type="text"
      placeholder="이름으로 검색"
      value={value}
      onChange={(e) => onChange(e)}
      className="px-4 py-2 w-full text-sm rounded-lg border border-gray-300 outline-[#F4C430]"
    />
  );
};
