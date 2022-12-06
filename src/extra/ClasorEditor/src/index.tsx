import React, { Ref, useEffect, useImperativeHandle, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import CorePreview from './CorePreview';
import {
  setErrorHandler,
  setHandleShareFile,
  setInitData,
  setHandleRefreshToken,
  getValue,
  setHandleOnChane,
} from './Store';
import CoreEditor from './CoreEditor';
import { ClasorEditorProps, IRefClasorEditor } from './Interface';
import { IsJsonString } from './Helper/Utils';
import { extractHeaders, removeExtraElements } from './CoreEditor/Func';
import { useEditorType } from './Hook';

export const ClasorEditor = (
  props: ClasorEditorProps,
  ref: Ref<IRefClasorEditor>
) => {
  const [loading, setLoading] = useState(true);
  const {
    handleError,
    handleShareFile,
    handleRefreshToken,
    onChange,
    podSpaceServer,
    mode,
    content,
    outline,
    token,
    userGroupHash,
    inline,
    userInfo,
    frontendServer,
  } = props;

  const { changeType } = useEditorType();
  changeType(!!inline);

  useImperativeHandle(ref, () => ({
    getData: getData,
  }));

  const getData = () => {
    const editorContent = getValue('content') as string;
    let content = removeExtraElements(editorContent);
    const contentOutline = extractHeaders(content);

    return {
      content: content,
      outline: JSON.stringify({
        root: contentOutline,
      }),
    };
  };

  if (!podSpaceServer) {
    throw new Error('podSpaceServer is required ! ');
  }

  useEffect(() => {
    if (handleShareFile) {
      setHandleShareFile(
        handleShareFile as (
          fileHash: string,
          userGroupHash: string
        ) => Promise<boolean>
      );
    }

    if (handleRefreshToken) {
      setHandleRefreshToken(handleRefreshToken as () => Promise<string>);
    }

    if (handleError) {
      setErrorHandler(handleError);
    }

    if (onChange) {
      setHandleOnChane(onChange);
    }

    let contentOutline = '[]';
    if (!outline || !IsJsonString(outline)) {
      contentOutline = JSON.stringify({
        root: extractHeaders(content),
      });
    } else {
      contentOutline = outline;
    }
    setInitData({
      podSpaceServer,
      content,
      outline: contentOutline,
      token,
      userGroupHash,
      userInfo: userInfo && JSON.stringify(userInfo),
      frontendServer,
    });
    setLoading(false);
  }, [content]);

  return (
    <>
      {loading ? (
        <div>....</div>
      ) : (
        <ErrorBoundary>
          {mode === 'PREVIEW' ? <CorePreview /> : <CoreEditor />}
        </ErrorBoundary>
      )}
      <div className="clasor-portal"></div>
    </>
  );
};

export default React.forwardRef(ClasorEditor);
