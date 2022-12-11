/* eslint-disable import/no-relative-packages */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { EFlowType } from "../../extra/ClasorEditor/src/Enum";
import FlowChart from "../../extra/ClasorEditor/src/CoreEditor/FlowChart/FlowChart";
import { MindMap } from "../../extra/ClasorEditor/src/CoreEditor/FlowChart/MindMap";
import { Swimlane } from "../../extra/ClasorEditor/src/CoreEditor/FlowChart/Swimlane";
import { getEditor } from "../../extra/ClasorEditor/src/CoreEditor/Func";
import { IframeAction } from "../../interface/enum";

const Flowchart = () => {
  const codeHash = "test";
  let flowchartRef: FlowChart | Swimlane | MindMap | null = null;
  const [flowChartType, setFlowChartType] = useState<EFlowType>(
    EFlowType.BASIC,
  );
  const setTypeRef = useRef<boolean>(false);

  const setFlowChartData = (flowRef: FlowChart | Swimlane | MindMap | null) => {
    if (!flowRef) {
      return;
    }
    flowchartRef = flowRef;
    const editor = getEditor();

    if (!editor) {
      return;
    }
    const parentNode = editor.querySelectorAll(
      `.clasor-flowchart-${codeHash}`,
    );
    if (!parentNode || !parentNode[0]) {
      return;
    }
    const parentElement = parentNode[0];
    const data = (parentElement as HTMLElement).dataset.flow;
    if (!data || !flowRef) {
      return;
    }
    flowRef.setData(data);
    debugger;
  };

  const handleFlowTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const flowType = event.target.value as EFlowType;
    setFlowChartType(flowType);
  };

  const getFlowChartType = () => {
    const editor = getEditor();

    if (!editor) {
      return;
    }
    // eslint-disable-next-line unicorn/prefer-query-selector
    const parentNode = editor.getElementsByClassName(
      `clasor-flowchart-${codeHash}`,
    );
    if (!parentNode || !parentNode[0]) {
      return;
    }
    const parentElement = parentNode[0];
    const flowType = (parentElement as HTMLElement).dataset.type;
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
      default:
        break;
    }
  };

  const iframeActions = async (event: MessageEvent) => {
    const { action, key, value } = event.data;

    console.log("message from parent recieved:", action);

    switch (action) {
      case IframeAction.SAVE:
      case IframeAction.FREE_DRAFT:
        event.source!.postMessage(
          {
            action,
            key,
            value: flowchartRef?.getData(),
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          "*",
        );
        localStorage.setItem(key, flowchartRef?.getData() as string);
        break;
      case IframeAction.LOAD:
        if (value) {
          flowchartRef?.setData(value);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("message", iframeActions, false);

    return () => {
      window.removeEventListener("message", iframeActions);
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          margin: "10px 0px",
          flexWrap: "wrap",
          maxWidth: "600px",
        }}
      >
        {/* <div
          style={{
            flex: 1,
            marginLeft: "5px",
          }}
        >
          <input
            ref={nameRef}
            placeholder="نام فلوچارت"
            className="clasor-input"
            style={{
              width: "100%",
            }}
          />
        </div> */}
        {codeHash && (
        <div
          style={{
            flex: 1,
            marginLeft: "5px",
          }}
        >
          <select
            className="clasor-select-input"
            name="flowType"
            id="flow-type-select"
            value={flowChartType}
            onChange={handleFlowTypeChange}
            style={{
              width: "200px",
              height: "33px",
              padding: "0 5px",
              cursor: "pointer",
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
          display: "flex",
          flexDirection: "column",
          flex: "1",
        }}
      >
        <div className="flowchart-content">{flowComponent()}</div>
        {/* <div
          style={{
            padding: "25px 0 10px 0",
            textAlign: "left",
          }}
        >
          <button className="clasor-btn cancel" onClick={close}>
            انصراف
          </button>
          <button className="clasor-btn" onClick={confirmDialog}>
            تایید و ذخیره
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Flowchart;
