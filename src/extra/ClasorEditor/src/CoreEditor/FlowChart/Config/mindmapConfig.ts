import {
  ConnectorConstraints,
  ConnectorModel,
  Diagram,
  DiagramComponent,
  HorizontalAlignment,
  ISelectionChangeEventArgs,
  ITextEditEventArgs,
  MarginModel,
  Node,
  NodeConstraints,
  NodeModel,
  PointPort,
  PointPortModel,
  PortVisibility,
  randomId,
  Side,
  TextModel,
  UserHandleModel,
  VerticalAlignment,
} from '@syncfusion/ej2-react-diagrams';

export const getMindmapNodeDefaults = (obj: Node) => {
  obj.constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
  if (
    (obj.data as EmployeeInfo).branch === 'Left' ||
    (obj.data as EmployeeInfo).branch === 'Right' ||
    (obj.data as EmployeeInfo).branch === 'Root'
  ) {
    obj.shape = { type: 'Basic', shape: 'Ellipse' };
    obj.borderColor = 'black'; /* tslint:disable:no-string-literal */
    obj.style = {
      fill:
        (obj.data as EmployeeInfo).branch === 'Root' ? '#E74C3C' : '#F39C12',
      strokeColor: 'none',
      strokeWidth: 2,
    };
    obj.annotations = [
      {
        content: (obj.data as EmployeeInfo).Label,
        margin: { left: 10, right: 10, top: 10, bottom: 10 },
        style: { color: 'white' },
      },
    ];
    const port: PointPortModel[] = getPort();
    for (let i: number = 0; i < port.length; i++) {
      obj.ports.push(new PointPort(obj, 'ports', port[i], true));
    }
  } else {
    let color: string; /* tslint:disable:no-string-literal */
    if (
      (obj.data as EmployeeInfo).branch === 'Right' ||
      (obj.data as EmployeeInfo).branch === 'subRight'
    ) {
      color = '#8E44AD';
    } else {
      color = '#3498DB';
    }
    obj.shape = { type: 'Basic', shape: 'Rectangle' };
    obj.style = { fill: color, strokeWidth: 0 };
    obj.minWidth = 100;
    obj.height = 4;
    const port: PointPortModel[] = getPort();
    for (let i: number = 0; i < port.length; i++) {
      obj.ports.push(new PointPort(obj, 'ports', port[i], true));
    }
    obj.annotations = [
      {
        content: (obj.data as EmployeeInfo).Label,
        offset: { x: 0.5, y: 0 },
        verticalAlignment: 'Bottom',
      },
    ];
    (obj.shape as TextModel).margin = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
  }
  return obj;
};

export const getMindmapConnectorDefaults = (
  connector: ConnectorModel,
  diagram: Diagram
) => {
  connector.type = 'Bezier';
  connector.targetDecorator = { shape: 'None' };
  const sourceNode: Node = diagram.getObject(connector.sourceID || '') as Node;
  const targetNode: Node = diagram.getObject(connector.targetID || '') as Node;
  if (
    (targetNode.data as EmployeeInfo).branch === 'Right' ||
    (targetNode.data as EmployeeInfo).branch === 'subRight'
  ) {
    connector.sourcePortID = sourceNode.ports[0].id;
    connector.targetPortID = targetNode.ports[1].id;
    connector.style = {
      strokeWidth: 5,
      strokeColor: '#8E44AD',
    };
  } else if (
    (targetNode.data as EmployeeInfo).branch === 'Left' ||
    (targetNode.data as EmployeeInfo).branch === 'subLeft'
  ) {
    connector.sourcePortID = sourceNode.ports[1].id;
    connector.targetPortID = targetNode.ports[0].id;
    connector.style = {
      strokeWidth: 5,
      strokeColor: '#3498DB',
    };
  }
  if (connector.constraints) {
    connector.constraints &= ~ConnectorConstraints.Select;
  }
  return connector;
};

//hide the require userhandle.
function hideUserHandle(
  name: string,
  mindMapDiagramInstance: DiagramComponent
): void {
  if (
    mindMapDiagramInstance &&
    mindMapDiagramInstance.selectedItems &&
    mindMapDiagramInstance.selectedItems.userHandles
  ) {
    for (const handle of mindMapDiagramInstance.selectedItems.userHandles) {
      if (handle.name === name) {
        handle.visible = false;
      }
    }
  }
}

//set the value for UserHandle element.
function applyHandle( //it is in dedicated line here.
  handle: UserHandleModel,
  side: Side,
  offset: number,
  margin: MarginModel,
  halignment: HorizontalAlignment,
  valignment: VerticalAlignment
): void {
  handle.side = side;
  handle.offset = offset;
  handle.margin = margin;
  handle.horizontalAlignment = halignment;
  handle.verticalAlignment = valignment;
}

//Change the Position of the UserHandle.
function changeUserHandlePosition(
  change: string,
  mindMapDiagramInstance: DiagramComponent
): void {
  if (
    mindMapDiagramInstance &&
    mindMapDiagramInstance.selectedItems &&
    mindMapDiagramInstance.selectedItems.userHandles
  ) {
    for (const handle of mindMapDiagramInstance.selectedItems.userHandles) {
      if (handle.name === 'delete' && change === 'leftHandle') {
        applyHandle(
          handle,
          'Left',
          1,
          { top: 0, bottom: 0, left: 0, right: 10 },
          'Left',
          'Top'
        );
      } else if (handle.name === 'delete' && change === 'rightHandle') {
        applyHandle(
          handle,
          'Right',
          1,
          { top: 0, bottom: 0, left: 10, right: 0 },
          'Right',
          'Top'
        );
      }
    }
  }
}

