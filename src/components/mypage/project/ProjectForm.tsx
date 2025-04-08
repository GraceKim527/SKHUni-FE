'use client';

import { useEffect, useState } from 'react';
import { ProjectCreate } from '@/types/projects';
import { InputField } from '../edit/InputField';
import { MarkDownEditor } from '../edit/MarkDownEditor';
import Link from 'next/link';
import Image from 'next/image';
import { imageUpload } from '@/apis/projects';

interface ProjectFormProps {
  initialData?: ProjectCreate | null; // 수정용
  onSubmit: (data: ProjectCreate) => void;
  isLoading: boolean;
}

export default function ProjectForm({ initialData, onSubmit, isLoading }: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [introLine, setIntroLine] = useState(initialData?.introLine ?? '');
  const [introduction, setIntroduction] = useState(initialData?.introduction ?? '');
  const [siteLink, setSiteLink] = useState(initialData?.siteLink ?? '');
  const [githubLink1, setGithubLink1] = useState(initialData?.githubLink1 ?? '');
  const [githubLink2, setGithubLink2] = useState(initialData?.githubLink2 ?? '');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setIntroLine(initialData.introLine);
      setIntroduction(initialData.introduction);
      setSiteLink(initialData.siteLink);
      setGithubLink1(initialData.githubLink1);
      setGithubLink2(initialData.githubLink2);
      setPreviewImage(initialData.picture);
    }
    console.log(initialData);
  }, [initialData]);

  // 프로젝트 이미지 수정 시 임시 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    const render = new FileReader();
    render.onload = () => {
      setPreviewImage(render.result as string);
    };
    render.readAsDataURL(file);
  };

  // 프로젝트 저장
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let pictureUrl = initialData?.picture ?? ''; // 초기값

    if (image) {
      const response = await imageUpload(image); // 새 이미지 업로드
      pictureUrl = response.data;
    }

    const projectData: ProjectCreate = {
      title,
      introLine,
      introduction,
      siteLink,
      githubLink1,
      githubLink2,
      picture: pictureUrl, // 업로드 결과 반영!
    };

    console.log(projectData);
    onSubmit(projectData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputField
        label="프로젝트 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="프로젝트 제목"
        type="text"
        id="title"
      />
      <InputField
        label="한줄 소개"
        value={introLine}
        onChange={(e) => setIntroLine(e.target.value)}
        placeholder="한줄 소개"
        type="text"
        id="introLine"
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="introduction" className="text-xs text-gray-700">
          프로젝트 설명
        </label>
        <MarkDownEditor
          value={introduction}
          onChange={(value) => setIntroduction(value)}
          placeholder="프로젝트 설명을 입력해주세요"
        />
      </div>

      <InputField
        label="배포된 서비스 링크"
        value={siteLink}
        onChange={(e) => setSiteLink(e.target.value)}
        placeholder="사이트 링크"
        type="url"
        id="siteLink"
      />

      <InputField
        label="깃허브 링크1"
        value={githubLink1}
        onChange={(e) => setGithubLink1(e.target.value)}
        placeholder="깃허브 링크를 기재해주세요"
        type="url"
        id="githubLink1"
      />

      <InputField
        label="깃허브 링크2"
        value={githubLink2}
        onChange={(e) => setGithubLink2(e.target.value)}
        placeholder="깃허브 링크를 기재해주세요"
        type="url"
        id="githubLink2"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="image" className="text-xs text-gray-700">
          프로젝트 이미지
        </label>
        <div className="flex flex-col gap-6">
          <img
            src={previewImage ?? '/assets/icons/thumbnail.svg'}
            alt="thumbnail"
            width={180}
            height={100}
            className=" w-[11.25rem] h-[6.25rem] rounded-md object-cover"
          />

          <label
            htmlFor="profileImage"
            className="flex gap-2 items-center w-[11.25rem] h-6 bg-[#F5F5F5] rounded-md p-1 justify-center cursor-pointer"
          >
            <Image src="/assets/icons/folderImg.svg" alt="folderImg" width={16} height={16} />
            <span className="text-xs text-gray-700">프로젝트 사진 수정</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="profileImage"
            className="hidden"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <Link
          href="/mypage"
          className="flex gap-2 justify-center items-center px-6 py-2 h-10 bg-gray-200 rounded-lg leading-0"
        >
          <span className="text-base text-gray-700">취소</span>
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex gap-2 items-center h-10 bg-[#512DA8] text-white rounded-lg px-6 py-2 justify-center leading-0 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
}
