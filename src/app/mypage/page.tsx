// 마이페이지 페이지
'use client';
import { LoginProfile } from '@/components/mypage/LoginProfile';
import { useEffect, useState } from 'react';
import VerifyModal from '@/components/verify/VerifyModal';
import { useAuthStore } from '@/store/useAuthStore';
import { MyProfile } from '@/components/mypage/MyProfile';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { getUserInfo } from '@/apis/members';
import { deleteProject, getMyProjects } from '@/apis/projects';
import { MyProjectCard } from '@/components/mypage/MyProjectCard';
import { Project } from '@/types/projects';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function MyPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const role = useAuthStore((state) => state.role);
  const { fetchRole } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRole(); // 최신 role 불러오기

        const latestRole = useAuthStore.getState().role;

        if (latestRole === 'ROLE_STUDENT') {
          const response = await getUserInfo();
          setUserInfo(response.data);
          const projectsResponse = await getMyProjects();
          setProjects(projectsResponse.data.projects);
        }
      } catch (error) {
        console.error('데이터 로딩 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [role]);

  const handleDeleteProject = async (projectId: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteProject(projectId);
        setProjects(projects.filter((project) => project.projectId !== projectId));
        toast.success('프로젝트가 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('프로젝트 삭제 실패:', error);
      }
    }
  };

  return (
    <section className="flex flex-col w-full justify-center mx-auto mt-8 gap-8 sm:w-[35rem] px-4">
      {isLoading && (
        <div className="flex justify-center items-center h-[20rem]">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-gray-900">로그인 한 정보</h2>
              <p className="text-sm text-gray-400">*해당 정보는 다른 사람에게 보여지지 않습니다.</p>
            </div>
            <LoginProfile />
          </div>
          <hr className="border-gray-300" />
          <div className="flex flex-col gap-6">
            {role === 'ROLE_USER' && (
              <div className="flex flex-col gap-4 justify-center items-center">
                <p className="text-base text-gray-700">
                  성공회대 재학생인가요? 그렇다면 학교 인증을 통해 프로필을 등록해보세요!
                </p>
                <button
                  className="w-[10rem] py-3 text-sm text-white bg-[#512DA8] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setIsOpen(true)}
                >
                  재학생 인증하기
                </button>
              </div>
            )}
            {role === 'ROLE_STUDENT' && (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-gray-900">기본정보</h2>
                  <p className="text-sm text-gray-400">*해당 정보는 다른 사람에게 보입니다.</p>
                </div>
                <MyProfile userInfo={userInfo} />
                <hr className="border-gray-300" />
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-gray-900">나의 프로젝트</h2>
                    <p className="text-sm text-gray-400">*해당 정보는 다른 사람에게 보입니다.</p>
                  </div>
                  <button
                    type="button"
                    className="w-28 h-10 bg-[#512DA8] text-white rounded-lg text-sm px-2"
                    onClick={() => router.push('/mypage/project/new')}
                  >
                    프로젝트 추가
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {projects.map((project) => (
                    <MyProjectCard
                      key={project.projectId}
                      project={project}
                      onDelete={() => handleDeleteProject(project.projectId)}
                    />
                  ))}
                  {projects.length === 0 && (
                    <p className="text-sm text-gray-400">등록된 프로젝트가 없습니다.</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {isOpen && (
            <VerifyModal
              onClose={() => setIsOpen(false)}
              onSuccess={() => {
                setIsOpen(false);
                fetchRole();
              }}
            />
          )}
        </>
      )}
    </section>
  );
}
