import React, { useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import FileManagementDialog from './FileManagementDialog';
import { IFile } from '../Interface';
import { fileTypeIs } from '../Helper/Utils';
import { downloadFileAndConvertBufferTo } from './Func';
import { getValue } from '../Store';

declare interface IProps {
  handleClose: () => void;
}

let timeout: number;
const CopyTextDialog = (props: IProps) => {
  const podspaceServer = getValue('podSpaceServer');
  const { handleClose } = props;
  const copyRef = useRef<HTMLButtonElement>(null);
  const [textFileContent, setTextFileContent] = useState('');

  const handleSelectFile = async (file: IFile) => {
    if (fileTypeIs(file.extension) !== 'TEXT') {
      toast.error('فایل انتخاب شده از نوع فایل های (متنی) نمی باشد!');
      return;
    }
    const text = await downloadFileAndConvertBufferTo(
      `${podspaceServer}files/${
        file.hash
      }?checkUserGroupAccess=true&Authorization=${window.localStorage.getItem(
        'CLASOR:ACCESS_TOKEN'
      )}&time=${+new Date()}`,
      'utf8'
    );

    setTextFileContent(text || '');
    timeout = window.setTimeout(() => {
      const copyButton = copyRef.current;
      if (copyButton) {
        copyButton.click();
        toast.success(
          'محتویات فایل متنی کپی شد. می توانید با زدن دکمه های CTRL+SHIFT+V متن را در ادیتور بچسبانید. '
        );
      }
      handleClose();
    });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <FileManagementDialog
        handleClose={handleClose}
        handleSelect={handleSelectFile}
      />
      <CopyToClipboard text={textFileContent}>
        <button ref={copyRef} style={{ display: 'none' }}>
          کپی محتوای فایل
        </button>
      </CopyToClipboard>
    </>
  );
};

export default CopyTextDialog;
