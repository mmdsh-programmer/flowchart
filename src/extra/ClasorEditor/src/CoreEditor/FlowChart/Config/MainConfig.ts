import {
  BpmnShape,
  Connector,
  ConnectorModel,
  ContextMenuSettingsModel,
  DiagramBeforeMenuOpenEventArgs,
  DiagramComponent,
  GridlinesModel,
  IDragEnterEventArgs,
  NodeModel,
  PaletteModel,
  PointPortModel,
} from '@syncfusion/ej2-react-diagrams';
import { EmitType } from '@syncfusion/ej2-base';
import { networkShapes } from './NetworkShapeConfig';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import {
  bpmnsContextMenuItems,
  bpmnsContextMenuOpen,
  bpmnShapeConextMenuClick,
  bpmnShapes,
} from './BpmnShapeConfig';
import { logicCircuitShapes } from './LogicCircuitConfig';
import { umlActivityShapes } from './UmlShapeConfig';

export const mainStyle = `
#tooltipDiagramSection .image-pattern-style {
  background-color: white;
  background-size: contain;
  background-repeat: no-repeat;
  height: 75px;
  width: calc((100% - 12px) / 3);
  cursor: pointer;
  border: 1px solid #D5D5D5;
  background-position: center;
  float: left;
}

#tooltipDiagramSection .image-pattern-style:hover {
  border-color: gray;
  border-width: 2px;
}

#tooltipDiagramSection .row {
  margin-left: 0px;
  margin-right: 0px;
}

#tooltipDiagramSection .row-header {
  font-size: 13px;
  font-weight: 500;
}

#tooltipDiagramSection .e-selected-style {
  border-color: #006CE6;
  border-width: 2px;
}

#tooltipDiagramSection .e-checkbox-wrapper .e-label {
  font-size: 12px;
}
.content-wrapper {
  border: 1px solid #D7D7D7;
}
#tooltipPropertySection .property-panel-header {
  margin-left: 10px;
}
`;
export const interval: number[] = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
  0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
];

export let arrow: string =
  'M 0 26.4576 L 26.4576 0 L 26.4576 0 L 26.4576 17.46239 L 26.4576 17.46239 L 113.3856 17.46239 L 113.3856 17.46239 L 113.3856 35.45279 L 113.3856 35.45279 L 26.4576 35.45279 L 26.4576 35.45279 L 26.4576 52.91519 L 26.4576 52.91519 L 0 26.4576 Z';

export const gridlines: GridlinesModel = {
  lineColor: '#e0e0e0',
  lineIntervals: interval,
};

let isMobile: boolean;
const openPalette = () => {
  const paletteSpace: HTMLElement | null =
    document.getElementById('palette-space');
  if (paletteSpace) {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
      if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
        paletteSpace.classList.add('sb-mobile-palette-open');
      } else {
        paletteSpace.classList.remove('sb-mobile-palette-open');
      }
    }
  }
};

export function addEvents(): void {
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    let paletteIcon: HTMLElement | null =
      document.getElementById('palette-icon');
    if (paletteIcon) {
      paletteIcon.addEventListener('click', openPalette, false);
    }
  }
}

