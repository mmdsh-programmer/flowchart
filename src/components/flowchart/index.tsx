/* eslint-disable import/no-relative-packages */
import React, { ChangeEvent, useEffect, useState } from "react";
import { EFlowType } from "../../extra/ClasorEditor/src/Enum";
import FlowChart from "../../extra/ClasorEditor/src/CoreEditor/FlowChart/FlowChart";
import { MindMap } from "../../extra/ClasorEditor/src/CoreEditor/FlowChart/MindMap";
import { Swimlane } from "../../extra/ClasorEditor/src/CoreEditor/FlowChart/Swimlane";
import { IframeAction } from "../../interface/enum";

interface IProps{
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

let defaultType = EFlowType.BASIC;

const FlowchartComponent = ({ setLoading }: IProps) => {
  let flowchartRef: FlowChart | Swimlane | MindMap | null = null;
  const [flowChartType, setFlowChartType] = useState<EFlowType>(
    defaultType,
  );

  const setFlowChartData = (flowRef: FlowChart | Swimlane | MindMap | null) => {
    if (!flowRef) {
      return;
    }
    flowchartRef = flowRef;
  };

  const handleFlowTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const flowType = event.target.value as EFlowType;
    setFlowChartType(flowType);
    defaultType = flowType;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10);
  };

  const flowComponent = () => {
    switch (flowChartType) {
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
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
        }}
      >
        <div className="flowchart-content">{flowComponent()}</div>
      </div>
    </>
  );
};

const Flowchart = () => {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return null;
  }
  return <FlowchartComponent setLoading={setLoading} />;
};

export default Flowchart;
