import Image from 'next/image';

export const LoginProfile = () => {
  return (
    <div className="flex gap-7">
      <Image
        src="/assets/img/profile.png"
        alt="profile"
        width={100}
        height={100}
        className="overflow-hidden rounded-full"
      />
      <div className="flex flex-col gap-4 justify-center">
        <p className="text-lg font-bold leading-none text-gray-900">김은혜</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Image src="/assets/icons/mail.svg" alt="mail" width={16} height={17} />
            <p className="text-sm leading-none text-gray-700">k07173027@gmail.com</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image src="/assets/icons/user-check.svg" alt="userCheck" width={16} height={17} />
            <p className="text-sm font-bold leading-none text-gray-700">인증된 유저</p>
          </div>
        </div>
      </div>
    </div>
  );
};
