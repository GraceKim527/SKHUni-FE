import { Project } from '@/types/projects';
import { MemberProject } from './memberProject/MemberProject';

interface MemberProjectsProps {
  projects: Project[] | null;
}

export const MemberProjects = ({ projects }: MemberProjectsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">프로젝트</h3>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects && Array.isArray(projects) ? (
          projects.map((project) => <MemberProject key={project.projectId} project={project} />)
        ) : (
          <p>프로젝트가 없거나 데이터 형식이 올바르지 않습니다.</p>
        )}
      </div>
    </div>
  );
};
