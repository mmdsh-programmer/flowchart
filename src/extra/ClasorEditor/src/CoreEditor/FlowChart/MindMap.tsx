import React from 'react';
import {
  MindMap as MindMapModule,
  HierarchicalTree,
  ToolBase,
  MouseEventArgs,
  SelectorConstraints,
  SnapConstraints,
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  Node,
  Connector,
  Diagram,
  DiagramTools,
  Inject,
  DataBinding,
  OverviewComponent,
  CommandHandler,
} from '@syncfusion/ej2-react-diagrams';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { IProps, SampleBase } from './Common/SampleBase';
import { v4 as uuidv4 } from 'uuid';
import {
  addConnector,
  addNode,
  EmployeeInfo,
  getMindmapConnectorDefaults,
  getMindmapNodeDefaults,
  mindmapHandle,
  mindmapSelectionChange,
  textEdit,
} from './Config/mindmapConfig';

const items: DataManager = new DataManager(
  [{ id: 1, Label: 'اصلی', fill: 'red', branch: 'Root' }],
  new Query().take(1)
);

const mindmapId = 'mindmap' + uuidv4();
export class MindMap extends SampleBase {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedItem: {
        id: null,
        type: null,
        fillColor: '#FFFFFF',
        fontColor: '#000000',
        strokeColor: '#000000',
        strokeWidth: 1,
        fontSize: 12,
      },
      loading: false,
    };
  }
  rendereComplete() {
    if (this.diagramInstance) {
      this.diagramInstance.fitToPage();
    }
  }

  getTool = (action: string): ToolBase | null => {
    let tool: ToolBase | null;
    tool = null;
    if (this.diagramInstance) {
      if (action === 'leftHandle') {
        tool = new LeftExtendTool(
          this.diagramInstance.commandHandler,
          this.diagramInstance
        );
      } else if (action === 'rightHandle') {
        tool = new RightExtendTool(
          this.diagramInstance.commandHandler,
          this.diagramInstance
        );
      } else if (action === 'delete') {
        tool = new DeleteClick(
          this.diagramInstance.commandHandler,
          this.diagramInstance
        );
      }
    }
    return tool;
  };

  render() {
    return (
      <div>
        <div className="control-pane">
          <div className="control-section">
            <div className="content-wrapper" style={{ width: '100%' }}>
              <div
                className={`diagram-wrapper ${
                  this.props.mode === 'PREVIEW' ? '' : 'edit-mode'
                }`}
              >
                <DiagramComponent
                  textEdit={(args) => {
                    const data = JSON.parse(this.getData() || '{}');
                    textEdit(args, this.diagramInstance, data);
                  }}
                  ref={(diagram) => {
                    this.diagramInstance = diagram;
                  }}
                  id={this.props.mode === 'PREVIEW' ? mindmapId : 'mindmap'}
                  style={{ width: '74%', height: '100px', float: 'left' }}
                  width={'100%'}
                  height={'100%'}
                  tool={
                    this.props.mode === 'PREVIEW'
                      ? DiagramTools.ZoomPan
                      : DiagramTools.SingleSelect
                  }
                  snapSettings={{ constraints: SnapConstraints.None }}
                  // tool={DiagramTools.SingleSelect}
                  layout={{
                    type: 'MindMap',
                    getBranch: (node: NodeModel) => {
                      return ((node as Node).data as EmployeeInfo).branch;
                    },
                    horizontalSpacing: 50,
                  }}
                  //Selectionchange event for Node and connector
                  selectionChange={mindmapSelectionChange}
                  selectedItems={{
                    constraints: SelectorConstraints.UserHandle,
                    userHandles: mindmapHandle,
                  }}
                  dataSourceSettings={{
                    id: 'id',
                    parentId: 'parentId',
                    dataSource: items,
                    root: String(1),
                  }}
                  //sets node default value
                  getNodeDefaults={getMindmapNodeDefaults}
                  //sets connector default value
                  getConnectorDefaults={getMindmapConnectorDefaults}
                  getCustomTool={this.getTool}
                >
                  <Inject
                    services={[DataBinding, MindMapModule, HierarchicalTree]}
                  />
                </DiagramComponent>

                <input
                  id="mindmapPalette"
                  style={{ visibility: 'hidden', position: 'absolute' }}
                  type="color"
                  name="favcolor"
                  value="#000000"
                />
              </div>
            </div>
          </div>
        </div>
        {this.props.overviewPanel && this.props.mode === 'PREVIEW' && (
          <div className="col-lg-4 overviewPanel">
            <OverviewComponent
              id={'mindmap-overview' + uuidv4}
              style={{ top: '30px' }}
              sourceID={mindmapId}
              width={'100%'}
              height={'150px'}
            />
          </div>
        )}
      </div>
    );
  }
}
//Tool for Userhandles.

