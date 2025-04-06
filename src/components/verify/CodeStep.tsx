'use client';

import { useRef, useState } from 'react';

interface Props {
  code: string;
  setCode: (code: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
}

export default function CodeStep({ code, setCode, onSubmit, loading, error }: Props) {
  const [values, setValues] = useState(Array(6).fill(''));
  const inputs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return; // 문자와 숫자 1자리 허용
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    setCode(newValues.join(''));

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^[a-zA-Z0-9]{6}$/.test(pastedData)) return; // 6자리 문자/숫자만 허용

    const newValues = pastedData.split('');
    setValues(newValues);
    setCode(pastedData);
    inputs.current[5]?.focus(); // 마지막 입력칸에 포커스
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-between">
        {values.map((value, i) => (
          <input
            key={i}
            ref={(el) => {
              if (el) inputs.current[i] = el;
            }}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-[#512DA8]"
          />
        ))}
      </div>

      {error && <p className="text-sm text-[#E53935]">{error}</p>}

      <button
        onClick={onSubmit}
        disabled={loading || code.length !== 6}
        className="py-3 text-sm text-white bg-[#512DA8] rounded-lg disabled:opacity-50"
      >
        {loading ? '인증 중...' : '인증하기'}
      </button>
      <p className="text-xs text-gray-700">인증번호가 안왔나요? 스팸 메일함을 확인해보세요.</p>
    </div>
  );
}
