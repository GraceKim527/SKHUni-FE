'use client';

import Image from 'next/image';
import Link from 'next/link';
import { InputField } from './InputField';
import Dropdown from './Dropdown';
import { useState } from 'react';
import { LinkAdd } from './LinkAdd';
import TechStackSelector from './TechStackSelector';
import { STACKS_WITH_NAMES } from '@/types/stacks';
import 'md-editor-rt/lib/style.css';
import { MarkDownEditor } from './MarkDownEditor';
export const EditProfileForm = () => {
  const [selected, setSelected] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  return (
    <form className="flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-6">
          <Image
            src="/assets/img/profile.png"
            alt="profile"
            width={120}
            height={120}
            className="overflow-hidden rounded-full"
          />
          <button className="flex gap-2 items-center h-6 bg-[#F5F5F5] rounded-md p-1 justify-center">
            <Image src="/assets/icons/folderImg.svg" alt="folderImg" width={16} height={16} />
            <span className="text-xs text-gray-700">프로필 수정</span>
          </button>
        </div>
        <div className="flex flex-col gap-4 w-[450px]">
          <InputField label="이름" type="text" id="name" placeholder="이름을 입력해주세요" />
          <InputField
            label="이메일"
            type="email"
            id="email"
            placeholder="k07173027@gmail.com"
            disabled
          />
          <InputField
            label="컨택용 이메일"
            type="email"
            id="email"
            placeholder="상대방에게 보여질 이메일을 입력해주세요"
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="w-[10rem]">
            <InputField label="학번" type="text" id="studentId" placeholder="ex) 21" />
          </div>
          <div className="w-[10rem]">
            <Dropdown
              label="재학 상태"
              options={['재학중', '휴학중', '졸업', '졸업 유예']}
              value={selected}
              onChange={setSelected}
              placeholder="재학 상태"
            />
          </div>
          <div className="w-[16rem]">
            <Dropdown
              label="분야"
              options={['프론트엔드 개발', '백엔드 개발', '디자인', '기획', 'AI 개발']}
              value={selectedField}
              onChange={setSelectedField}
              placeholder="분야를 선택하세요"
            />
          </div>
        </div>
        <InputField
          label="한줄 소개"
          type="text"
          id="introduction"
          placeholder="소개를 입력해주세요"
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-700">자기소개</label>
          <MarkDownEditor />
        </div>

        <TechStackSelector
          stackList={STACKS_WITH_NAMES.map((stack) => stack.name)}
          value={selectedStacks}
          onChange={setSelectedStacks}
        />
        <LinkAdd />
      </div>
      <div className="flex gap-4 justify-end">
        <Link
          href="/mypage"
          className="flex gap-2 justify-center items-center px-6 py-2 h-10 bg-gray-200 rounded-lg leading-0"
        >
          <span className="text-base text-gray-700">취소</span>
        </Link>
        <button className="flex gap-2 items-center h-10 bg-[#512DA8] rounded-lg px-6 py-2 justify-center leading-0">
          <span className="text-base text-white">수정</span>
        </button>
      </div>
    </form>
  );
};
