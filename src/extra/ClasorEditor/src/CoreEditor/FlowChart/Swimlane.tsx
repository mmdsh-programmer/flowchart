import React from 'react';
import { EmitType } from '@syncfusion/ej2-base';
import { v4 as uuidv4 } from 'uuid';
import {
  DiagramComponent,
  Inject,
  SymbolPaletteComponent,
  DiagramBeforeMenuOpenEventArgs,
  DiagramContextMenu,
  UndoRedo,
  IClickEventArgs,
  SnapConstraints,
  DiagramTools,
  OverviewComponent,
} from '@syncfusion/ej2-react-diagrams';
import PropertyMenu from './Common/PropertyMenu';
import { IProps, SampleBase } from './Common/SampleBase';
import { addEvents, gridlines } from './Config/MainConfig';
import {
  getSwimlaneConnectorDefaults,
  getSwimlaneNodeDefault,
  swimlaneContextMenu,
  swimlaneContextMenuClick,
  swimlaneContextMenuOpen,
  swimlaneDragEnter,
  swimlanePalettes,
  SWIMLANE_SAMPLE_CSS,
} from './Config/SwimLaneConfig';
export class Swimlane extends SampleBase {
  swimlaneId = 'swimlane' + uuidv4();
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
      addEvents();
      this.diagramInstance.fitToPage();
    }
  }

  render() {
    return (
      <div>
        <div className="control-pane">
          <style>{SWIMLANE_SAMPLE_CSS}</style>
          <div className="control-section">
            {this.props.mode === 'EDIT' && (
              <div>
                <div className="sb-mobile-palette-bar">
                  <div
                    id="palette-icon"
                    style={{ float: 'right' }}
                    className="e-ddb-icons1 e-toggle-palette"
                  ></div>
                </div>
                <div id="palette-space" className="sb-mobile-palette">
                  <SymbolPaletteComponent
                    id="swimlaneSymbolpalette"
                    expandMode="Multiple"
                    palettes={swimlanePalettes}
                    width={'100%'}
                    height={'100%'}
                    symbolHeight={48}
                    symbolWidth={48}
                    symbolMargin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                  />
                </div>
              </div>
            )}
            <div
              className={`diagram-wrapper ${
                this.props.mode === 'PREVIEW' ? '' : 'edit-mode'
              }`}
            >
              <div id="diagram-space" className="sb-mobile-diagram">
                <DiagramComponent
                  id={
                    this.props.mode === 'PREVIEW' ? this.swimlaneId : 'swimlane'
                  }
                  click={this.itemClick as EmitType<IClickEventArgs>}
                  ref={(diagram) => (this.diagramInstance = diagram)}
                  width={'100%'}
                  height={'100%'}
                  style={{ overflow: 'hidden' }}
                  snapSettings={
                    this.props.mode === 'EDIT'
                      ? {
                          horizontalGridlines: gridlines,
                          verticalGridlines: gridlines,
                        }
                      : { constraints: SnapConstraints.None }
                  }
                  tool={
                    this.props.mode === 'PREVIEW'
                      ? DiagramTools.ZoomPan
                      : undefined
                  }
                  nodes={this.nodes}
                  connectors={this.connectors} //Sets the default values of a connector
                  getNodeDefaults={getSwimlaneNodeDefault}
                  getConnectorDefaults={getSwimlaneConnectorDefaults}
                  contextMenuSettings={swimlaneContextMenu}
                  contextMenuOpen={(arg) => {
                    swimlaneContextMenuOpen(
                      arg as DiagramBeforeMenuOpenEventArgs,
                      this.diagramInstance
                    );
                  }}
                  contextMenuClick={(arg) => {
                    swimlaneContextMenuClick(arg, this.diagramInstance);
                  }}
                  //Sets the Node properties for DragEnter element.
                  dragEnter={swimlaneDragEnter}
                >
                  <Inject services={[UndoRedo, DiagramContextMenu]} />
                </DiagramComponent>
              </div>
            </div>
            {this.props.mode === 'EDIT' && (
              <PropertyMenu
                itemProperty={this.state.selectedItem}
                handleFillColorChange={this.handleFillColorChange}
                handleStrokeColorChange={this.handleStrokeColorChange}
                handleStrokeWidthChange={this.handleStrokeWidthChange}
                handleFontSizeChange={this.handleFontSizeChange}
                handleFontColorChange={this.handleFontColorChange}
                handleTooltipChange={this.handleTooltipChange}
              />
            )}
          </div>
        </div>
        {this.props.overviewPanel && this.props.mode === 'PREVIEW' && (
          <div className="col-lg-4 overviewPanel">
            <OverviewComponent
              id={'swimlane-overview' + uuidv4}
              style={{ top: '30px' }}
              sourceID={this.swimlaneId}
              width={'100%'}
              height={'150px'}
            />
          </div>
        )}
      </div>
    );
  }
}
