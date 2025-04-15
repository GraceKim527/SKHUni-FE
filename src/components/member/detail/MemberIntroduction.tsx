import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

interface MemberIntroductionProps {
  introduction: string;
}

export const MemberIntroduction = ({ introduction }: MemberIntroductionProps) => {
  return (
    <div className="pb-8">
      <MdPreview value={introduction || '소개글이 없습니다'} theme="light" language="ko-KR" />
    </div>
  );
};
