import React, { useRef } from 'react';
import { ClasorModal } from '../Modal';

interface IProps {
  close: () => void;
}
const WrapperDialog = (props: IProps) => {
  const { close } = props;
  const classRef = useRef<HTMLInputElement>(null);

  const confirm = () => {
    const customCodeSnippetDialog = document.getElementsByClassName(
      'clasor-wrapper-dialog'
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
    close();
  };

  const handleConfirm = () => {
    const value = classRef.current?.value;
    const element = document.getElementsByClassName('clasor-wrapper-input')[0];
    if (element) {
      const inputElement = element.getElementsByTagName('input')[0];
      if (inputElement && value) {
        inputElement.value = 'clasor-wrapper-input ' + value;
      }
    }
    confirm();
  };
  return (
    <ClasorModal
      title="کلاس های مورد نظر خود را وارد کنید"
      open={true}
      onClose={close}
      size="MEDIUM"
    >
      <>
        <div style={{ width: '100%', margin: '15px 0' }}>
          <label
            style={{
              paddingTop: '5px',
              width: '100%',
              display: 'inline-block',
            }}
          >
            در صورت نیاز کلاس های مد نظر خود را وارد کنید.
          </label>
          <label
            style={{
              marginLeft: '15px',
              paddingTop: '5px',
            }}
          >
            <b>( به صورت پیش فرض clasor-wrapper اضافه خواهد شد)</b>
          </label>
          <input
            ref={classRef}
            placeholder="کلاس های مورد نظر را وارد کنید."
            className="clasor-input"
            style={{
              marginTop: '15px',
              width: '100%',
            }}
          />
        </div>
        <div style={{ width: '100%', padding: '25px 0px', textAlign: 'left' }}>
          <button className="clasor-btn cancel" onClick={close}>
            انصراف
          </button>
          <button onClick={handleConfirm} className="clasor-btn">
            تایید و ذخیره
          </button>
        </div>
      </>
    </ClasorModal>
  );
};

export default WrapperDialog;
