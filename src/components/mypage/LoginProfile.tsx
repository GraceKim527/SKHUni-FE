import { useAuthStore } from '@/store/useAuthStore';
import Image from 'next/image';

export const LoginProfile = () => {
  const role = useAuthStore((state) => state.role);
  const userInfo = useAuthStore((state) => state.userInfo);
  return (
    <div className="flex gap-7">
      <img
        src={userInfo.profileImage}
        alt="profile"
        width={100}
        height={100}
        className="object-cover w-24 h-24 rounded-full"
      />
      <div className="flex flex-col gap-4 justify-center">
        <p className="text-lg font-bold leading-none text-gray-900">{userInfo.name}</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Image src="/assets/icons/mail.svg" alt="mail" width={16} height={17} />
            <p className="text-sm leading-none text-gray-700">{userInfo.email}</p>
          </div>
          {role === 'ROLE_STUDENT' ? (
            <div className="flex gap-2 items-center">
              <Image src="/assets/icons/user-check.svg" alt="userCheck" width={16} height={17} />
              <p className="text-sm font-bold leading-none text-gray-700">인증된 유저</p>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Image src="/assets/icons/user-x.svg" alt="userX" width={16} height={17} />
              <p className="text-sm font-bold leading-none text-gray-700">인증되지 않은 유저</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
