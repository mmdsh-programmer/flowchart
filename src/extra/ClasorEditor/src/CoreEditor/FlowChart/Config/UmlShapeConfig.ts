import { NodeModel } from '@syncfusion/ej2-react-diagrams';

export const umlActivityShapes: NodeModel[] = [
  { id: 'Action', shape: { type: 'UmlActivity', shape: 'Action' } },
  { id: 'Decision', shape: { type: 'UmlActivity', shape: 'Decision' } },
  { id: 'MergeNode', shape: { type: 'UmlActivity', shape: 'MergeNode' } },
  { id: 'InitialNode', shape: { type: 'UmlActivity', shape: 'InitialNode' } },
  { id: 'FinalNode', shape: { type: 'UmlActivity', shape: 'FinalNode' } },
  { id: 'ForkNode', shape: { type: 'UmlActivity', shape: 'ForkNode' } },
  { id: 'JoinNode', shape: { type: 'UmlActivity', shape: 'JoinNode' } },
  { id: 'TimeEvent', shape: { type: 'UmlActivity', shape: 'TimeEvent' } },
  {
    id: 'AcceptingEvent',
    shape: { type: 'UmlActivity', shape: 'AcceptingEvent' },
  },
  { id: 'SendSignal', shape: { type: 'UmlActivity', shape: 'SendSignal' } },
  {
    id: 'ReceiveSignal',
    shape: { type: 'UmlActivity', shape: 'ReceiveSignal' },
  },
  {
    id: 'StructuredNode',
    shape: { type: 'UmlActivity', shape: 'StructuredNode' },
  },
  { id: 'Note', shape: { type: 'UmlActivity', shape: 'Note' } },
];
