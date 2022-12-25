/* eslint-disable import/no-relative-packages */
import React, { ChangeEvent, useEffect, useState } from "react";
import { EFlowType } from "../../extra/ClasorEditor/src/Enum";
import FlowChart from "../../extra/ClasorEditor/src/CoreEditor/FlowChart/FlowChart";
import { MindMap } from "../../extra/ClasorEditor/src/CoreEditor/FlowChart/MindMap";
import { Swimlane } from "../../extra/ClasorEditor/src/CoreEditor/FlowChart/Swimlane";
import { IframeAction, IframeMode } from "../../interface/enum";
import RenderIf from "../../extra/renderIf";

interface IProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "PREVIEW" | "EDIT";
  setMode: React.Dispatch<React.SetStateAction<"PREVIEW" | "EDIT">>;
}

let defaultType = EFlowType.BASIC;

const FlowchartComponent = ({ setLoading, mode, setMode, loading }: IProps) => {
  let flowchartRef: FlowChart | Swimlane | MindMap | null = null;
  const [flowChartType, setFlowChartType] = useState<EFlowType>(defaultType);

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

  const iframeActions = async (event: MessageEvent) => {
    const { action, key, value, mode: parentMode } = event.data;

    console.log("message from parent recieved:", action);

    switch (action) {
      case IframeMode.PREVIEW:
      case IframeMode.TEMPORARY_PREVIEW:
        setMode("PREVIEW");
        break;
      case IframeMode.EDIT:
        setMode("EDIT");
        break;
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
          setTimeout(() => {
            setMode(parentMode === "edit" ? "EDIT" : "PREVIEW");
          });
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
          {mode === "EDIT" && (
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
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
        }}
      >
        <div className="flowchart-content">
          <RenderIf isTrue={flowChartType === EFlowType.BASIC}>
            <FlowChart mode={mode} ref={setFlowChartData} />
          </RenderIf>
          <RenderIf isTrue={flowChartType === EFlowType.SWIMLANE}>
            <Swimlane mode={mode} ref={setFlowChartData} />
          </RenderIf>
          <RenderIf isTrue={flowChartType === EFlowType.MINDMAP}>
            <MindMap mode={mode} ref={setFlowChartData} />
          </RenderIf>
        </div>
      </div>
    </>
  );
};

const Flowchart = () => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"PREVIEW" | "EDIT">("EDIT");
  if (loading) {
    return null;
  }
  return (
    <FlowchartComponent
      loading={loading}
      setLoading={setLoading}
      mode={mode}
      setMode={setMode}
    />
  );
};

export default Flowchart;
