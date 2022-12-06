import {
  ConnectorModel,
  NodeModel,
  HeaderModel,
  LaneModel,
  randomId,
  ShapeStyleModel,
  DiagramComponent,
  SwimLaneModel,
  cloneObject,
  Node,
  DiagramBeforeMenuOpenEventArgs,
  PortVisibility,
  PortConstraints,
  ContextMenuSettingsModel,
  IDragEnterEventArgs,
  PaletteModel,
} from '@syncfusion/ej2-react-diagrams';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';

export const getSwimlaneNodeDefault = (node: NodeModel): NodeModel => {
  // if (node.style) {
  //   node.style.strokeColor = '#717171';
  // }
  return node;
};

export const getSwimlaneConnectorDefaults = (
  connector: ConnectorModel
): ConnectorModel => {
  if (connector) {
    if (connector.id && connector.id.indexOf('swimlaneLink21') !== -1) {
      connector.type = 'Straight';
    } else if (connector.id && connector.id.indexOf('swimlaneLink22') !== -1) {
      connector.type = 'Straight';
    } else {
      connector.type = 'Orthogonal';
    }
  }
  return connector;
};

export const SWIMLANE_SAMPLE_CSS = `.sb-mobile-palette {
  width: 195px;
            height: 559px;
            float: left;
}
 #palette-space {
  border: 1px solid rgba(0, 0, 0, 0.12);
}`;

export const swimLaneShapes: (NodeModel | ConnectorModel)[] = [
  {
    id: 'stackCanvas1',
    addInfo: { tooltip: 'Horizontal swimlane' },
    shape: {
      type: 'SwimLane',
      lanes: [
        {
          id: 'lane1',
          style: { strokeColor: '#757575' },
          height: 60,
          width: 150,
          header: {
            width: 50,
            height: 50,
            style: { strokeColor: '#757575', fontSize: 11 },
          },
        },
      ],
      orientation: 'Horizontal',
      isLane: true,
    },
    height: 60,
    width: 140,
    offsetX: 70,
    offsetY: 30,
  },
  {
    id: 'stackCanvas2',
    addInfo: { tooltip: 'Vertical swimlane' },
    shape: {
      type: 'SwimLane',
      lanes: [
        {
          id: 'lane1',
          style: { strokeColor: '#757575' },
          height: 150,
          width: 60,
          header: {
            width: 50,
            height: 50,
            style: { strokeColor: '#757575', fontSize: 11 },
          },
        },
      ],
      orientation: 'Vertical',
      isLane: true,
    },
    height: 140,
    width: 60,
    // style: { fill: '#f5f5f5' },
    offsetX: 70,
    offsetY: 30,
  },
  {
    id: 'verticalPhase',
    addInfo: { tooltip: 'Vertical phase' },
    shape: {
      type: 'SwimLane',
      phases: [
        {
          style: {
            strokeWidth: 1,
            strokeDashArray: '3,3',
            strokeColor: '#757575',
          },
        },
      ],
      annotations: [{ text: '' }],
      orientation: 'Vertical',
      isPhase: true,
    },
    height: 60,
    width: 140,
    style: { strokeColor: '#757575' },
  },
  {
    id: 'horizontalPhase',
    addInfo: { tooltip: 'Horizontal phase' },
    shape: {
      type: 'SwimLane',
      phases: [
        {
          style: {
            strokeWidth: 1,
            strokeDashArray: '3,3',
            strokeColor: '#757575',
          },
        },
      ],
      annotations: [{ text: '' }],
      orientation: 'Horizontal',
      isPhase: true,
    },
    height: 60,
    width: 140,
    style: { strokeColor: '#757575' },
  },
];

