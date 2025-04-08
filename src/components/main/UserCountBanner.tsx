import Link from 'next/link';

export const UserCountBanner = ({ count }: { count: number }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center py-10 text-center">
      <h2 className="text-2xl font-semibold leading-8"> 🌐 </h2>
      <h3 className="text-2xl font-semibold leading-8">
        성공회대 <b className="font-bold text-[#512DA8]">{count}명</b>의 IT 학우들이 <br />
        지금 <span className="underline text-[#F4C430] underline-offset-4">스쿠니</span>에서
        연결되고 있어요!
      </h3>
      <button className="px-6 py-3 bg-[#512DA8] rounded-md text-white">
        <Link href="/member">등록된 학우 보러가기</Link>
      </button>
    </div>
  );
};
