import Image from 'next/image';
import Link from 'next/link';
import { MarkdownPreview } from './MarkdownPreview';

const mockMarkdown = `
  ## ✨ 자기소개

안녕하세요! 프론트엔드 개발자 **홍길동**입니다.  
좋아하는 기술 스택은 \`React\`, \`Next.js\`, \`TypeScript\`입니다.

---

### 💡 관심 분야

- UI/UX 개선
- 디자인 시스템 구축
- 퍼포먼스 최적화

---

### 📫 연락처

- 이메일: honggildong@example.com
- GitHub: [https://github.com/honggildong](https://github.com/honggildong)
`;

export const MyProfile = () => {
  return (
    <div className="flex flex-col gap-10 justify-between">
      <div className="flex gap-8">
        <Image
          src="/assets/img/profile.png"
          alt="profile"
          width={120}
          height={120}
          className="overflow-hidden rounded-full"
        />
        <div className="flex justify-between w-[400px]">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-700">김은혜</h3>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Image src="/assets/icons/mail.svg" alt="mail" width={16} height={17} />
                <p className="text-sm leading-none text-gray-700">k07173027@gmail.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <Image src="/assets/icons/school.svg" alt="학번" width={16} height={16} />
                <h6 className="text-sm font-normal leading-none text-gray-700">21학번 (재학중)</h6>
              </div>
              <div className="flex gap-2 items-center">
                <Image src="/assets/icons/fieldBook.svg" alt="분야" width={16} height={16} />
                <h6 className="text-sm font-normal leading-none text-gray-700">프론트엔드 개발</h6>
              </div>
            </div>
          </div>
          <Link
            href="/mypage/edit"
            className="h-8 px-3 py-1 text-sm rounded-md text-gray-500 border-none bg-[#F5F5F5] flex items-center"
          >
            내 정보 수정
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">한줄 소개</h3>
        <p className="text-sm text-gray-500">
          한 줄 소개는 다음과 같습니다. 한 줄 소개는 다음과 같습니다. 한 줄 소개는 다음과 같습니다.
          한 줄 소개는 다음과 같습니다. 한 줄 소개는 다음과 같습니다.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">자기소개</h3>
        {/* 나중에 마크다운 뷰 들어갈 예정 */}
        <MarkdownPreview content={mockMarkdown} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">기술 스택</h3>
        <div className="flex gap-2">
          <img src={`https://skillicons.dev/icons?i=github`} alt="github" width={32} height={32} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">링크</h3>
        <div className="flex gap-2">
          <a
            href="https://github.com/GraceKim527"
            target="_blank"
            className="w-10 h-10 rounded-sm border-gray-300 border-[1px] flex justify-center items-center"
          >
            <Image src="/assets/icons/github.svg" alt="github" width={32} height={32} />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">외부 컨택 여부</h3>
        <div className="flex gap-4">
          <div className="flex gap-1 items-center">
            <p className="text-base">커피챗 오픈 여부</p>
            <Image src="/assets/icons/successCheck.svg" alt="successCheck" width={16} height={16} />
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-base">코드리뷰 오픈 여부</p>
            <Image src="/assets/icons/errorX.svg" alt="errorX" width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