export function getPorts(): PointPortModel[] {
  let ports: PointPortModel[] = [
    { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    { id: 'port3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
    { id: 'port4', shape: 'Circle', offset: { x: 0.5, y: 0 } },
  ];
  return ports;
}

//Initialize the flowshapes for the symbol palatte
export const flowshapes: NodeModel[] = [
  { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
  { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
  { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' } },
  { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
  {
    id: 'PreDefinedProcess',
    shape: { type: 'Flow', shape: 'PreDefinedProcess' },
  },
  { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
  { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
  { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } },
  { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
  { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' } },
  { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' } },
  { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' } },
  { id: 'Or', shape: { type: 'Flow', shape: 'Or' } },
  { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' } },
  { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' } },
  { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' } },
  { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' } },
  {
    id: 'OffPageReference',
    shape: { type: 'Flow', shape: 'OffPageReference' },
  },
  {
    id: 'SequentialAccessStorage',
    shape: { type: 'Flow', shape: 'SequentialAccessStorage' },
  },
  { id: 'Annotation', shape: { type: 'Flow', shape: 'Annotation' } },
  { id: 'Annotation2', shape: { type: 'Flow', shape: 'Annotation2' } },
  { id: 'Data', shape: { type: 'Flow', shape: 'Data' } },
  { id: 'Card', shape: { type: 'Flow', shape: 'Card' } },
  { id: 'Delay', shape: { type: 'Flow', shape: 'Delay' } },
];

export const basicShapes: NodeModel[] = [
  { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
  { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
  { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
  { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
  { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
  { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
  { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
  { id: 'Star', shape: { type: 'Basic', shape: 'Star' } },
];
//Initializes connector symbols for the symbol palette
export const connectorSymbols: ConnectorModel[] = [
  {
    id: 'Link1',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    style: { strokeWidth: 1, strokeColor: '#000000' },
  },
  {
    id: 'Link2',
    type: 'Orthogonal',
    sourcePoint: { x: -1, y: -1 },
    targetPoint: { x: 60, y: 60 },
    sourceDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    style: { strokeWidth: 1, strokeColor: '#000000' },
  },
  {
    id: 'Link3',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#000000' },
    targetDecorator: { shape: 'None' },
  },
  {
    id: 'CircuitLogicLink3',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    cornerRadius: 5,
    targetDecorator: { shape: 'None' },
    style: { strokeWidth: 1, strokeColor: '#000000' },
  },
  {
    id: 'Link23',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#000000' },
    targetDecorator: { shape: 'None' },
  },
  {
    id: 'Link21',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    style: { strokeWidth: 1, strokeColor: '#000000' },
  },
  {
    id: 'Link22',
    type: 'Straight',
    sourcePoint: { x: 1, y: 1 },
    targetPoint: { x: 60, y: 60 },
    sourceDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    style: { strokeWidth: 1, strokeColor: '#000000' },
  },
  {
    id: 'Link43',
    type: 'Bezier',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#000000' },
    targetDecorator: { shape: 'None' },
  },
  {
    id: 'DashedLink1',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    style: { strokeWidth: 1, strokeColor: '#000000', strokeDashArray: '5,5' },
  },
  {
    id: 'DashedLink2',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    sourceDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    style: { strokeWidth: 1, strokeColor: '#000000', strokeDashArray: '5,5' },
  },
  {
    id: 'DashedLink3',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#000000', strokeDashArray: '5,5' },
    targetDecorator: { shape: 'None' },
  },
  {
    id: 'CircuitLogicLink31',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    cornerRadius: 5,
    targetDecorator: { shape: 'None' },
    style: { strokeWidth: 1, strokeDashArray: '5,5', strokeColor: '#000000' },
  },
  {
    id: 'DashedLink11',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'None' },
    style: { strokeWidth: 1, strokeDashArray: '5,5', strokeColor: '#000000' },
  },
  {
    id: 'DashedLink21',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    style: { strokeWidth: 1, strokeColor: '#000000', strokeDashArray: '5,5' },
  },
  {
    id: 'DashedLink22',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    sourceDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#000000', fill: '#000000' },
    },
    style: { strokeWidth: 1, strokeColor: '#000000', strokeDashArray: '5,5' },
  },
  {
    id: 'DashedLink43',
    type: 'Bezier',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#000000', strokeDashArray: '5,5' },
    targetDecorator: { shape: 'None' },
  },
];

// Initializes the palettes to be displayed in the symbol palette.
export const palettes: PaletteModel[] = [
  {
    id: 'flow',
    expanded: false,
    symbols: flowshapes,
    iconCss: 'e-diagram-icons1 e-diagram-flow',
    title: 'فرآیند',
  },
  {
    id: 'basicShape',
    expanded: false,
    symbols: basicShapes,
    title: 'شکل هندسی',
    iconCss: 'e-diagram-icons1 e-diagram-basic',
  },
  {
    id: 'umlActivity',
    expanded: false,
    symbols: umlActivityShapes,
    title: 'اشکال UML',
    iconCss: 'e-diagram-icons1 e-diagram-basic',
  },
  {
    id: 'basicConnectors',
    expanded: false,
    symbols: connectorSymbols,
    iconCss: 'e-diagram-icons1 e-diagram-connector',
    title: 'اتصال دهنده',
  },
  // {
  //   id: 'Swimlane',
  //   expanded: false,
  //   symbols: swimLaneShapes,
  //   title: 'نماد  Swimlane',
  //   iconCss: 'e-diagram-icons1 e-diagram-basic',
  // },
  {
    id: 'Bpmn',
    expanded: false,
    symbols: bpmnShapes,
    title: 'نماد  BPMN',
    iconCss: 'e-diagram-icons1 e-diagram-basic',
  },
  {
    id: 'network',
    expanded: false,
    symbols: networkShapes,
    title: 'نماد  شبکه',
    iconCss: 'e-diagram-icons1 e-diagram-basic',
  },
  {
    id: 'logicCircuit',
    expanded: false,
    symbols: logicCircuitShapes,
    title: 'اشکال مدار منطقی',
    iconCss: 'e-diagram-icons1 e-diagram-basic',
  },
];

export const getNodeDefaults = () => {
  let obj: NodeModel = {};
  if (obj.width === undefined) {
    obj.width = 145;
  } else {
    let ratio: number = 100 / obj.width;
    obj.width = 100;
    if (obj.height) {
      obj.height *= ratio;
    }
  }
  obj.annotations = [{ style: { color: '#000000', fill: 'transparent' } }];
  //Set ports
  obj.ports = getPorts();

  return obj;
};

export const getSymbolNodeDefault = (symbol: NodeModel): void => {
  if (
    symbol.id === 'Terminator' ||
    symbol.id === 'Process' ||
    symbol.id === 'Delay'
  ) {
    symbol.width = 80;
    symbol.height = 40;
  } else if (
    symbol.id === 'Decision' ||
    symbol.id === 'Document' ||
    symbol.id === 'PreDefinedProcess' ||
    symbol.id === 'PaperTap' ||
    symbol.id === 'DirectData' ||
    symbol.id === 'MultiDocument' ||
    symbol.id === 'Data'
  ) {
    symbol.width = 50;
    symbol.height = 40;
  } else if (symbol.id === 'ForkNode') {
    symbol.width = 50;
    symbol.height = 20;
  } else if (symbol.id === 'JoinNode') {
    symbol.width = 20;
    symbol.height = 50;
  } else if (symbol.id === 'Decision' || symbol.id === 'MergeNode') {
    symbol.width = 50;
    symbol.height = 40;
  } else {
    symbol.width = 50;
    symbol.height = 50;
  }
  if (symbol && symbol.style) {
    symbol.style.strokeColor = '#757575';
  }
  if (
    symbol.style &&
    (symbol.id === 'InitialNode' ||
      symbol.id === 'FinalNode' ||
      symbol.id === 'JoinNode' ||
      symbol.id === 'ForkNode')
  ) {
    symbol.style.fill = '#757575';
  }
};

export const getConnectorDefaults = (obj: Connector) => {
  if (obj.id.indexOf('connector') !== -1) {
    obj.targetDecorator = {
      shape: 'Arrow',
      width: 10,
      height: 10,
    };
    obj.annotations = [{ content: 'Yes', style: { fill: '#FFFFFF' } }];
  }
};

export const dragEnter = ((args: IDragEnterEventArgs): void => {
  let obj: NodeModel = args.element as NodeModel;
  if (obj instanceof Node) {
    if (obj.shape instanceof BpmnShape) {
      if (
        //@ts-ignore
        !(obj.shape as BpmnShape).activity.subProcess.collapsed
      ) {
        //@ts-ignore
        (
          obj.shape as BpmnShape
        ).activity.subProcess.transaction.cancel.visible = true;
        //@ts-ignore
        (
          obj.shape as BpmnShape
        ).activity.subProcess.transaction.failure.visible = true;
        //@ts-ignore
        (
          obj.shape as BpmnShape
        ).activity.subProcess.transaction.success.visible = true;
      } else {
        let oWidth: number = obj.width || 100;
        let oHeight: number = obj.height || 100;
        let ratio: number = 100 / oWidth;
        obj.width = 100;
        obj.height = oHeight * ratio;
        obj.offsetX = (obj.offsetX || 0) + (obj.width - oWidth) / 2;
        obj.offsetY = (obj.offsetY || 0) + (obj.height - oHeight) / 2;
        obj.style = {
          fill: '#FFFFFF',
          strokeColor: '#000000',
        };
      }
    } else {
      let oWidth: number = obj.width || 100;
      let oHeight: number = obj.height || 100;
      let ratio: number = 100 / oWidth;
      obj.width = 100;
      obj.height = oHeight * ratio;
      obj.offsetX = (obj.offsetX || 0) + (obj.width - oWidth) / 2;
      obj.offsetY = (obj.offsetY || 0) + (obj.height - oHeight) / 2;
      obj.style = {
        fill: '#FFFFFF',
        strokeColor: '#000000',
      };
    }
  }
}) as EmitType<IDragEnterEventArgs>;

export const contextMenu: ContextMenuSettingsModel = {
  show: true,
  // items: [...bpmnsContextMenuItems, ...swimlaneContextMenuItems],
  items: bpmnsContextMenuItems,
  showCustomMenuOnly: true,
};

export function contextMenuOpen(
  args: DiagramBeforeMenuOpenEventArgs | undefined,
  diagramInstance: DiagramComponent | null
): void {
  bpmnsContextMenuOpen(args, diagramInstance);
  // swimlaneContextMenuOpen(args, diagramInstance);
}

export function contextMenuClick(
  args: MenuEventArgs | undefined,
  diagramInstance: DiagramComponent | null
): void {
  let diagram = diagramInstance;
  if (
    args &&
    diagram &&
    diagram.selectedItems &&
    diagram.selectedItems.nodes &&
    diagram.selectedItems.nodes.length > 0
  ) {
    bpmnShapeConextMenuClick(args, diagram);
    // swimlaneContextMenuClick(args, diagram);
    diagram.dataBind();
  }
}

export const tootipConfig = {
  content: '',
  position: 'TopLeft',
  relativeMode: 'Object',
  animation: {
    open: { effect: 'FadeZoomIn', delay: 0 },
    close: { effect: 'FadeZoomOut', delay: 0 },
  },
};
