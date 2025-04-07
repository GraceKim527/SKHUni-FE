'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ToggleFiltersProps {
  coffeeChat: boolean | undefined;
  codeReview: boolean | undefined;
  onChange: (field: 'coffeeChat' | 'codeReview', value: boolean) => void;
}

const ToggleFilters = ({ coffeeChat, codeReview, onChange }: ToggleFiltersProps) => {
  const [coffeeChatState, setCoffeeChatState] = useState<boolean>(coffeeChat || false);
  const [codeReviewState, setCodeReviewState] = useState<boolean>(codeReview || false);

  // 초기값이 변경되면 내부 상태 업데이트
  useEffect(() => {
    setCoffeeChatState(coffeeChat || false);
    setCodeReviewState(codeReview || false);
  }, [coffeeChat, codeReview]);

  const handleToggle = (field: 'coffeeChat' | 'codeReview') => {
    if (field === 'coffeeChat') {
      const newValue = !coffeeChatState;
      setCoffeeChatState(newValue);
      onChange('coffeeChat', newValue);
    } else {
      const newValue = !codeReviewState;
      setCodeReviewState(newValue);
      onChange('codeReview', newValue);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-700">커피챗</span>
        <button
          onClick={() => handleToggle('coffeeChat')}
          className="flex justify-center items-center w-8 h-8 rounded-md border border-gray-300"
        >
          {coffeeChatState && (
            <Image
              src="/assets/icons/successCheck.svg"
              alt="커피챗 오픈 여부"
              width={16}
              height={16}
            />
          )}
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-700">코드리뷰</span>
        <button
          onClick={() => handleToggle('codeReview')}
          className="flex justify-center items-center w-8 h-8 rounded-md border border-gray-300"
        >
          {codeReviewState && (
            <Image
              src="/assets/icons/successCheck.svg"
              alt="코드리뷰 오픈 여부"
              width={16}
              height={16}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ToggleFilters;
