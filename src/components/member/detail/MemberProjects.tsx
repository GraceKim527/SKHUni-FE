import { Project } from '@/types/projects';
import { MemberProject } from './memberProject/MemberProject';

interface MemberProjectsProps {
  projects: Project[] | null;
}

export const MemberProjects = ({ projects }: MemberProjectsProps) => {
  console.log(projects);
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">프로젝트</h3>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects && projects.length > 0 ? (
          projects.map((project) => <MemberProject key={project.projectId} project={project} />)
        ) : (
          <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
        )}
      </div>
    </div>
  );
};
