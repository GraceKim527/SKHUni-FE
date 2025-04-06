interface BadgeProps {
  type: 'coffee' | 'code';
  able: boolean;
}

export const AbleBadge = ({ able, type }: BadgeProps) => {
  return (
    <div
      className="flex justify-center items-center px-3 py-1 rounded-full"
      style={{
        backgroundColor: able ? '#4CAF501A' : '#E539351A',
        color: able ? '#4CAF50' : '#E53935',
      }}
    >
      <p className="text-xs font-bold">
        {type === 'coffee'
          ? able
            ? '커피챗 가능'
            : '커피챗 불가능'
          : able
          ? '코드리뷰 가능'
          : '코드리뷰 불가능'}
      </p>
    </div>
  );
};
