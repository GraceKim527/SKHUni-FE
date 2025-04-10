import { Project } from '@/types/projects';
import { useState } from 'react';
import { ProjectDetailModal } from './ProjectDetailModal';

interface MemberProjectProps {
  project: Project;
}

export const MemberProject = ({ project }: MemberProjectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="flex flex-col gap-4 transition-opacity cursor-pointer hover:opacity-80"
        onClick={() => setIsModalOpen(true)}
      >
        <img src={project.picture} alt={project.title} className="object-cover w-full h-60" />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">{project.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{project.introLine}</p>
        </div>
      </div>

      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
      />
    </>
  );
};
