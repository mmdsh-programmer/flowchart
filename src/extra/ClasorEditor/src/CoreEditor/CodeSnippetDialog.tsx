import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IsJsonString } from '../Helper/Utils';
import { ClasorModal } from '../Modal';
import { getEditor } from './Func';
import { getEditorInstance } from './../Store';

const lanObj = {
  apache: 'Apache',
  bash: 'Bash',
  coffeescript: 'CoffeeScript',
  cpp: 'C++',
  cs: 'C#',
  css: 'CSS',
  diff: 'Diff',
  html: 'HTML',
  http: 'HTTP',
  ini: 'INI',
  java: 'Java',
  javascript: 'JavaScript',
  json: 'JSON',
  makefile: 'Makefile',
  markdown: 'Markdown',
  nginx: 'Nginx',
  objectivec: 'Objective-C',
  perl: 'Perl',
  php: 'PHP',
  python: 'Python',
  ruby: 'Ruby',
  sql: 'SQL',
  vbscript: 'VBScript',
  xhtml: 'XHTML',
  xml: 'XML',
};

declare interface IProps {
  codeHash: string | null;
  close: () => void;
}

const expression =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi;
const urlRegex = new RegExp(expression);

let timeout: number;
const CodeSnippetDialog = (props: IProps) => {
  const { close } = props;

  const [link, setLink] = useState<string>('');

  const [languages, setLanguages] = useState([
    {
      title: 'javascript',
      code: '',
    },
  ]);
  const [tabIndex, setTabIndex] = useState(0);

  const confirmDialog = () => {
    confirm();
    close();
  };

  const confirm = () => {
    if (languages.find((lang) => lang.code.trim() === '')) {
      return;
    }
    const customCodeSnippetDialog = document.getElementsByClassName(
      'clasor-code-snippets'
    );
    if (!customCodeSnippetDialog || !customCodeSnippetDialog[0]) {
      return;
    }
    const confirmBtn = customCodeSnippetDialog[0].getElementsByClassName(
      'cke_dialog_ui_button_ok'
    ) as HTMLCollectionOf<HTMLButtonElement>;
    if (!confirmBtn || !confirmBtn[0]) {
      return;
    }
    if (confirmBtn && confirmBtn[0]) {
      confirmBtn[0].click();
    }
  };

  const onUpdate = (
    codeHash: string,
    codeText: string,
    languageString: string
  ) => {
    if (languages.find((lang) => lang.code.trim() === '')) {
      return;
    }

    const editor = getEditor();

    if (!editor) {
      return;
    }

    const parentNode = editor.getElementsByClassName(`clasor-code-${codeHash}`);
    if (!parentNode || !parentNode[0]) {
      return;
    }

    const element = parentNode[0];
    const parentInnerHTML = parentNode[0].innerHTML;

    element.setAttribute('data-code', languageString);
    element.setAttribute('data-content', codeText);
    element.setAttribute('data-clasor-hash', codeHash);
    if (link) {
      element.setAttribute('data-link', link);
    }

    element.innerHTML = codeText;
    const startIndex = parentInnerHTML.indexOf('<ins class="ice-ins');
    if (startIndex !== -1) {
      const endIndex = parentInnerHTML.indexOf('>', startIndex);
      if (endIndex !== -1) {
        const insTag = parentInnerHTML.substring(startIndex, endIndex + 1);
        element.innerHTML = `${insTag}${codeText}</ins>`;
      }
    }

    const editorInstance = getEditorInstance();
    const endOfLine = '<p className="new-line"></p>';
    editorInstance?.insertElement(endOfLine);
    close();
  };

  const handleTabChange = (newValue: number) => {
    setTabIndex(newValue);
  };

  const handleAddNewLanguage = () => {
    if (languages.length < 10) {
      setLanguages([...languages, { title: 'javascript', code: '' }]);
      setTabIndex(languages.length);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    if (languages.length === 1) {
      return;
    }
    languages.splice(index, 1);
    setLanguages([...languages]);
    setTabIndex(index - 1 >= 0 ? index - 1 : 0);
  };

  const handleUserLanguageChange = (event: any) => {
    const lang = event.target.value;
    languages[tabIndex].title = lang;
    setLanguages([...languages]);
  };

  const handleCodeChage = (event: any) => {
    const value = event.target.value;
    languages[tabIndex].code = value;
    setLanguages([...languages]);
  };

  const getInitialData = (codeHash: string) => {
    const editor = getEditor();

    if (!editor) {
      return;
    }

    const parentNode = editor.getElementsByClassName(`clasor-code-${codeHash}`);
    if (!parentNode || !parentNode[0]) {
      return;
    }
    const parentElement = parentNode[0];
    let dataCode = parentElement.getAttribute('data-code');
    if (!dataCode || !IsJsonString(dataCode)) {
      return;
    }
    dataCode = dataCode.replace(/<-h/g, '<h');
    const languageData = JSON.parse(dataCode);
    setLanguages(languageData);

    const link = parentElement.getAttribute('data-link');
    if (link) {
      setLink(link);
    }
  };

  let codeText = '';
  languages.forEach((lang, index) => {
    codeText += lang.title + (languages[index + 1] ? '/' : '');
  });

  const handleLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  useEffect(() => {
    const editHash = props.codeHash;
    if (editHash) {
      getInitialData(editHash);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const linkError = link && !link.match(urlRegex);
  return (
    <ClasorModal title="اضافه کردن بلاک کد" open={true} onClose={close}>
      <>
        <div className="clasor-tab-wrapper">
          <button onClick={handleAddNewLanguage} className="clasor-btn cancel">
            افزودن زبان
          </button>
          {languages.map((lang, index) => (
            <button
              className={`clasor-tab ${index === tabIndex ? 'active' : ''}`}
              onClick={() => handleTabChange(index)}
              key={uuidv4()}
            >
              {lang.title}
            </button>
          ))}
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
            background: 'whitesmoke',
            padding: '25px',
            marginBottom: '15px',
          }}
        >
          {languages.length ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: '1',
                  justifyContent: 'flex-end',
                  marginBottom: '15px',
                }}
              >
                <select
                  value={languages[tabIndex] ? languages[tabIndex].title : ''}
                  onChange={handleUserLanguageChange}
                  className="clasor-select clasor-input"
                >
                  {Object.keys(lanObj).map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleRemoveLanguage(tabIndex)}
                  className="clasor-btn cancel"
                >
                  حذف زبان
                </button>
              </div>
              <textarea
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '15px',
                  textAlign: 'left',
                  direction: 'ltr',
                }}
                placeholder="code..."
                onChange={handleCodeChage}
                value={languages[tabIndex] ? languages[tabIndex].code : ''}
              />
            </div>
          ) : null}
          <p
            className="clasor-editor-codeSnippet"
            style={{ position: 'absolute', opacity: 0, zIndex: -100 }}
            data-content={JSON.stringify(languages)}
            data-action={props.codeHash ? 'EDIT' : 'ADD'}
          >
            {codeText}
          </p>
          <small
            style={{
              margin: '0 25px',
              color: '#ff5a4e',
              paddingBottom: '15px',
            }}
          >
            تا زمانی که برای زبانی که انتخاب کرده اید کدی وارد نکنید دکمه تایید
            فعال نخواهد شد
          </small>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: 'whitesmoke',
            marginRight: 'auto',
            padding: '15px',
            borderRadius: '2px',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <label style={{ marginLeft: '15px', paddingTop: '5px' }}>
              <b>لینک مربوطه :</b> ( این فیلد اجباری نیست. )
            </label>
            <input
              type="text"
              className="clasor-code-snippet-link clasor-input"
              onChange={handleLink}
              value={link}
              style={{
                textAlign: 'left',
                direction: 'ltr',
                maxWidth: '600px',
              }}
            />
          </div>
          <small
            style={{
              color: '#ff5a4e',
              textAlign: 'right',
              margin: 0,
              paddingTop: '10px',
              minHeight: '30px',
              paddingRight: '50px',
            }}
          >
            {linkError ? 'مسیر وارد شده صحیح نیست.' : ' '}
          </small>
        </div>
        <div
          style={{
            width: '100%',
            display: '100%',
            padding: '20px 0px 35px',
            textAlign: 'left',
          }}
        >
          <button className="clasor-btn cancel" onClick={close}>
            انصراف
          </button>
          <button
            className="clasor-btn"
            onClick={
              props.codeHash
                ? () =>
                    onUpdate(
                      props.codeHash || '',
                      codeText,
                      JSON.stringify(languages)
                    )
                : confirmDialog
            }
            disabled={
              !!(
                languages.length === 0 ||
                languages.find((lang) => lang.code.trim() === '') ||
                linkError
              )
            }
          >
            تایید و ذخیره
          </button>
        </div>
      </>
    </ClasorModal>
  );
};

export default CodeSnippetDialog;
