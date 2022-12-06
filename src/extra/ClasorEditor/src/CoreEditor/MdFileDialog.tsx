import React, { useState, useRef } from 'react';
import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { ClasorModal } from '../Modal';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { getEditorInstance } from '../Store';

const components: Partial<NormalComponents & SpecialComponents> = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <div style={{ direction: 'ltr' }}>
        <SyntaxHighlighter
          style={dracula}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, '')}
          {...props}
        />
      </div>
    ) : (
      <div style={{ direction: 'ltr' }}>
        <code className={className} {...props} />
      </div>
    );
  },
};

declare interface IProps {
  close: () => void;
}

const MdFileDialog = (props: IProps) => {
  const { close } = props;
  const [mdName, setMdName] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const confirmDialog = () => {
    confirm();
    close();
  };

  const confirm = () => {
    const customCodeSnippetDialog =
      document.getElementsByClassName('import-md-file');
    if (!customCodeSnippetDialog || !customCodeSnippetDialog[0]) {
      return;
    }

    const confirmBtn = customCodeSnippetDialog[0].getElementsByClassName(
      'cke_dialog_ui_button_ok'
    ) as HTMLCollectionOf<HTMLButtonElement>;
    if (!confirmBtn || !confirmBtn[0]) {
      return;
    }
    if (Array.from(confirmBtn)[0]) {
      Array.from(confirmBtn)[0].click();
    }

    const editorInstance = getEditorInstance();
    const endOfLine = '<p className="new-line"></p>';
    editorInstance?.insertHtml(endOfLine);
    close();
  };

  const handleFileInput = async (event: any) => {
    event.preventDefault();
    if (!event.target || !event.target.files || !event.target.files[0]) {
      return;
    }
    const mdName = event.target.files[0].name;
    const reader = new FileReader();
    reader.onload = async (event) => {
      let mdText = event && event.target && (event.target.result as string);
      if (mdText && inputRef.current) {
        inputRef.current.value = mdText;
        setMdName(mdName);
      }
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <ClasorModal title="فایل خود را انتخاب کنید" open={true} onClose={close}>
      <>
        <div style={{ display: 'flex', width: '100%', margin: '15px 0' }}>
          <input
            placeholder="فایل با پسوند .md"
            className="mdfileName"
            value={mdName || ''}
            disabled={true}
            style={{ marginLeft: '5px', flex: 1 }}
          />
          <button className="clasor-btn" style={{ position: 'relative' }}>
            بارگذاری
            <input
              accept=".md"
              style={{
                display: 'inline-block',
                position: 'absolute',
                opacity: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: '100%',
                top: 0,
                cursor: 'pointer',
              }}
              id="raised-button-file"
              type="file"
              onChange={handleFileInput}
            />
          </button>
        </div>
        <div
          style={{
            flexDirection: 'column',
            flex: 1,
            overflow: 'auto',
            padding: '10px',
          }}
        >
          <div
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}
            className={`wrapper ${preview ? '' : 'edit'}`}
          >
            <div
              style={{
                display: `${!preview ? 'none' : 'inline-block'}`,
                width: '100%',
                height: '100%',
              }}
              data-content={`${inputRef.current?.value}`}
              className="clasor-markdown-wrapper"
            >
              <ReactMarkdown components={components} plugins={[gfm]}>
                {inputRef.current?.value || ''}
              </ReactMarkdown>
            </div>
            <textarea
              ref={inputRef}
              placeholder="md..."
              className="clasor-input"
              style={{
                display: `${!preview ? 'inline-block' : 'none'}`,
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
        <div style={{ width: '100%', padding: '25px 0px', textAlign: 'left' }}>
          <button
            className="clasor-btn cancel"
            onClick={() => setPreview(!preview)}
          >
            {preview ? 'ویرایش' : 'پیش نمایش'}
          </button>
          <button className="clasor-btn cancel" onClick={close}>
            انصراف
          </button>
          <button onClick={confirmDialog} className="clasor-btn">
            تایید و ذخیره
          </button>
        </div>
      </>
    </ClasorModal>
  );
};

export default MdFileDialog;
