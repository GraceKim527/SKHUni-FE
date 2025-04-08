'use client';

import { Project } from '@/types/projects';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ProjectDetailModal } from '@/components/member/detail/memberProject/ProjectDetailModal';
interface MyProjectCardProps {
  project: Project;
  onDelete: () => void;
}

export const MyProjectCard = ({ project, onDelete }: MyProjectCardProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4 justify-between w-full">
        <div className="w-[11.25rem] h-[6.25rem] flex-shrink-0">
          <img
            src={project.picture}
            alt={project.title}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div className="flex flex-col flex-grow gap-2">
          <h3
            className="text-sm font-semibold text-gray-900 cursor-pointer hover:underline"
            onClick={() => setIsOpen(true)}
          >
            {project.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">{project.introLine}</p>
          <div className="flex gap-3">
            {project.githubLink1 && (
              <a href={project.githubLink1} target="_blank" rel="noopener noreferrer">
                <Image src="/assets/icons/github.svg" alt="깃허브" width={24} height={24} />
              </a>
            )}
            {project.githubLink2 && (
              <a href={project.githubLink2} target="_blank" rel="noopener noreferrer">
                <Image src="/assets/icons/github.svg" alt="깃허브" width={24} height={24} />
              </a>
            )}
            {project.siteLink && (
              <a href={project.siteLink} target="_blank" rel="noopener noreferrer">
                <Image src="/assets/icons/link.svg" alt="사이트" width={24} height={24} />
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-shrink-0 gap-3 items-start w-fit">
          <button
            type="button"
            className="text-xs text-gray-600"
            onClick={() => router.push(`/mypage/project/${project.projectId}/edit`)}
          >
            수정
          </button>
          <button type="button" className="text-xs text-[#E53935]" onClick={onDelete}>
            삭제
          </button>
        </div>
      </div>
      <ProjectDetailModal isOpen={isOpen} onClose={() => setIsOpen(false)} project={project} />
    </>
  );
};
