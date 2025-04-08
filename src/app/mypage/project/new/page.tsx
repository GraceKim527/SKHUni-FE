import ProjectCreatePage from '@/components/mypage/project/ProjectCreatePage';

export default function ProjectNewPage() {
  return (
    <section className="flex flex-col w-[35rem] justify-center mx-auto mt-8 gap-8">
      <h2 className="text-xl font-bold text-gray-900">프로젝트 생성</h2>
      <ProjectCreatePage />
    </section>
  );
}