//Initialize the palettes for the symbol palatte
export const swimlanePalettes: PaletteModel[] = [
  {
    id: 'swimlaneFlow',
    expanded: true,
    title: 'فرآیند',
    symbols: [
      {
        id: 'STerminator',
        addInfo: { tooltip: 'Terminator' },
        width: 50,
        height: 60,
        shape: { type: 'Flow', shape: 'Terminator' },
        style: { strokeWidth: 1, strokeColor: '#757575' },
        ports: [
          {
            offset: { x: 0, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 0 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 1, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 1 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
        ],
      },
      {
        id: 'swimlaneProcess',
        addInfo: { tooltip: 'Process' },
        width: 50,
        height: 60,
        shape: { type: 'Flow', shape: 'Process' },
        style: { strokeWidth: 1, strokeColor: '#757575' },
        ports: [
          {
            offset: { x: 0, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 0 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 1, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 1 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
        ],
      },
      {
        id: 'swimlaneDecision',
        addInfo: { tooltip: 'Decision' },
        width: 50,
        height: 50,
        shape: { type: 'Flow', shape: 'Decision' },
        style: { strokeWidth: 1, strokeColor: '#757575' },
        ports: [
          {
            offset: { x: 0, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 0 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 1, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 1 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
        ],
      },
      {
        id: 'swimlaneDocument',
        addInfo: { tooltip: 'Document' },
        width: 50,
        height: 50,
        shape: { type: 'Flow', shape: 'Document' },
        style: { strokeWidth: 1, strokeColor: '#757575' },
        ports: [
          {
            offset: { x: 0, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 0 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 1, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 1 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
        ],
      },
      {
        id: 'swimlanePreDefinedProcess',
        addInfo: { tooltip: 'Predefined process' },
        width: 50,
        height: 50,
        shape: { type: 'Flow', shape: 'PreDefinedProcess' },
        ports: [
          {
            offset: { x: 0, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 0 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 1, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 1 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
        ],
        style: { strokeWidth: 1, strokeColor: '#757575' },
      },
      {
        id: 'data',
        width: 50,
        height: 50,
        addInfo: { tooltip: 'Data' },
        shape: { type: 'Flow', shape: 'Data' },
        ports: [
          {
            offset: { x: 0, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 0 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 1, y: 0.5 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
          {
            offset: { x: 0.5, y: 1 },
            visibility: PortVisibility.Connect | PortVisibility.Hover,
            constraints: PortConstraints.Draw,
          },
        ],
        style: { strokeWidth: 1, strokeColor: '#757575' },
      },
    ],
  },
  {
    id: 'swimlaneShapes',
    expanded: true,
    title: ' اشکال Swimlane',
    symbols: swimLaneShapes,
  },
  {
    id: 'swimlaneConnectors',
    expanded: true,
    symbols: [
      {
        id: 'swimlaneLink1',
        type: 'Orthogonal',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: {
          shape: 'Arrow',
          style: { strokeColor: '#757575', fill: '#757575' },
        },
        style: { strokeWidth: 1, strokeColor: '#757575' },
      },
      {
        id: 'swimlaneLink2',
        type: 'Orthogonal',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: {
          shape: 'Arrow',
          style: { strokeColor: '#757575', fill: '#757575' },
        },
        style: {
          strokeWidth: 1,
          strokeDashArray: '4 4',
          strokeColor: '#757575',
        },
      },
      {
        id: 'swimlaneLink21',
        type: 'Straight',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: {
          shape: 'Arrow',
          style: { strokeColor: '#757575', fill: '#757575' },
        },
        style: { strokeWidth: 1, strokeColor: '#757575' },
      },
      {
        id: 'swimlaneLink22',
        type: 'Straight',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: {
          shape: 'Arrow',
          style: { strokeColor: '#757575', fill: '#757575' },
        },
        style: {
          strokeWidth: 1,
          strokeDashArray: '4 4',
          strokeColor: '#757575',
        },
      },
    ],
    title: 'اتصال دهنده',
  },
];

export const swimlaneContextMenuClick = (
  args: MenuEventArgs | undefined,
  diagram: DiagramComponent | null
) => {
  if (args && diagram) {
    if (
      args.item.id === 'InsertLaneBefore' ||
      args.item.id === 'InsertLaneAfter'
    ) {
      if (
        diagram.selectedItems &&
        diagram.selectedItems.nodes &&
        diagram.selectedItems.nodes.length > 0 &&
        (diagram.selectedItems.nodes[0] as Node).isLane
      ) {
        let index: number;
        let node: Node = diagram.selectedItems.nodes[0] as Node;
        let swimlane: NodeModel = diagram.getObject(
          (diagram.selectedItems.nodes[0] as Node).parentId
        );
        let shape: SwimLaneModel = swimlane.shape as SwimLaneModel;
        if (shape && shape.lanes) {
          let existingLane: LaneModel = cloneObject(shape?.lanes[0]);
          let newLane: LaneModel = {
            id: randomId(),
            header: {
              width: existingLane?.header?.width,
              height: existingLane?.header?.height,
              style: existingLane?.header?.style as ShapeStyleModel,
            } as HeaderModel,
            style: existingLane.style as ShapeStyleModel,
            height: existingLane.height,
            width: existingLane.width,
          } as LaneModel;
          if (newLane && newLane.header) {
            if (shape.orientation === 'Horizontal') {
              let exclude = 0;
              exclude += shape.header ? 1 : 0;
              exclude += shape?.phases?.length ? 1 : 0;
              index = node.rowIndex - exclude;
              newLane.header.width = existingLane?.header?.width;
              newLane.header.height = existingLane.height;
            } else {
              index =
                node.columnIndex -
                (shape && shape.phases ? shape.phases.length : 0)
                  ? 1
                  : 0;
              newLane.header.width = existingLane?.width;
              newLane.header.height = existingLane?.header?.height;
            }
            if (args.item.id === 'InsertLaneBefore') {
              diagram.addLanes(swimlane, [newLane], index);
            } else {
              diagram.addLanes(swimlane, [newLane], index + 1);
            }
          }
        }
        diagram.clearSelection();
      }
    } else if (args.item.id === 'Cut') {
      diagram.cut();
    } else if (args.item.id === 'Copy') {
      diagram.copy();
      diagram.paste();
    } else if (args.item.id === 'Paste') {
      diagram.paste();
    }
  }
};

export const swimlaneContextMenuItems = [
  {
    text: 'Copy',
    id: 'Copy',
    target: '.e-diagramcontent',
    iconCss: 'e-menu-icon e-icons e-copy',
  },
  {
    text: 'Cut',
    id: 'Cut',
    target: '.e-diagramcontent',
    iconCss: 'e-menu-icon e-icons e-cut',
  },
  {
    text: 'Paste',
    id: 'Paste',
    target: '.e-diagramcontent',
    iconCss: 'e-menu-icon e-icons e-paste',
  },
  {
    text: 'InsertLaneBefore',
    id: 'InsertLaneBefore',
    target: '.e-diagramcontent',
  },
  {
    text: 'InsertLaneAfter',
    id: 'InsertLaneAfter',
    target: '.e-diagramcontent',
  },
];

export const swimlaneContextMenu: ContextMenuSettingsModel = {
  show: true,
  items: swimlaneContextMenuItems,
  showCustomMenuOnly: true,
};

export const swimlaneContextMenuOpen = (
  args: DiagramBeforeMenuOpenEventArgs | undefined,
  diagramInstance: DiagramComponent | null
): void => {
  let diagram = diagramInstance;
  if (args) {
    for (let item of args.items) {
      if (
        diagram &&
        diagram.selectedItems &&
        diagram.selectedItems.connectors &&
        diagram.selectedItems.nodes &&
        item.text
      ) {
        if (
          diagram.selectedItems.connectors.length +
            diagram.selectedItems.nodes.length >
          0
        ) {
          if (item.id === 'InsertLaneBefore' || item.id === 'InsertLaneAfter') {
            if (
              diagram.selectedItems.connectors.length ||
              (diagram.selectedItems.nodes.length &&
                !(diagram.selectedItems.nodes[0] as Node).isLane)
            ) {
              args.hiddenItems.push(item.text);
            }
          }
        } else {
          args.hiddenItems.push(item.text);
        }
      }
    }
  }
};

export const swimlaneDragEnter = (
  args: IDragEnterEventArgs | undefined
): void => {
  if (args) {
    let obj: NodeModel = args.element as NodeModel;
    let shape: SwimLaneModel = obj.shape as SwimLaneModel;
    if (shape.isLane && shape.lanes) {
      if (shape.orientation === 'Horizontal') {
        shape.lanes[0].height = 100;
        shape.lanes[0].width = 500;
      } else if (shape.orientation === 'Vertical') {
        shape.lanes[0].height = 500;
        shape.lanes[0].width = 100;
      }
    }
  }
};
