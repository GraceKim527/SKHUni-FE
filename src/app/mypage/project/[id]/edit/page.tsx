'use client';

import ProjectEditFormPage from '@/components/mypage/project/ProjectEditFormPage';
import { useParams } from 'next/navigation';
import { BackLink } from '@/components/common/BackLink';
export default function ProjectEditPage() {
  const { id } = useParams();
  return (
    <section className="flex flex-col w-full justify-center mx-auto mt-8 gap-8 sm:w-[35rem] px-4">
      <BackLink href="/mypage" />
      <h2 className="text-xl font-bold text-gray-900">프로젝트 수정</h2>
      <ProjectEditFormPage projectId={Number(id)} />
    </section>
  );
}
