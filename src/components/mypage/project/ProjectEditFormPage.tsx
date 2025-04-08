'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectForm from './ProjectForm';
import { getProjectById, updateProject } from '@/apis/projects';
import { Project, ProjectCreate } from '@/types/projects';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface ProjectEditFormPageProps {
  projectId: number;
}

export default function ProjectEditFormPage({ projectId }: ProjectEditFormPageProps) {
  const router = useRouter();

  const [initialData, setInitialData] = useState<ProjectCreate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 프로젝트 불러오기
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId);
        const project: Project = response.data;

        // ProjectCreate 타입으로 변환
        const formatted: ProjectCreate = {
          title: project.title,
          introLine: project.introLine,
          introduction: project.introduction,
          siteLink: project.siteLink,
          githubLink1: project.githubLink1,
          githubLink2: project.githubLink2,
          picture: project.picture,
        };

        setInitialData(formatted);
        setIsLoading(false);
      } catch (error) {
        console.error('프로젝트 데이터를 불러오는 데 실패했습니다.', error);
        setIsLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  // 수정 제출
  const handleSubmit = async (data: ProjectCreate) => {
    try {
      setIsSubmitting(true);
      await updateProject(projectId, data);
      router.push('/mypage');
    } catch (error) {
      console.error('프로젝트 수정 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-4">
      <ProjectForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
}
