// 마이페이지 페이지

import { LoginProfile } from '@/components/mypage/LoginProfile';
import { MyProfile } from '@/components/mypage/MyProfile';

export default function MyPage() {
  return (
    <section className="flex flex-col w-[35rem] justify-center mx-auto mt-8 gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-gray-900">로그인 한 정보</h2>
          <p className="text-sm text-gray-400">*해당 정보는 다른 사람에게 보여지지 않습니다.</p>
        </div>
        <LoginProfile />
      </div>
      <hr className="border-gray-300" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-gray-900">기본정보</h2>
          <p className="text-sm text-gray-400">*해당 정보는 다른 사람에게 보입니다.</p>
        </div>
        <MyProfile />
      </div>
    </section>
  );
}
