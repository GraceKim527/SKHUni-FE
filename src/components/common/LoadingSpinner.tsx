'use client';

export default function LoadingSpinner() {
  return (
    <div className=" inset-0 bg-white bg-opacity-70 flex items-center justify-center z-[9999]">
      <div className="w-16 h-16 rounded-full border-4 animate-spin border-primary border-t-transparent" />
    </div>
  );
}
