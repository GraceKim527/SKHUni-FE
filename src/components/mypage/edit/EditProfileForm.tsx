'use client';

import Image from 'next/image';
import Link from 'next/link';
import { InputField } from './InputField';
import Dropdown from './Dropdown';
import { useEffect, useState } from 'react';
import { LinkAdd } from './LinkAdd';
import TechStackSelector from './TechStackSelector';
import { STACKS_WITH_NAMES } from '@/constants/stacks';
import 'md-editor-rt/lib/style.css';
import { MarkDownEditor } from './MarkDownEditor';
import { getUserInfo, updateUserInfo } from '@/apis/members';
import { UserInfo, EnrollmentStatus, Field } from '@/types/users';
import { ENROLLMENT_STATUS_OPTIONS, FIELD_OPTIONS } from '@/constants/options';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { uploadProfileImage } from '@/apis/images';

interface TechStack {
  id: string;
  name: string;
}

export const EditProfileForm = () => {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const router = useRouter();

  const fetchUserInfo = async () => {
    setIsLoading(true);
    const response = await getUserInfo();
    setUserInfo(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo?.techStack) {
      setSelectedStacks(userInfo.techStack.split(',').filter((stack) => stack));
    }
  }, [userInfo]);

  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedIn: '',
    notion: '',
    etc1: '',
    etc2: '',
  });

  useEffect(() => {
    if (userInfo) {
      setSocialLinks({
        github: userInfo.github || '',
        linkedIn: userInfo.linkedIn || '',
        notion: userInfo.notion || '',
        etc1: userInfo.etc1 || '',
        etc2: userInfo.etc2 || '',
      });
    }
  }, [userInfo]);

  // 수정 버튼
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userInfo) {
      setIsSubmitLoading(true);
      const mergedUserInfo = {
        ...userInfo,
        ...socialLinks,
      };
      try {
        // 이미지 업로드
        if (selectedImageFile) {
          await uploadProfileImage(selectedImageFile);
        }

        await updateUserInfo({ ...mergedUserInfo });
        setIsSubmitLoading(false);
        alert('프로필이 성공적으로 업데이트되었습니다.');
        router.push('/mypage');
      } catch (error) {
        console.error('Update failed:', error);
        alert('프로필 업데이트에 실패했습니다.');
      }
    } else {
      console.error('User info is not available');
    }
  };

  // 프로필 수정 클릭 시 임시 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImageFile(file);
    const render = new FileReader();
    render.onload = () => {
      setPreviewImage(render.result as string);
    };
    render.readAsDataURL(file);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {isLoading && (
        <div className="flex justify-center items-center h-[20rem]">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              <img
                src={previewImage ?? userInfo?.picture ?? '/assets/img/profile.png'}
                alt="profile"
                width={120}
                height={120}
                className="overflow-hidden rounded-full w-[120px] h-[120px] object-cover"
              />

              <label
                htmlFor="profileImage"
                className="flex gap-2 items-center h-6 bg-[#F5F5F5] rounded-md p-1 justify-center cursor-pointer"
              >
                <Image src="/assets/icons/folderImg.svg" alt="folderImg" width={16} height={16} />
                <span className="text-xs text-gray-700">프로필 수정</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="profileImage"
                className="hidden"
              />
            </div>
            <div className="flex flex-col gap-4 w-[450px]">
              <InputField
                label="이름"
                type="text"
                id="name"
                placeholder="이름을 입력해주세요"
                value={userInfo?.name ?? ''}
                onChange={(e) => {
                  if (userInfo) {
                    setUserInfo({ ...userInfo, name: e.target.value });
                  }
                }}
              />
              <InputField
                label="이메일"
                type="email"
                id="email"
                placeholder={userInfo?.email ?? ''}
                disabled
              />
              <InputField
                label="컨택용 이메일"
                type="email"
                id="email"
                placeholder="상대방에게 보여질 이메일을 입력해주세요"
                value={userInfo?.contactEmail ?? ''}
                onChange={(e) => {
                  if (userInfo) {
                    setUserInfo({ ...userInfo, contactEmail: e.target.value });
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex justify-between">
              <div className="w-[10rem]">
                <InputField
                  label="학번"
                  type="text"
                  id="studentId"
                  placeholder="ex) 21"
                  value={userInfo?.studentId ?? ''}
                  onChange={(e) => {
                    if (userInfo) {
                      setUserInfo({ ...userInfo, studentId: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="w-[10rem]">
                <Dropdown
                  label="재학 상태"
                  options={ENROLLMENT_STATUS_OPTIONS.map((option) => option.label)}
                  value={
                    userInfo?.enrollmentStatus
                      ? ENROLLMENT_STATUS_OPTIONS.find(
                          (option) => option.value === userInfo.enrollmentStatus
                        )?.label ?? ''
                      : ''
                  }
                  onChange={(value) => {
                    if (userInfo) {
                      const selectedOption = ENROLLMENT_STATUS_OPTIONS.find(
                        (option) => option.label === value
                      );
                      setUserInfo({
                        ...userInfo,
                        enrollmentStatus: selectedOption?.value as EnrollmentStatus,
                      });
                    }
                  }}
                  placeholder="재학 상태"
                />
              </div>
              <div className="w-[16rem]">
                <Dropdown
                  label="분야"
                  options={FIELD_OPTIONS.map((option) => option.label)}
                  value={
                    userInfo?.fieldType
                      ? FIELD_OPTIONS.find((option) => option.value === userInfo.fieldType)
                          ?.label ?? ''
                      : ''
                  }
                  onChange={(value) => {
                    if (userInfo) {
                      const selectedOption = FIELD_OPTIONS.find((option) => option.label === value);
                      setUserInfo({ ...userInfo, fieldType: selectedOption?.value as Field });
                    }
                  }}
                  placeholder="분야를 선택하세요"
                />
              </div>
            </div>
            <InputField
              label="한줄 소개"
              type="text"
              id="introduction"
              placeholder="소개를 입력해주세요"
              value={userInfo?.introLine ?? ''}
              onChange={(e) => {
                if (userInfo) {
                  setUserInfo({ ...userInfo, introLine: e.target.value });
                }
              }}
            />
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-700">자기소개</label>
              <MarkDownEditor
                value={userInfo?.introduction ?? ''}
                onChange={(value) => {
                  if (userInfo) {
                    setUserInfo({ ...userInfo, introduction: value });
                  }
                }}
                placeholder="자기소개를 입력해주세요"
              />
            </div>

            <TechStackSelector
              stackList={STACKS_WITH_NAMES as unknown as TechStack[]}
              value={selectedStacks}
              onChange={(value) => {
                setSelectedStacks(value);
                if (userInfo) {
                  setUserInfo({ ...userInfo, techStack: value.join(',') });
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-700">링크</label>
              <LinkAdd
                icon="/assets/icons/github.svg"
                label="Github"
                value={socialLinks.github}
                onChange={(value) => setSocialLinks({ ...socialLinks, github: value })}
              />
              <LinkAdd
                icon="/assets/icons/linkedin.svg"
                label="LinkedIn"
                value={socialLinks.linkedIn}
                onChange={(value) => setSocialLinks({ ...socialLinks, linkedIn: value })}
              />
              <LinkAdd
                icon="/assets/icons/notion.svg"
                label="Notion"
                value={socialLinks.notion}
                onChange={(value) => setSocialLinks({ ...socialLinks, notion: value })}
              />
              <LinkAdd
                icon="/assets/icons/link.svg"
                label="Etc1"
                value={socialLinks.etc1}
                onChange={(value) => setSocialLinks({ ...socialLinks, etc1: value })}
              />
              <LinkAdd
                icon="/assets/icons/link.svg"
                label="Etc2"
                value={socialLinks.etc2}
                onChange={(value) => setSocialLinks({ ...socialLinks, etc2: value })}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2 items-center">
                <label htmlFor="coffeeChatOpen" className="text-base text-gray-700 leading-0">
                  커피챗 여부
                </label>
                <input
                  id="coffeeChatOpen"
                  type="checkbox"
                  checked={userInfo?.coffeeChatOpen ?? false}
                  onChange={(e) => {
                    if (userInfo) {
                      setUserInfo({ ...userInfo, coffeeChatOpen: e.target.checked });
                    }
                  }}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="codeReviewOpen" className="text-base text-gray-700 leading-0">
                  코드리뷰 여부
                </label>
                <input
                  id="codeReviewOpen"
                  type="checkbox"
                  checked={userInfo?.codeReviewOpen ?? false}
                  onChange={(e) => {
                    if (userInfo) {
                      setUserInfo({ ...userInfo, codeReviewOpen: e.target.checked });
                    }
                  }}
                />
              </div>
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
              className={`flex gap-2 items-center h-10 bg-[#512DA8] rounded-lg px-6 py-2 justify-center leading-0 ${
                isSubmitLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="text-base text-white">{isSubmitLoading ? '수정중...' : '수정'}</span>
            </button>
          </div>
        </>
      )}
    </form>
  );
};
