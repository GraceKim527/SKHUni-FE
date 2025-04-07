// 마이페이지 페이지
'use client';
import { LoginProfile } from '@/components/mypage/LoginProfile';
import { useEffect, useState } from 'react';
import VerifyModal from '@/components/verify/VerifyModal';
import { useAuthStore } from '@/store/useAuthStore';
import { MyProfile } from '@/components/mypage/MyProfile';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { getUserInfo } from '@/apis/members';

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const role = useAuthStore((state) => state.role);
  const { fetchRole } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 역할 정보 가져오기
        await fetchRole();

        // 역할이 ROLE_STUDENT인 경우에만 사용자 정보 가져오기
        if (role === 'ROLE_STUDENT') {
          const response = await getUserInfo();
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('데이터 로딩 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchRole, role]);

  return (
    <section className="flex flex-col w-[35rem] justify-center mx-auto mt-8 gap-8">
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
              <>
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-gray-900">기본정보</h2>
                  <p className="text-sm text-gray-400">*해당 정보는 다른 사람에게 보입니다.</p>
                </div>
                <MyProfile userInfo={userInfo} />
              </>
            )}
          </div>
          {isOpen && (
            <VerifyModal onClose={() => setIsOpen(false)} onSuccess={() => setIsOpen(false)} />
          )}
        </>
      )}
    </section>
  );
}
