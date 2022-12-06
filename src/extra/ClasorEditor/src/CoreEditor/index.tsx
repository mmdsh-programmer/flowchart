import React, {
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { getValue } from '../Store';
import {
  checkForCustomAttachedFiles,
  handleSelectFileDialog,
  handlePublicUrl,
  addButtonsToFlowChartTags,
  checkForCodeSnippet,
  addButtonsToExtraDocTags,
} from './Func';

import { EDialogType, IFile, IHashDialog, IImageProps } from '../Interface';
import { CheckForMdFile, useEditorType } from '../Hook';
import TreeEditor, { IRefTreeEditor } from './TreeEditor';
import CopyTextDialog from './CopyTextDialog';
import FileManagementDialog from './FileManagementDialog';
import FlowChartDialog from './FlowChartDialog';
import MdFileDialog from './MdFileDialog';
import CodeSnippetDialog from './CodeSnippetDialog';
import ExternalDocument from './ExternalDocument';
import ImportExportDialog from './ImportExportDialog';
import EditorWrapper from './EditorWrapper';
import WrapperDialog from './WrapperDialog';

let autoSaveTimeout: number;
let changeTimeout: number;
let checkTimeout: number;

export interface IRefCoreEditor {
  mainChecks: () => void;
}

const CoreEditor = (_props: any, ref: Ref<IRefCoreEditor>) => {
  const treeRef = useRef<IRefTreeEditor>(null);

  useImperativeHandle(ref, () => ({
    mainChecks: mainChecks,
  }));

  const [openFileDialog, setOpenFileDialog] = useState<EDialogType | null>(
    null
  );
  const [openImportExportDialog, setOpenClasorImportExportDialog] = useState<
    boolean | null
  >(null);

  const [flowchart, setFlowchart] = useState<IHashDialog>({
    dialog: false,
    codeHash: null,
  });

  const [codeSnippet, setCodeSnippet] = useState<IHashDialog>({
    dialog: false,
    codeHash: null,
  });

  const [wrapper, setWrapper] = useState<boolean>(false);

  const [mdfileDialog, setMdfileDialog] = useState<IHashDialog>({
    dialog: false,
    codeHash: null,
  });

  const [external, setExternal] = useState<IHashDialog>({
    dialog: false,
    codeHash: null,
  });

  const handleChange = () => {
    clearTimeout(changeTimeout);
    changeTimeout = window.setTimeout(() => {
      mainChecks();
      if (treeRef.current) {
        treeRef.current.generate();
      }
    }, 1000);
  };

  const mainChecks = () => {
    clearTimeout(checkTimeout);
    checkTimeout = window.setTimeout(() => {
      checkForCustomAttachedFiles();
      checkForCodeSnippet(
        (hash: string) => {
          setCodeSnippet({
            dialog: true,
            codeHash: hash,
          });
        },
        () => handleChange()
      );
      addButtonsToFlowChartTags(
        (hash: string) => {
          setFlowchart({
            dialog: true,
            codeHash: hash,
          });
        },
        () => handleChange()
      );
      CheckForMdFile();
      addButtonsToExtraDocTags(
        (hash: string) => {
          setExternal({
            dialog: true,
            codeHash: hash,
          });
        },
        () => handleChange()
      );
    }, 500);
  };

  const handleSelect = (file: IFile, properties?: IImageProps) => {
    if (openFileDialog && openFileDialog !== 'TEXT') {
      handleSelectFileDialog(file, openFileDialog, properties);
    }
  };

  const handleCloseDialog = () => {
    const cancelBtn = document.getElementsByClassName(
      'cke_dialog_ui_button_cancel'
    ) as HTMLCollectionOf<HTMLButtonElement>;
    if (!cancelBtn || !cancelBtn[0]) {
      setOpenFileDialog(null);
      return;
    }

    for (const element of Array.from(cancelBtn)) {
      element.click();
    }
  };

  useEffect(() => {
    mainChecks();
    return () => {
      clearTimeout(changeTimeout);
      clearTimeout(autoSaveTimeout);
    };
  }, []);

  const { getType } = useEditorType();
  const type = getType();
  const initContent = getValue('content') as string;
  return (
    <div className="clasor-editor-wrapper">
      <div className="clasor-outline">
        <label className="outline-label">نمای کلی</label>
        <TreeEditor ref={treeRef} />
      </div>
      <div className="clasor-editor">
        <EditorWrapper
          type={type}
          initContent={initContent}
          setMdfileDialog={setMdfileDialog}
          setFlowchart={setFlowchart}
          setWrapper={setWrapper}
          setCodeSnippet={setCodeSnippet}
          setExternal={setExternal}
          setOpenFileDialog={setOpenFileDialog}
          setOpenClasorImportExportDialog={setOpenClasorImportExportDialog}
          handleChange={handleChange}
        />
      </div>
      {codeSnippet?.dialog ? (
        <CodeSnippetDialog
          codeHash={codeSnippet.codeHash}
          close={() => {
            handleChange();
            handleCloseDialog();
            setCodeSnippet({
              dialog: false,
              codeHash: null,
            });
            mainChecks();
          }}
        />
      ) : null}

      {mdfileDialog?.dialog ? (
        <MdFileDialog
          close={() => {
            handleChange();
            handleCloseDialog();
            setMdfileDialog({
              dialog: false,
              codeHash: null,
            });
            mainChecks();
          }}
        />
      ) : null}
      {openImportExportDialog ? (
        <ImportExportDialog
          handleClose={handleCloseDialog}
          editorContent={getValue('content') as string}
        />
      ) : null}

      {flowchart?.dialog ? (
        <FlowChartDialog
          codeHash={flowchart.codeHash}
          close={() => {
            handleChange();
            handleCloseDialog();
            setFlowchart({
              dialog: false,
              codeHash: null,
            });
            mainChecks();
          }}
        />
      ) : null}

      {external?.dialog ? (
        <ExternalDocument
          codeHash={external.codeHash}
          close={() => {
            handleChange();
            handleCloseDialog();
            setExternal({
              dialog: false,
              codeHash: null,
            });
            mainChecks();
          }}
        />
      ) : null}

      {openFileDialog ? (
        openFileDialog === EDialogType.TEXT ? (
          <CopyTextDialog handleClose={handleCloseDialog} />
        ) : (
          <FileManagementDialog
            handleClose={handleCloseDialog}
            handleSelect={handleSelect}
            handlePublicUrl={handlePublicUrl}
          />
        )
      ) : null}

      {wrapper ? (
        <WrapperDialog
          close={() => {
            handleCloseDialog();
            setWrapper(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default React.forwardRef(CoreEditor);
