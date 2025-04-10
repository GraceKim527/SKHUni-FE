import { MemberListPage } from '@/components/member/MemberListPage';

export default function MembersPage() {
  return (
    <section className="flex flex-col w-full justify-center mx-auto mt-8 gap-8 md:w-[50rem] px-4">
      <div className="flex flex-col gap-6">
        <MemberListPage />
      </div>
    </section>
  );
}
