import { BackLink } from '@/components/common/BackLink';
import ProjectCreatePage from '@/components/mypage/project/ProjectCreatePage';

export default function ProjectNewPage() {
  return (
    <section className="flex flex-col w-full justify-center mx-auto mt-8 gap-8 sm:w-[35rem] px-4">
      <BackLink href="/mypage" />
      <h2 className="text-xl font-bold text-gray-900">프로젝트 생성</h2>
      <ProjectCreatePage />
    </section>
  );
}
