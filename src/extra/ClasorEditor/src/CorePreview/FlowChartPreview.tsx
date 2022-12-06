import React from 'react';
import { DiagramComponent } from '@syncfusion/ej2-react-diagrams';
import { enableRipple } from '@syncfusion/ej2-base';
import { IsJsonString } from '../Helper/Utils';
import { Swimlane } from '../CoreEditor/FlowChart/Swimlane';
import FlowChart from '../CoreEditor/FlowChart/FlowChart';
import { MindMap } from '../CoreEditor/FlowChart/MindMap';
import { EFlowType } from '../Enum';

enableRipple(true);
interface IProps {
  data: string;
  type: EFlowType;
  uId: string;
}

interface IState {
  overviewPanel: boolean;
  fullscreen: boolean;
}

export class SampleBase extends React.PureComponent<IProps, IState> {
  rendereComplete() {
    /**custom render complete function */
  }
  componentDidMount() {
    setTimeout(() => {
      this.rendereComplete();
    });
  }
}

export default class FlowChartPreview extends SampleBase {
  diagramInstance: DiagramComponent | null = null;
  flowRef = React.createRef();
  constructor(props: IProps) {
    super(props);
    this.state = {
      overviewPanel: false,
      fullscreen: false,
    };
  }
  rendereComplete() {
    this.diagramInstance?.fitToPage();
  }
  render() {
    if (!IsJsonString(this.props.data)) {
      return (
        <div className="clasor-error">
          اطلاعات مربوط به فلوچارت صحیح نمی باشد
        </div>
      );
    }

    const setFlowChartData = (
      flowRef: FlowChart | Swimlane | MindMap | null
    ) => {
      if (!flowRef) {
        return;
      }
      flowRef.setData(this.props.data);
    };
    return (
      <div
        className={`clasor-flowchart-preview  ${
          this.state.fullscreen ? 'full-screen' : ''
        }`}
      >
        <div className="options">
          <button
            onClick={() => {
              this.setState({ overviewPanel: !this.state.overviewPanel });
            }}
            className="clasor-btn cancel"
          >
            {this.state.overviewPanel ? 'حذف نمای کلی' : 'نمای کلی'}
          </button>
          <button
            onClick={() => {
              this.setState({ fullscreen: !this.state.fullscreen });
            }}
            className="clasor-btn cancel"
          >
            {this.state.fullscreen ? 'نمایش در محتوا' : 'نمایش تمام صفحه'}
          </button>
        </div>
        {this.props.type === EFlowType.BASIC ? (
          <FlowChart
            overviewPanel={this.state.overviewPanel}
            mode="PREVIEW"
            ref={setFlowChartData}
          />
        ) : this.props.type === EFlowType.SWIMLANE ? (
          <Swimlane
            overviewPanel={this.state.overviewPanel}
            mode="PREVIEW"
            ref={setFlowChartData}
          />
        ) : this.props.type === EFlowType.MINDMAP ? (
          <MindMap
            overviewPanel={this.state.overviewPanel}
            mode="PREVIEW"
            ref={setFlowChartData}
          />
        ) : null}
      </div>
    );
  }
}
