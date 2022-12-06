import React, { ChangeEvent, useEffect, useState } from 'react';
import { ClasorModal } from '../Modal';
import { getEditor } from './Func';

interface IProps {
  close: () => void;
  codeHash: string | null;
}
const ExternalDocument = (props: IProps) => {
  const { close, codeHash } = props;
  const [error, setError] = useState<'HASH' | 'TITLE' | null>(null);

  const [hash, setHash] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const check = () => {
    if (!hash || hash.trim() === '') {
      setError('HASH');
      return;
    }

    if (!title || title.trim() === '') {
      setError('TITLE');
      return;
    }

    setError(null);
  };

  const confirm = () => {
    check();
    window.sessionStorage.setItem('ckeditor-external-hash', hash);
    window.sessionStorage.setItem('ckeditor-external-title', title);

    const dialog = document.getElementsByClassName(
      'clasor-external-document-dialog'
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
    close();
  };

  const update = () => {
    check();
    const editor = getEditor();

    if (!editor) {
      return;
    }

    const parentNode = editor.getElementsByClassName(
      `clasor-external-document-${codeHash}`
    );
    if (!parentNode || !parentNode[0]) {
      return;
    }

    const element = parentNode[0];
    element.innerHTML = `سند داخلی : (${title})`;
    element.setAttribute('data-title', title);
    element.setAttribute('data-public-hash', hash);

    close();
  };

  const getInitialData = (codeHash: string) => {
    const editor = getEditor();

    if (!editor) {
      return;
    }

    const parentNode = editor.getElementsByClassName(
      `clasor-external-document-${codeHash}`
    );
    if (!parentNode || !parentNode[0]) {
      return;
    }
    const parentElement = parentNode[0];
    let hash = parentElement.getAttribute('data-public-hash');
    let title = parentElement.getAttribute('data-title');
    if (!hash || !title) {
      return;
    }

    setHash(hash);
    setTitle(title);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleHash = (event: ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value);
  };

  useEffect(() => {
    if (codeHash) {
      getInitialData(codeHash);
    }
  }, []);

  return (
    <ClasorModal
      title="افزودن سند داخلی"
      open={true}
      onClose={close}
      size="MEDIUM"
    >
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '15px',
          }}
        >
          <label
            style={{ width: '100%', marginBottom: '5px', fontWeight: 'bold' }}
          >
            هش مربوط به نسخه را وارد کنید:
          </label>
          <input className="clasor-input" value={hash} onChange={handleHash} />
          <small
            style={{
              color: '#ff5a4e',
              textAlign: 'right',
              margin: 0,
              paddingTop: '10px',
              minHeight: '30px',
            }}
          >
            {error === 'HASH' ? 'هش مربوط به نسخه را وارد کنید.' : ''}
          </small>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '15px',
          }}
        >
          <label
            style={{ width: '100%', marginBottom: '5px', fontWeight: 'bold' }}
          >
            عنوان :
          </label>
          <input
            className="clasor-input"
            onChange={handleTitle}
            value={title}
          />
          <small
            style={{
              color: '#ff5a4e',
              textAlign: 'right',
              margin: 0,
              paddingTop: '10px',
              minHeight: '30px',
            }}
          >
            {error === 'TITLE'
              ? 'لطفا عنوان مربوط به سند داخلی را وارد کنید.'
              : ''}
          </small>
        </div>
        <div
          style={{
            padding: '25px 0 10px 0',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button className="clasor-btn cancel" onClick={close}>
            انصراف
          </button>
          <button className="clasor-btn" onClick={codeHash ? update : confirm}>
            تایید و ذخیره
          </button>
        </div>
      </>
    </ClasorModal>
  );
};

export default ExternalDocument;
