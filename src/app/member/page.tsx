import { MemberListPage } from '@/components/member/MemberListPage';

export default function MembersPage() {
  return (
    <section className="flex flex-col w-full justify-center mx-auto mt-8 gap-8 md:w-[50rem] px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold">등록된 회대 멤버 목록</h3>
          <p className="text-sm text-gray-500">
            성공회대 IT 커뮤니티 스쿠니에 등록된 멤버를 확인할 수 있습니다.
          </p>
        </div>
        <MemberListPage />
      </div>
    </section>
  );
}
