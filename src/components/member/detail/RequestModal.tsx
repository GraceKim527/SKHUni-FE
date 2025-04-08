'use client';

import { useEffect, useState } from 'react';
import { requestCoffeeChat, requestCodeReview } from '@/apis/members';
interface RequestModalProps {
  toMemberId: number;
  onClose: () => void;
  type: '커피챗 요청' | '코드리뷰 요청';
}

export const RequestModal = ({ toMemberId, onClose, type }: RequestModalProps) => {
  const [content, setContent] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (type === '커피챗 요청') {
      setIsLoading(true);
      await requestCoffeeChat(toMemberId, content);
      setIsLoading(false);
      onClose();
    } else {
      setIsLoading(true);
      await requestCodeReview(toMemberId, content, githubLink);
      setIsLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="flex fixed inset-0 justify-center items-center z-9999 bg-black/30">
      <div className="flex flex-col gap-4 p-6 w-full max-w-sm bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold leading-none">{type}</h2>
          <button className="text-lg font-bold text-gray-700" onClick={onClose}>
            X
          </button>
        </div>
        <p className="text-sm text-gray-500">
          {type === '커피챗 요청'
            ? '커피챗 요청 메시지를 입력해주세요.'
            : '코드리뷰 요청 메시지를 입력해주세요.'}
        </p>
        <textarea
          className="p-2 w-full h-24 rounded-md border border-gray-300 resize-none outline-[#F4C430]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {type === '코드리뷰 요청' && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">깃허브 링크를 입력해주세요.</p>
            <input
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 leading-0 outline-[#F4C430]"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
        )}
        <button
          className="p-2 w-full text-white bg-[#512DA8] rounded-md"
          onClick={handleSubmit}
          disabled={content.length === 0 || isLoading}
        >
          {isLoading ? '요청중...' : '요청하기'}
        </button>
      </div>
    </div>
  );
};
