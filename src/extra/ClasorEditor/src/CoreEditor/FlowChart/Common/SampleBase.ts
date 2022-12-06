import {
  ConnectorConstraints,
  ConnectorModel,
  DiagramComponent,
  IClickEventArgs,
  NodeConstraints,
  NodeModel,
} from '@syncfusion/ej2-react-diagrams';
import { EDiagramITemType } from '../../../Enum';
import { IItemProps } from '../../../Interface';
import domtoimage from 'dom-to-image';

import React from 'react';

export declare interface IProps {
  mode: 'PREVIEW' | 'EDIT';
  overviewPanel?: boolean;
}

declare interface IState {
  selectedItem: IItemProps;
  loading: boolean;
}

let timeout: number;

export class SampleBase extends React.PureComponent<IProps, IState> {
  diagramInstance: DiagramComponent | null = null;
  //Initializes the nodes for the diagram
  nodes: NodeModel[] = [];
  //Initializes the connector for the diagram
  connectors: ConnectorModel[] = [];
  imageRef = React.createRef<HTMLDivElement>();
  rendereComplete() {
    /**custom render complete function */
  }
  componentDidMount() {
    setTimeout(() => {
      this.rendereComplete();
    });
  }

  itemClick = (arg: IClickEventArgs) => {
    let node: any = arg?.element;
    console.log(node);
    const id = node?.id;
    if (
      node.id !== 'flowchart' &&
      node.id !== 'swimlane' &&
      !!!node.isPhase &&
      !!!node.isLane &&
      !!!node.isHeader &&
      node.shape?.type !== 'SwimLane' &&
      node.style
    ) {
      this.setState(() => {
        return {
          selectedItem: {
            id: id || null,
            type:
              node.propName === 'nodes' || node.propName === 'children'
                ? 'nodes'
                : node.propName === 'connectors'
                ? 'connectors'
                : null,
            fillColor:
              node.style.fill === 'white' ? '#FFFFFF' : node.style.fill,
            strokeColor: node.style.strokeColor,
            strokeWidth: node.style.strokeWidth,
            fontColor:
              node.annotations && node.annotations[0]
                ? node.annotations[0]?.style.color
                : '#000000',
            fontSize:
              node.annotations && node.annotations[0]
                ? node.annotations[0]?.style.fontSize
                : 12,
            tooltip: node.tooltip.content || null,
          },
        };
      });
    } else {
      // reset state
      this.setState(() => {
        return {
          selectedItem: {
            id: null,
            type: null,
            fillColor: '#FFFFFF',
            fontColor: '#000000',
            strokeColor: '#000000',
            strokeWidth: 1,
            fontSize: 12,
          },
        };
      });
    }
  };
  handleFillColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    const fillColor = event.target.value;
    if (this.diagramInstance) {
      if (this.state.selectedItem.type === 'nodes') {
        const itemArr = this.diagramInstance.nodes;
        // find seleced item
        const itemIndex = itemArr.findIndex(
          (node) => node.id === this.state.selectedItem.id
        );
        const selectedItem = itemArr[itemIndex];
        // set new fill color
        timeout = window.setTimeout(() => {
          if (itemIndex >= 0 && this.diagramInstance) {
            this.diagramInstance.nodes[itemIndex].style = {
              ...selectedItem.style,
              fill: fillColor,
            };
          }
        }, 100);
      } else if (this.state.selectedItem.type === 'connectors') {
        const itemArr = this.diagramInstance.connectors;
        const itemIndex = itemArr.findIndex(
          (node) => node.id === this.state.selectedItem.id
        );
        const selectedItem = itemArr[itemIndex];
        selectedItem.style = {
          ...selectedItem.style,
          strokeColor: fillColor,
          fill: fillColor,
        };
        if (
          selectedItem.targetDecorator &&
          selectedItem.targetDecorator.style &&
          selectedItem.targetDecorator.shape === 'Arrow'
        ) {
          selectedItem.targetDecorator.style = {
            ...selectedItem.targetDecorator,
            fill: fillColor,
            strokeColor: fillColor,
          };
        }
        if (
          selectedItem.sourceDecorator &&
          selectedItem.sourceDecorator.style &&
          selectedItem.sourceDecorator.shape === 'Arrow'
        ) {
          selectedItem.sourceDecorator.style = {
            ...selectedItem.targetDecorator,
            fill: fillColor,
            strokeColor: fillColor,
          };
        }
        timeout = window.setTimeout(() => {
          if (this.diagramInstance) {
            this.diagramInstance.connectors[itemIndex] = selectedItem;
          }
        }, 100);
      }
      this.setState((prevState) => {
        return {
          selectedItem: {
            ...prevState.selectedItem,
            fillColor,
          },
        };
      });
    }
  };

  handleStrokeWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    const strokeWidth =
      +event.target.value >= 50
        ? 50
        : +event.target.value <= 1
        ? 1
        : +event.target.value;
    if (this.diagramInstance) {
      if (this.state.selectedItem.type === 'nodes') {
        const itemArr = this.diagramInstance.nodes;
        // find seleced item
        const itemIndex = itemArr.findIndex(
          (node) => node.id === this.state.selectedItem.id
        );
        const selectedItem = itemArr[itemIndex];
        // set new fill color
        timeout = window.setTimeout(() => {
          if (itemIndex >= 0 && this.diagramInstance) {
            this.diagramInstance.nodes[itemIndex].style = {
              ...selectedItem.style,
              strokeWidth,
            };
          }
        }, 100);
      } else if (this.state.selectedItem.type === 'connectors') {
        const itemArr = this.diagramInstance.connectors;
        const itemIndex = itemArr.findIndex(
          (node) => node.id === this.state.selectedItem.id
        );
        const selectedItem = itemArr[itemIndex];
        selectedItem.style = {
          ...selectedItem.style,
          strokeWidth,
        };
        if (
          selectedItem.targetDecorator &&
          selectedItem.targetDecorator.style &&
          selectedItem.targetDecorator.shape === 'Arrow'
        ) {
          selectedItem.targetDecorator.style = {
            ...selectedItem.targetDecorator,
            strokeWidth,
          };
        }
        if (
          selectedItem.sourceDecorator &&
          selectedItem.sourceDecorator.style &&
          selectedItem.sourceDecorator.shape === 'Arrow'
        ) {
          selectedItem.sourceDecorator.style = {
            ...selectedItem.targetDecorator,
            strokeWidth,
          };
        }
        timeout = window.setTimeout(() => {
          if (this.diagramInstance) {
            this.diagramInstance.connectors[itemIndex] = selectedItem;
          }
        }, 100);
      }
      this.setState((prevState) => {
        return {
          selectedItem: {
            ...prevState.selectedItem,
            strokeWidth: strokeWidth,
          },
        };
      });
    }
  };

  handleStrokeColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const strokeColor = event.target.value;
    clearTimeout(timeout);
    if (this.diagramInstance && this.state.selectedItem.type) {
      const itemArr =
        this.diagramInstance[
          `${this.state.selectedItem.type}` as EDiagramITemType
        ];
      // find seleced item
      const itemIndex = itemArr.findIndex(
        (node) => node.id === this.state.selectedItem.id
      );
      const selectedItem = itemArr[itemIndex];
      selectedItem.style = {
        ...selectedItem.style,
        strokeColor: strokeColor,
      };
      // set new fill color
      timeout = window.setTimeout(() => {
        if (
          itemIndex >= 0 &&
          this.diagramInstance &&
          selectedItem.annotations &&
          selectedItem.annotations[0]
        ) {
          this.diagramInstance[
            `${this.state.selectedItem.type}` as EDiagramITemType
          ][itemIndex] = selectedItem;
        }
      }, 100);
    }
    this.setState((prevState) => {
      return {
        selectedItem: {
          ...prevState.selectedItem,
          strokeColor,
        },
      };
    });
  };

  handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fontSize =
      +event.target.value >= 50
        ? 50
        : +event.target.value <= 1
        ? 1
        : +event.target.value;
    clearTimeout(timeout);
    if (this.diagramInstance && this.state.selectedItem.type) {
      const itemArr =
        this.diagramInstance[
          `${this.state.selectedItem.type}` as EDiagramITemType
        ];
      // find seleced item
      const itemIndex = itemArr.findIndex(
        (node) => node.id === this.state.selectedItem.id
      );
      const selectedItem = itemArr[itemIndex];
      // set new fill color
      timeout = window.setTimeout(() => {
        if (
          itemIndex >= 0 &&
          this.diagramInstance &&
          selectedItem.annotations &&
          selectedItem.annotations[0]
        ) {
          if (
            this.diagramInstance[
              `${this.state.selectedItem.type}` as EDiagramITemType
            ][itemIndex].annotations?.[0]?.style
          ) {
            const annotations =
              this.diagramInstance[
                `${this.state.selectedItem.type}` as EDiagramITemType
              ][itemIndex].annotations;
            annotations![0].style = {
              ...selectedItem.annotations[0].style,
              fontSize,
            };
          }
        }
      }, 100);
    }
    this.setState((prevState) => {
      return {
        selectedItem: {
          ...prevState.selectedItem,
          fontSize: fontSize,
        },
      };
    });
  };

  handleFontColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fontColor = event.target.value;
    clearTimeout(timeout);
    if (this.diagramInstance && this.state.selectedItem.type) {
      const itemArr =
        this.diagramInstance[
          `${this.state.selectedItem.type}` as EDiagramITemType
        ];
      // find seleced item
      const itemIndex = itemArr.findIndex(
        (node) => node.id === this.state.selectedItem.id
      );
      const selectedItem = itemArr[itemIndex];
      // set new fill color
      timeout = window.setTimeout(() => {
        if (
          itemIndex >= 0 &&
          this.diagramInstance &&
          selectedItem.annotations &&
          selectedItem.annotations[0]
        ) {
          if (
            this.diagramInstance[
              `${this.state.selectedItem.type}` as EDiagramITemType
            ][itemIndex].annotations?.[0]?.style
          ) {
            const annotations =
              this.diagramInstance[
                `${this.state.selectedItem.type}` as EDiagramITemType
              ][itemIndex].annotations;
            annotations![0].style = {
              ...selectedItem.annotations[0].style,
              color: fontColor,
            };
          }
        }
      }, 100);
    }
    this.setState((prevState) => {
      return {
        selectedItem: {
          ...prevState.selectedItem,
          fontColor: fontColor,
        },
      };
    });
  };

  handleTooltipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    const tooltipContent = event.target.value;
    if (this.diagramInstance && this.state.selectedItem.type) {
      const itemArr =
        this.diagramInstance[
          `${this.state.selectedItem.type}` as EDiagramITemType
        ];
      // find seleced item
      const itemIndex = itemArr.findIndex(
        (node) => node.id === this.state.selectedItem.id
      );
      // set new fill color
      timeout = window.setTimeout(() => {
        if (itemIndex >= 0 && this.diagramInstance) {
          const selectedItem =
            this.diagramInstance[
              `${this.state.selectedItem.type}` as EDiagramITemType
            ][itemIndex];
          if (selectedItem.tooltip) {
            selectedItem.tooltip = {
              content: tooltipContent,
              position: 'TopLeft',
              //Sets the tooltip position relative to the node
              relativeMode: 'Object',
              animation: {
                open: { effect: 'FadeZoomIn', delay: 0 },
                close: { effect: 'FadeZoomOut', delay: 0 },
              },
            };
          }
          if (selectedItem.constraints) {
            selectedItem.constraints =
              NodeConstraints.Default |
              NodeConstraints.Tooltip |
              ConnectorConstraints.Default |
              ConnectorConstraints.Tooltip;
          }
        }
      }, 100);
    }
    this.setState((prevState) => {
      return {
        selectedItem: {
          ...prevState.selectedItem,
          tooltip: tooltipContent,
        },
      };
    });
  };

  getData = () => {
    if (this.diagramInstance) {
      const data = this.diagramInstance.saveDiagram();
      return data;
    }
    return null;
  };

  setData = (data: string) => {
    const defaultData = this.diagramInstance?.saveDiagram();
    if (this.diagramInstance && data && defaultData) {
      const parsedDefaultData = JSON.parse(defaultData);
      const parsedData = JSON.parse(data);
      parsedDefaultData.nodes = parsedData.nodes;
      parsedDefaultData.connectors = parsedData.connectors;
      this.diagramInstance?.loadDiagram(JSON.stringify(parsedDefaultData));
    }
  };

  exportImage = (): Promise<string | null> => {
    return new Promise(async (resolve) => {
      try {
        const node = this.imageRef.current;
        if (node) {
          const wrapper = node.getElementsByClassName('e-droppable');
          const options = {
            quality: 8.5,
            width: 600,
            height: 600,
          };
          if (wrapper && wrapper[0]) {
            const editlayerElement =
              document.getElementsByClassName('e-adorner-layer');
            if (editlayerElement && editlayerElement[0]) {
              editlayerElement[0].remove();
            }
            const base64 = await domtoimage.toJpeg(wrapper[0], options);
            resolve(base64);
          }
        }
      } catch (error) {
        resolve(null);
      }
    });
  };

  getImageLink = () => {
    return new Promise(async (resolve) => {
      try {
        const image = this.imageRef.current;
        if (image) {
          const wrapper = image.getElementsByClassName('e-droppable');
          const options = {
            quality: 8.5,
          };
          if (wrapper && wrapper[0]) {
            const base64 = await domtoimage.toJpeg(wrapper[0], options);
            // const blobResponse = await fetch(base64);
            // const blob = await blobResponse.blob();
            // const file = new File([blob], name, { type: 'image/jpg' });
            // todo
            // we can upload file to usergroup and resolve hash of file
            resolve(base64);
          }
        }
      } catch (error) {
        resolve(null);
      }
    });
  };
}
