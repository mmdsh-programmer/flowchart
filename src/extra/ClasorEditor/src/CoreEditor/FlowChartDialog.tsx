import React from 'react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { EFlowType } from '../Enum';
import { ClasorModal } from '../Modal';
import { getEditorInstance } from '../Store';
import FlowChart from './FlowChart/FlowChart';
import { MindMap } from './FlowChart/MindMap';
import { Swimlane } from './FlowChart/Swimlane';
import { getEditor } from './Func';

declare interface IProps {
  close: () => void;
  codeHash: string | null;
}

const FlowChartDialog = (props: IProps) => {
  const { close, codeHash } = props;
  let flowchartRef: FlowChart | Swimlane | MindMap | null = null;
  const nameRef = useRef<HTMLInputElement>(null);
  const [flowChartType, setFlowChartType] = useState<EFlowType>(
    EFlowType.BASIC
  );
  const setTypeRef = useRef<boolean>(false);

  const confirmDialog = async () => {
    const nameInput = nameRef.current;
    if (!nameInput || !nameInput.value) {
      toast.error('نام فلوچارت انتخاب نشده است.');
      return;
    }
    if (flowchartRef) {
      const data = (flowchartRef as FlowChart).getData();
      if (!data) {
        toast.error('تغییری وجود ندارد.');
        return;
      }
      const JsonData = JSON.parse(data);
      if (
        JsonData.connectors &&
        JsonData.connectors.length === 0 &&
        JsonData.nodes &&
        JsonData.nodes.length === 0
      ) {
        toast.error('تغییری وجود ندارد.');
        return;
      }
      if (codeHash) {
        // to update a exist flowchart
        onUpdate(
          codeHash,
          nameInput.value,
          JSON.stringify({
            nodes: JsonData.nodes,
            connectors: JsonData.connectors,
          })
        );
      } else {
        sessionStorage.setItem('ckeditor-flowchart-name', nameInput.value);
        sessionStorage.setItem('ckeditor-flowchart-type', flowChartType);
        sessionStorage.setItem(
          'ckeditor-flowchart',
          JSON.stringify({
            nodes: JsonData.nodes,
            connectors: JsonData.connectors,
          })
        );
        confirm();
      }
    }
  };

  const confirm = () => {
    const flowchartDialog = document.getElementsByClassName(
      'clasor-flowchart-dialog'
    );
    if (!flowchartDialog || !flowchartDialog[0]) {
      return;
    }
    const confirmBtn = flowchartDialog[0].getElementsByClassName(
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

  const onUpdate = (codeHash: string, name: string, flowchartdata: string) => {
    const editor = getEditor();

    if (!editor) {
      return;
    }

    const parentNode = editor.getElementsByClassName(
      `clasor-flowchart-${codeHash}`
    );
    if (!parentNode || !parentNode[0]) {
      return;
    }

    const element = parentNode[0];

    const parentInnerHTML = parentNode[0].innerHTML;
    const startIndex = parentInnerHTML.indexOf('<ins class="ice-ins');
    element.innerHTML = `فلوچارت : ${name}`;
    if (startIndex !== -1) {
      const endIndex = parentInnerHTML.indexOf('>', startIndex);
      if (endIndex !== -1) {
        const insTag = parentInnerHTML.substring(startIndex, endIndex + 1);
        element.innerHTML = `${insTag}${element.innerHTML}</ins>`;
      }
    }
    element.setAttribute('data-content', name);
    element.setAttribute('data-flow', flowchartdata);
    element.setAttribute('data-hash', codeHash);

    const editorInstance = getEditorInstance();
    const endOfLine = '<p className="new-line"></p>';
    editorInstance?.insertElement(endOfLine);

    close();
  };

  const setFlowChartData = (flowRef: FlowChart | Swimlane | MindMap | null) => {
    if (!flowRef) {
      return;
    }
    flowchartRef = flowRef;
    const editor = getEditor();

    if (!editor) {
      return;
    }
    const parentNode = editor.getElementsByClassName(
      `clasor-flowchart-${codeHash}`
    );
    if (!parentNode || !parentNode[0]) {
      return;
    }
    const parentElement = parentNode[0];
    const data = parentElement.getAttribute('data-flow');
    if (!data || !flowRef) {
      return;
    }
    const nameInput = nameRef.current;
    if (nameInput) {
      const name = parentElement.getAttribute('data-content');
      nameInput.value = name || '';
    }
    flowRef.setData(data);
  };

  const handleFlowTypeChange = (event: any) => {
    const flowType = event.target.value as EFlowType;
    setFlowChartType(flowType);
  };

  const getFlowChartType = () => {
    const editor = getEditor();

    if (!editor) {
      return;
    }
    const parentNode = editor.getElementsByClassName(
      `clasor-flowchart-${codeHash}`
    );
    if (!parentNode || !parentNode[0]) {
      return;
    }
    const parentElement = parentNode[0];
    const flowType = parentElement.getAttribute('data-type');
    if (!flowType) {
      return;
    }
    return flowType as EFlowType;
  };

  const flowComponent = () => {
    let type = flowChartType;
    if (!setTypeRef.current && codeHash) {
      setTypeRef.current = true;
      type = getFlowChartType() || EFlowType.BASIC;
    }
    switch (type) {
      case EFlowType.BASIC:
        return <FlowChart mode="EDIT" ref={setFlowChartData} />;
      case EFlowType.SWIMLANE:
        return <Swimlane mode="EDIT" ref={setFlowChartData} />;
      case EFlowType.MINDMAP:
        return <MindMap mode="EDIT" ref={setFlowChartData} />;
    }
  };

  return (
    <ClasorModal title="مدیریت دیاگرام" open={true} onClose={close}>
      <>
        <div
          style={{
            display: 'flex',
            width: '100%',
            margin: '10px 0px',
            flexWrap: 'wrap',
            maxWidth: '600px',
          }}
        >
          <div
            style={{
              flex: 1,
              marginLeft: '5px',
            }}
          >
            <input
              ref={nameRef}
              placeholder="نام فلوچارت"
              className="clasor-input"
              style={{
                width: '100%',
              }}
            />
          </div>
          {!!!codeHash && (
            <div
              style={{
                flex: 1,
                marginLeft: '5px',
              }}
            >
              <select
                className="clasor-select-input"
                name="flowType"
                id="flow-type-select"
                value={flowChartType}
                onChange={handleFlowTypeChange}
                style={{
                  width: '100%',
                  height: '33px',
                  padding: '0 5px',
                  cursor: 'pointer',
                }}
              >
                <option value={EFlowType.BASIC}>Basic</option>
                <option value={EFlowType.SWIMLANE}>Swimlane</option>
                <option value={EFlowType.MINDMAP}>Mindmap</option>
              </select>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
          }}
        >
          <div className="flowchart-content">{flowComponent()}</div>
          <div
            style={{
              padding: '25px 0 10px 0',
              textAlign: 'left',
            }}
          >
            <button className="clasor-btn cancel" onClick={close}>
              انصراف
            </button>
            <button className="clasor-btn" onClick={confirmDialog}>
              تایید و ذخیره
            </button>
          </div>
        </div>
      </>
    </ClasorModal>
  );
};

export default FlowChartDialog;
