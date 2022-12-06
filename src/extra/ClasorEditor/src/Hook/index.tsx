import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import { getEditor } from '../CoreEditor/Func';

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

export const CheckForMdFile = () => {
  const editor = getEditor();

  if (!editor) {
    return;
  }
  if (editor) {
    const mdFileTags = editor.getElementsByClassName('clasor-markdown-wrapper');
    if (mdFileTags && mdFileTags.length) {
      for (let i = 0; i < mdFileTags.length; ++i) {
        const mdFile = mdFileTags[i];
        const constent = mdFile.getAttribute('data-content');
        ReactDOM.render(
          <ReactMarkdown components={components} plugins={[gfm]}>
            {constent || ''}
          </ReactMarkdown>,
          mdFile
        );
        mdFile.setAttribute('data-content', '');
        mdFile.setAttribute('class', 'clasor-markdown-wrapper-rendered');
      }
    }
  }
};

let editorType = false;
export const useEditorType = () => {
  const changeType = (type: boolean) => {
    if (type === editorType) {
      return;
    }
    editorType = type;
  };

  const getType = () => {
    return editorType;
  };

  return { getType, changeType };
};
