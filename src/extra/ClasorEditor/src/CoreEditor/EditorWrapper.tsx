import React, { useEffect, useRef, useState } from 'react';
import { CKEditor } from 'ckeditor4-react';
import { getValue, setCkeditorInstance, setValue } from '../Store';
import { v4 as uuidv4 } from 'uuid';
import { EDialogType } from '../Interface';
import { getHandleChange } from './../Store';
<script
  type="text/javascript"
  src="ckeditor4/plugins/lite/js/jquery.min.js"
></script>;

interface IProps {
  type: boolean;
  setCodeSnippet: (value: { dialog: boolean; codeHash: string | null }) => void;
  setMdfileDialog: (value: {
    dialog: boolean;
    codeHash: string | null;
  }) => void;
  setFlowchart: (value: { dialog: boolean; codeHash: string | null }) => void;
  setExternal: (value: { dialog: boolean; codeHash: string | null }) => void;
  setWrapper: (value: boolean) => void;
  setOpenFileDialog: (value: EDialogType | null) => void;
  setOpenClasorImportExportDialog: (value: boolean | null) => void;
  handleChange: () => void;
  initContent: string;
}

let changeTypeTimeout: number;
const EditorWrapper = (props: IProps) => {
  const editorType = useRef(false);
  const [loading, setLoading] = useState(false);
  const {
    type,
    setCodeSnippet,
    setMdfileDialog,
    setFlowchart,
    setExternal,
    setOpenFileDialog,
    setWrapper,
    setOpenClasorImportExportDialog,
    handleChange,
    initContent,
  } = props;

  const frontendServer = getValue('frontendServer') as string;
  const removePlugins = ['exportpdf'];
  const userToken = getValue('token');
  const userGroupHash = getValue('userGroupHash');
  const userInfo = getValue('userInfo');
  const editorRef = useRef<any>(null);

  if (!userToken || !userGroupHash) {
    removePlugins.push('copytexttoclipboard');
  }

  const onCkeditorChange = () => {
    const onChange = getHandleChange();
    const data = editorRef.current.getData();
    if (onChange) {
      onChange(data);
    }
    setValue('content', data);
    handleChange();
  };

  useEffect(() => {
    if (editorType.current !== type) {
      editorType.current = type;
      changeEditorType();
    }
    return () => {
      clearTimeout(changeTypeTimeout);
    };
  }, [type]);

  const changeEditorType = () => {
    setLoading(true);
    changeTypeTimeout = window.setTimeout(() => {
      setLoading(false);
      handleChange();
    }, 1000);
  };

  const getConfig = () => {
    const config = {
      height: 'calc(100vh - 500px)',
      language: 'fa',
      removePlugins,
      codeSnippet_theme: 'monokai', // 'monokai_sublime', 'googlecode', 'docco', 'github', 'dark'
      setCodeSnippet,
      setMdfileDialog,
      setFlowchart,
      setExternal,
      setWrapper,
      uuidv4,
      setOpenFileDialog,
      setOpenClasorImportExportDialog,
      lite: userInfo && {
        jQueryPath: 'js/jquery.min.js',
        isOwner: JSON.parse(userInfo).isOwner,
      },
    };
    if (!userInfo) {
      delete config.lite;
    }
    return config;
  };

  const editorUrl = frontendServer + '/ckeditor4/ckeditor.js';
  return (
    <>
      {!loading ? (
        <CKEditor
          type={type ? 'inline' : 'classic'}
          config={getConfig()}
          onInstanceReady={(event: any) => {
            editorRef.current = event.editor;
            setCkeditorInstance(event.editor);
            if (editorRef.current && initContent) {
              editorRef.current.setData(initContent);
            }
            const lite = editorRef.current.plugins.lite;
            lite && lite.findPlugin(editorRef.current).setUserInfo(userInfo);
          }}
          id="CLASOREDITOR"
          name="CLASOREDITOR"
          onChange={onCkeditorChange}
          editorUrl={editorUrl}
        />
      ) : null}
    </>
  );
};

export default React.memo(EditorWrapper);