export const textEdit = (
  args: ITextEditEventArgs | undefined,
  mindMapDiagramInstance: Diagram | null,
  data: any
) => {
  if (args && args.newValue) {
    const node = args.element as Node;
    data.nodes = data.nodes.map((dnode: any) => {
      if (dnode.id === node.id) {
        (dnode.data as EmployeeInfo).Label = args?.newValue;
      }
      return dnode;
    });
    window.setTimeout(() => {
      mindMapDiagramInstance?.loadDiagram(JSON.stringify(data));
    }, 200);
  }
};

export const mindmapSelectionChange = (
  arg: ISelectionChangeEventArgs | undefined,
  mindMapDiagramInstance: DiagramComponent
) => {
  if (arg && arg.state === 'Changing') {
    if (
      arg.newValue[0] instanceof Node &&
      mindMapDiagramInstance &&
      mindMapDiagramInstance.selectedItems &&
      mindMapDiagramInstance.selectedItems.userHandles
    ) {
      for (const handle of mindMapDiagramInstance.selectedItems.userHandles) {
        handle.visible = true;
      }
      if (
        ((arg.newValue[0] as Node).data as EmployeeInfo).branch === 'Left' ||
        ((arg.newValue[0] as Node).data as EmployeeInfo).branch === 'subLeft'
      ) {
        hideUserHandle('leftHandle', mindMapDiagramInstance);
        changeUserHandlePosition('leftHandle', mindMapDiagramInstance);
      } else if (
        ((arg.newValue[0] as Node).data as EmployeeInfo).branch === 'Right' ||
        ((arg.newValue[0] as Node).data as EmployeeInfo).branch === 'subRight'
      ) {
        hideUserHandle('rightHandle', mindMapDiagramInstance);
        changeUserHandlePosition('rightHandle', mindMapDiagramInstance);
      } else if (
        ((arg.newValue[0] as Node).data as EmployeeInfo).branch === 'Root'
      ) {
        hideUserHandle('delete', mindMapDiagramInstance);
      }
    } else {
      hideUserHandle('leftHandle', mindMapDiagramInstance);
      hideUserHandle('rightHandle', mindMapDiagramInstance);
      hideUserHandle('delete', mindMapDiagramInstance);
    }
  }
};

export interface EmployeeInfo {
  branch: string;
  color: string;
  Left: string;
  Right: string;
  Root: string;
  Label: string;
}
//creation of the Ports
function getPort(): PointPortModel[] {
  const port: PointPortModel[] = [
    {
      id: 'port1',
      offset: { x: 0, y: 0.5 },
      visibility: PortVisibility.Hidden,
      style: { fill: 'black' },
    },
    {
      id: 'port2',
      offset: { x: 1, y: 0.5 },
      visibility: PortVisibility.Hidden,
      style: { fill: 'black' },
    },
  ];
  return port;
}

export function addNode(): NodeModel {
  const obj: NodeModel = {};
  obj.id = randomId();
  obj.data = {};
  (obj.data as EmployeeInfo).Label = 'گره';
  return obj;
}

export function addConnector(
  source: NodeModel,
  target: NodeModel
): ConnectorModel {
  const connector: ConnectorModel = {};
  connector.id = randomId();
  connector.sourceID = source.id;
  connector.targetID = target.id;
  return connector;
}

const leftarrow: string =
  'M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z';
const rightarrow: string =
  'M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z';
const deleteicon: string =
  'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76' +
  '96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04' +
  '91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z';

const leftuserhandle: UserHandleModel = setUserHandle(
  //it is in dedicated line here.
  'leftHandle',
  leftarrow,
  'Left',
  1,
  { top: 0, bottom: 0, left: 0, right: 10 },
  'Left',
  'Top'
);
const rightuserhandle: UserHandleModel = setUserHandle(
  //it is in dedicated line here.
  'rightHandle',
  rightarrow,
  'Right',
  1,
  { top: 0, bottom: 0, left: 10, right: 0 },
  'Right',
  'Top'
);
const deleteuserhandle: UserHandleModel = setUserHandle(
  //it is in dedicated line here.
  'delete',
  deleteicon,
  'Top',
  0.5,
  { top: 0, bottom: 10, left: 0, right: 0 },
  'Center',
  'Center'
);
export const mindmapHandle: UserHandleModel[] = [
  leftuserhandle,
  rightuserhandle,
  deleteuserhandle,
];
//set and creation of the Userhandle.
function setUserHandle( //it is in dedicated line here.
  name: string,
  pathData: string,
  side: Side,
  offset: number,
  margin: MarginModel,
  halignment: HorizontalAlignment,
  valignment: VerticalAlignment
): UserHandleModel {
  const userhandle: UserHandleModel = {
    name: name,
    pathData: pathData,
    backgroundColor: 'black',
    pathColor: 'white',
    side: side,
    offset: offset,
    margin: margin,
    horizontalAlignment: halignment,
    verticalAlignment: valignment,
  };
  return userhandle;
}
