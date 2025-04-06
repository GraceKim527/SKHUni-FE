'use client';

interface ToggleFiltersProps {
  coffeeChat: boolean;
  codeReview: boolean;
  onChange: (field: 'coffeeChat' | 'codeReview', value: boolean) => void;
}

export default function ToggleFilters({ coffeeChat, codeReview, onChange }: ToggleFiltersProps) {
  return (
    <div className="flex gap-4 text-sm">
      <label className="flex gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={coffeeChat}
          onChange={(e) => onChange('coffeeChat', e.target.checked)}
        />
        커피챗 여부
      </label>
      <label className="flex gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={codeReview}
          onChange={(e) => onChange('codeReview', e.target.checked)}
        />
        코드리뷰 여부
      </label>
    </div>
  );
}
