import { ReactNode, useState } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="flex relative items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 z-10 px-3 py-1 mb-2 text-xs text-white whitespace-nowrap bg-gray-800 rounded-lg shadow-md -translate-x-1/2">
          {text}
          <div className="absolute top-full left-1/2 w-2 h-2 bg-gray-800 rotate-45 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
}
