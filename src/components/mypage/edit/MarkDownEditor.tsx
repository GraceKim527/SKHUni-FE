import { MdEditor, config } from 'md-editor-rt';
import { useState } from 'react';
import ko_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import 'md-editor-rt/lib/style.css';

export const MarkDownEditor = () => {
  const [text, setText] = useState('');

  config({
    editorConfig: {
      languageUserDefined: {
        'ko-KR': ko_KR,
      },
    },
  });

  return (
    <MdEditor
      className="rounded-md border border-gray-300"
      style={{
        border: '1px solid oklch(0.872 0.01 258.338) !important',
        borderRadius: '8px',
      }}
      value={text}
      onChange={setText}
      theme="light"
      previewTheme="github"
      language="ko-KR"
      toolbars={['bold', 'italic', 'underline', 'title', 'link', 'table', 'preview']}
      showToolbarName
      placeholder="자신을 소개하는 내용을 입력해주세요 "
    />
  );
};
