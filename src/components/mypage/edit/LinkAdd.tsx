import Image from 'next/image';

const linkList = [
  {
    name: '깃허브',
    icon: 'github',
  },
  {
    name: '링크드인',
    icon: 'linkedIn',
  },
  {
    name: '노션',
    icon: 'notion',
  },
  {
    name: 'anything1',
    icon: 'link',
  },
  {
    name: 'anything2',
    icon: 'link',
  },
];

export const LinkAdd = () => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-gray-700">링크</label>
      {linkList.map((link) => (
        <div key={link.name} className="flex gap-4 items-center">
          <Image src={`/assets/icons/${link.icon}.svg`} alt={link.name} width={32} height={32} />
          <input
            type="text"
            placeholder="URL을 입력해주세요"
            className={`px-3 py-2 w-full h-10 text-xs font-normal leading-4 text-gray-700 rounded-lg border border-gray-300 outline-[#F4C430]`}
          />
        </div>
      ))}
    </div>
  );
};
