import { MdEditor, config } from 'md-editor-rt';
import ko_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import 'md-editor-rt/lib/style.css';

interface MarkDownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const MarkDownEditor = ({ value, onChange, placeholder }: MarkDownEditorProps) => {
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
      value={value}
      onChange={onChange}
      theme="light"
      previewTheme="github"
      language="ko-KR"
      toolbars={['bold', 'italic', 'underline', 'title', 'link', 'table', 'preview']}
      showToolbarName
      placeholder={placeholder}
      preview={false}
    />
  );
};
