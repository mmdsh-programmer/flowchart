import React from "react";
import { DiagramComponent,
  SymbolInfo,
  SymbolPaletteComponent,
  ConnectorBridging,
  Inject,
  DiagramConstraints,
  BpmnDiagrams,
  UndoRedo,
  DiagramContextMenu,
  DataBinding,
  DiagramBeforeMenuOpenEventArgs,
  IClickEventArgs,
  SnapConstraints,
  DiagramTools,
  OverviewComponent,
  DiagramTooltipModel } from "@syncfusion/ej2-react-diagrams";
import { EmitType, enableRipple } from "@syncfusion/ej2-base";
import { addEvents,
  dragEnter,
  getConnectorDefaults,
  getNodeDefaults,
  getSymbolNodeDefault,
  gridlines,
  palettes,
  contextMenu,
  contextMenuClick,
  contextMenuOpen,
  tootipConfig } from "./Config/MainConfig";
import { SAMPLE_CSS } from "./Config/NetworkShapeConfig";
import { IProps, SampleBase } from "./Common/SampleBase";
import PropertyMenu from "./Common/PropertyMenu";
import { v4 as uuidv4 } from "uuid";

enableRipple(true);
export default class FlowChart extends SampleBase {
  flowChartId = `flowchart${uuidv4()}`;

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedItem: {
        id: null,
        type: null,
        strokeWidth: 1,
        fontSize: 12,
        fontColor: "#000000",
        strokeColor: "#000000",
        fillColor: "#FFFFFF",
      },
      loading: false,
    };
  }

  rendereComplete() {
    addEvents();
    if (this.diagramInstance) {
      this.diagramInstance.fitToPage();
    }
  }

  btnClick(): boolean {
    document
      .querySelectorAll(".e-file-select-wrap")[0]
      ?.querySelector("button")
      ?.click();
    return false;
  }

  changeZoom() {
    this.diagramInstance?.zoom(!this.props.overviewPanel ? 0 : 2);
  }

  componentDidUpdate() {
    this.changeZoom();
  }

  render() {
    return !this.props.overviewPanel ? (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          {this.props.mode === "EDIT" && (
            <>
              <div className="sb-mobile-palette-bar">
                <div
                  id="palette-icon"
                  style={{
                    float: "right",
                  }}
                  className="e-ddb-icons1 e-toggle-palette"
                />
              </div>
              <div id="palette-space" className="sb-mobile-palette">
                <SymbolPaletteComponent
                  id="symbolpalette"
                  palettes={palettes}
                  width="100%"
                  height="100%"
                  symbolHeight={60}
                  symbolWidth={60}
                  getNodeDefaults={getSymbolNodeDefault}
                  symbolMargin={{
                    left: 15, right: 15, top: 15, bottom: 15,
                  }}
                  getSymbolInfo={(): SymbolInfo => {
                    return {
                      fit: true,
                    };
                  }}
                >
                  <Inject
                    services={[
                      BpmnDiagrams,
                      UndoRedo,
                      DiagramContextMenu,
                      DataBinding,
                    ]}
                  />
                </SymbolPaletteComponent>
              </div>
            </>
          )}
          <div
            className={`diagram-wrapper ${
              this.props.mode === "PREVIEW" ? "" : "edit-mode"
            }`}
          >
            <div
              id="diagram-space"
              className="sb-mobile-diagram"
              ref={this.imageRef}
            >
              <DiagramComponent
                id={
                  this.props.mode === "PREVIEW" ? this.flowChartId : "flowchart"
                }
                click={this.itemClick as EmitType<IClickEventArgs>}
                ref={(diagram) => { return (this.diagramInstance = diagram); }}
                width="100%"
                height="100%"
                style={{
                  overflow: "hidden",
                }}
                snapSettings={
                  this.props.mode === "EDIT"
                    ? {
                      horizontalGridlines: gridlines,
                      verticalGridlines: gridlines,
                    }
                    : {
                      constraints: SnapConstraints.None,
                    }
                }
                tool={
                  this.props.mode === "PREVIEW"
                    ? DiagramTools.ZoomPan
                    : undefined
                }
                nodes={this.nodes}
                connectors={this.connectors}
                tooltip={tootipConfig as DiagramTooltipModel}
                // Sets the default values of a node
                getNodeDefaults={getNodeDefaults} // Sets the default values of a connector
                getConnectorDefaults={getConnectorDefaults}
                // Sets the Node style for DragEnter element.
                contextMenuClick={(arg) => { return contextMenuClick(arg, this.diagramInstance); }}
                contextMenuSettings={contextMenu}
                contextMenuOpen={(arg) => {
                  contextMenuOpen(
                    arg as DiagramBeforeMenuOpenEventArgs,
                    this.diagramInstance,
                  );
                }}
                dragEnter={dragEnter}
                constraints={
                  DiagramConstraints.Default | DiagramConstraints.Bridging
                }
                scrollSettings={{
                  scrollLimit: "Infinity",
                }} // Sets the constraints of the SnapSettings
              >
                <Inject
                  services={[
                    ConnectorBridging,
                    BpmnDiagrams,
                    UndoRedo,
                    DiagramContextMenu,
                    DataBinding,
                  ]}
                />
              </DiagramComponent>
            </div>
          </div>
          {this.props.mode === "EDIT" && (
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
    ) : (this.props.mode === "PREVIEW" ? (
      <div>
        <div className="col-lg-12">
          <div className="control-pane">
            <div className="control-section">
              <div className="diagram-wrapper">
                <div
                  id="diagram-space"
                  className="sb-mobile-diagram"
                  ref={this.imageRef}
                >
                  <DiagramComponent
                    id={this.flowChartId}
                    ref={(diagram) => { return (this.diagramInstance = diagram); }}
                    width="100%"
                    height="100%"
                    style={{
                      overflow: "hidden",
                    }}
                    scrollSettings={{
                      scrollLimit: "Infinity",
                    }} // Sets the constraints of the SnapSettings
                    snapSettings={{
                      constraints: SnapConstraints.None,
                    }}
                    tool={DiagramTools.ZoomPan}
                    nodes={this.nodes}
                    connectors={this.connectors}
                    tooltip={tootipConfig as DiagramTooltipModel}
                    // Sets the default values of a node
                    getNodeDefaults={getNodeDefaults} // Sets the default values of a connector
                    getConnectorDefaults={getConnectorDefaults}
                  >
                    <Inject
                      services={[
                        ConnectorBridging,
                        BpmnDiagrams,
                        UndoRedo,
                        DiagramContextMenu,
                        DataBinding,
                      ]}
                    />
                  </DiagramComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overviewPanel">
          <OverviewComponent
            id={`overview${uuidv4}`}
            style={{
              top: "30px",
            }}
            sourceID={this.flowChartId}
            width="225px"
            height="225px"
          />
        </div>
      </div>
    ) : null);
  }
}