class CustomToolBase extends ToolBase {
  diagramInstance: Diagram | null = null;
  constructor(coomand: CommandHandler, diagramInstance: Diagram) {
    super(coomand);
    this.diagramInstance = diagramInstance;
  }
}

class LeftExtendTool extends CustomToolBase {
  public mouseDown(args: MouseEventArgs): void {
    super.mouseDown(args);
    this.inAction = true;
  }
  public mouseUp(): void {
    if (this.inAction && this.diagramInstance) {
      const selectedObject: any = this.commandHandler.getSelectedObject();
      if (selectedObject[0]) {
        if (selectedObject[0] instanceof Node) {
          const node: NodeModel = addNode();
          if ((selectedObject[0].data as EmployeeInfo).branch === 'Root') {
            (node.data as EmployeeInfo).branch = 'Right';
          } else if (
            (selectedObject[0].data as EmployeeInfo).branch === 'Right' ||
            (selectedObject[0].data as EmployeeInfo).branch === 'subRight'
          ) {
            (node.data as EmployeeInfo).branch = 'subRight';
          }
          let connector: ConnectorModel = addConnector(selectedObject[0], node);
          this.diagramInstance.clearSelection();
          const nd: Node = this.diagramInstance.add(node) as Node;
          this.diagramInstance.add(connector);
          this.diagramInstance.doLayout();
          this.diagramInstance.bringIntoView(nd.wrapper.bounds);
          this.diagramInstance.startTextEdit(nd);
        }
      }
    }
  }
}

class RightExtendTool extends CustomToolBase {
  //mouseDown event
  public mouseDown(args: MouseEventArgs): void {
    super.mouseDown(args);
    this.inAction = true;
  }
  //mouseDown event
  public mouseUp(): void {
    if (this.inAction && this.diagramInstance) {
      const selectedObject: any = this.commandHandler.getSelectedObject();
      if (selectedObject[0]) {
        if (selectedObject[0] instanceof Node) {
          const node: NodeModel = addNode();
          if ((selectedObject[0].data as EmployeeInfo).branch === 'Root') {
            (node.data as EmployeeInfo).branch = 'Left';
          } else if (
            (selectedObject[0].data as EmployeeInfo).branch === 'Left' ||
            (selectedObject[0].data as EmployeeInfo).branch === 'subLeft'
          ) {
            (node.data as EmployeeInfo).branch = 'subLeft';
          }
          let connector: ConnectorModel = addConnector(selectedObject[0], node);
          this.diagramInstance.clearSelection();
          const nd: Node = this.diagramInstance.add(node) as Node;
          this.diagramInstance.add(connector);
          this.diagramInstance.doLayout();
          this.diagramInstance.bringIntoView(nd.wrapper.bounds);
          this.diagramInstance.startTextEdit(nd);
        }
      }
    }
  }
}

class DeleteClick extends CustomToolBase {
  //mouseDown event
  public mouseDown(args: MouseEventArgs): void {
    super.mouseDown(args);
    this.inAction = true;
  }
  //mouseup event
  public mouseUp(): void {
    if (this.inAction && this.diagramInstance) {
      const selectedObject: any = this.commandHandler.getSelectedObject();
      if (selectedObject[0]) {
        if (selectedObject[0] instanceof Node) {
          const node: Node = selectedObject[0] as Node;
          this.removeSubChild(node);
        }
        this.diagramInstance.doLayout();
      }
    }
  }
  //Remove the subchild Elements
  private removeSubChild(node: Node): void {
    if (this.diagramInstance) {
      for (let i: number = node.outEdges.length - 1; i >= 0; i--) {
        const connector: Connector = this.diagramInstance.getObject(
          node.outEdges[i]
        ) as Connector;
        const childNode: Node = this.diagramInstance.getObject(
          connector.targetID
        ) as Node;
        if (childNode.outEdges.length > 0) {
          this.removeSubChild(childNode);
        } else {
          this.diagramInstance.remove(childNode);
        }
      }
      this.diagramInstance.remove(node);
    }
  }
}
