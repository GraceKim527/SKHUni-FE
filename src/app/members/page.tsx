import { MemberListPage } from '@/components/member/MemberListPage';

export default function MembersPage() {
  return (
    <section className="flex flex-col w-[40rem] justify-center mx-auto mt-8 gap-8">
      <div className="flex flex-col gap-6">
        <MemberListPage />
      </div>
    </section>
  );
}
