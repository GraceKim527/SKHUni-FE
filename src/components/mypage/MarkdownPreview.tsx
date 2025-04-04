'use client';

import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  return <MdPreview value={content} theme="light" previewTheme="github" language="ko-KR" />;
};
