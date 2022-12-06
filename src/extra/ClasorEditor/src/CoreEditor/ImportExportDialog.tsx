import React, { useEffect, useRef, useState } from 'react';
import { ClasorModal } from '../Modal';
import { readFileContent } from '../Helper/Utils';
import { toast } from 'react-toastify';
import { ClasorExtension } from '../Enum';
import Download from './Download';

declare interface IProps {
  editorContent: string;
  handleClose: () => void;
}

let timeout: number;
const ImportExportDialog = (props: IProps) => {
  const { handleClose, editorContent } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [clsFile, setClsFile] = useState<File | null>(null);
  const [tab, setTab] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension && fileExtension !== ClasorExtension.CONTENT) {
        toast.error(
          `نوع فایل بارگذاری شده باید از نوع محتویات کلاسور با پسوند ${ClasorExtension.CONTENT} باشد`
        );
      } else {
        setClsFile(file);
      }
    }
  };

  const confirmCkeditorDialog = () => {
    const dialog = document.getElementsByClassName(
      'clasor-import-export-content-dialog'
    );
    if (!dialog || !dialog[0]) {
      return;
    }

    const confirmBtn = dialog[0].getElementsByClassName(
      'cke_dialog_ui_button_ok'
    ) as HTMLCollectionOf<HTMLButtonElement>;
    if (!confirmBtn || !confirmBtn[0]) {
      return;
    }
    if (Array.from(confirmBtn)[0]) {
      Array.from(confirmBtn)[0].click();
    }
  };

  const handleClickOnUploadInput = () => {
    inputRef.current?.click();
  };

  const updateEditorContent = (file: File | null) => {
    if (!file) {
      return;
    }
    readFileContent(file)
      .then((content) => {
        if (content && typeof content === 'string') {
          window.sessionStorage.setItem('ckeditor-import-content', content);
          confirmCkeditorDialog();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('خطا در خواندن فایل');
      });
  };

  const handleToggleTab = () => {
    setTab(!tab);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ClasorModal
      title="بارگذاری/ دانلود محتویات ویرایشگر"
      open={true}
      onClose={handleClose}
      size="MEDIUM"
    >
      <>
        <div className="clasor-tab-wrapper">
          <button
            className={`clasor-tab ${tab ? 'active' : null}`}
            onClick={handleToggleTab}
          >
            دانلود
          </button>
          <button
            className={`clasor-tab ${!tab ? 'active' : null}`}
            onClick={handleToggleTab}
          >
            بارگذاری
          </button>
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
            background: 'whitesmoke',
            padding: '25px',
            marginBottom: '15px',
            minHeight: '200px',
          }}
        >
          {tab ? (
            <div>
              {editorContent ? (
                <>
                  <label
                    style={{ marginBottom: '15px', display: 'inline-block' }}
                  >
                    دانلود محتوای ادیتور
                  </label>
                  <Download
                    fileContent={editorContent}
                    fileDetails={{
                      name: 'Clasor-Content',
                      extension: ClasorExtension.CONTENT,
                      type: 'text/html',
                    }}
                  >
                    <span>دانلود</span>
                  </Download>
                </>
              ) : (
                <p>محتوایی برای دانلود وجود ندارد.</p>
              )}
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  cursor: 'pointer',
                  flexDirection: 'column',
                }}
              >
                <label
                  style={{
                    marginBottom: '15px',
                    display: 'inline-block',
                    width: '100%',
                  }}
                >
                  فایل مورد نظر خود را انتخاب کنید ( .clasor )
                </label>
                <input
                  placeholder="..."
                  value={clsFile?.name || ''}
                  className="none-border-right file-input clasor-input"
                  style={{
                    flex: 1,
                    minHeight: '45px',
                    padding: '0 10px 0 10px',
                    cursor: 'pointer',
                  }}
                  onClick={handleClickOnUploadInput}
                />
                <input
                  key="input"
                  type="file"
                  hidden
                  ref={inputRef}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  accept={ClasorExtension.CONTENT}
                />
              </div>
              <button
                key="input"
                className="clasor-btn"
                style={{ width: '100%', margin: '20px 0px 0px 0px' }}
                disabled={!clsFile}
                onClick={() => updateEditorContent(clsFile)}
              >
                تایید
              </button>
            </>
          )}
        </div>
      </>
    </ClasorModal>
  );
};

export default ImportExportDialog;
