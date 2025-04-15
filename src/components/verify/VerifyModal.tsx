'use client';

import { useState } from 'react';
import EmailStep from './EmailStep';
import CodeStep from './CodeStep';
import { checkEmailCode, sendEmailCode } from '@/apis/verify';

export default function VerifyModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 코드 전송
  const handleSendCode = async () => {
    try {
      setLoading(true);
      await sendEmailCode(email + '@office.skhu.ac.kr');
      setStep('code');
      setError('');
    } catch {
      setError('이메일 전송에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 인증 확인
  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('6자리 인증번호를 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      await checkEmailCode(email + '@office.skhu.ac.kr', code);
      onSuccess(); // 인증 완료 처리
      onClose(); // 모달 닫기
    } catch {
      setError('인증번호를 다시 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex fixed inset-0 justify-center items-center z-9999 bg-black/30">
      <div className="flex flex-col gap-4 p-6 w-full max-w-sm bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold leading-none">🎓 재학생 인증</h2>
          <button className="text-lg font-bold text-gray-700" onClick={onClose}>
            X
          </button>
        </div>
        {step === 'email' ? (
          <EmailStep
            email={email}
            setEmail={setEmail}
            onSubmit={handleSendCode}
            loading={loading}
            error={error}
          />
        ) : (
          <CodeStep
            code={code}
            setCode={setCode}
            onSubmit={handleVerify}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
