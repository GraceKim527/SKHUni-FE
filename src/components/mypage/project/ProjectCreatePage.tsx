'use client';
import ProjectForm from './ProjectForm';
import { ProjectCreate } from '@/types/projects';
import { useState } from 'react';
import { createProject } from '@/apis/projects';
import { useRouter } from 'next/navigation';
export default function ProjectCreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ProjectCreate) => {
    setIsSubmitting(true);
    await createProject(data);
    setIsSubmitting(false);
    router.push('/mypage');
  };

  return (
    <div className="flex flex-col gap-4">
      <ProjectForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
}
