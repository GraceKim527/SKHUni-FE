import Image from 'next/image';
import { AbleBadge } from '../common/AbleBadge';

export const MemberCard = () => {
  return (
    <div className="flex gap-8 w-full">
      <Image
        src="/assets/img/profile.png"
        alt="profile"
        width={100}
        height={100}
        style={{ width: '100px', height: '100px' }}
        className="rounded-full"
      />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg font-bold">김은혜</h3>
          <span>·</span>
          <p className="text-sm text-gray-500">프론트엔드</p>
        </div>
        <p className="text-sm text-gray-500">
          이곳은 한줄소개가 들어가는 공간입니다. 이곳은 한줄소개가 들어가는 공간입니다. 이곳은
          한줄소개가 들어가는 공간입니다.이곳은 한줄소개가 들어가는 공간입니다.
        </p>

        <div className="flex gap-2">
          <AbleBadge able={true} type="coffee" />
          <AbleBadge able={false} type="code" />
        </div>
      </div>
    </div>
  );
};
