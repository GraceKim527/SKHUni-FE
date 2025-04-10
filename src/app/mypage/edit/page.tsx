import { EditProfileForm } from '@/components/mypage/edit/EditProfileForm';

export default function EditPage() {
  return (
    <section className="flex flex-col w-full justify-center mx-auto mt-8 gap-8 sm:w-[40rem] px-4">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-gray-900">내 정보 수정</h2>
      </div>
      <EditProfileForm />
    </section>
  );
}
