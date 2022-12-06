export enum ERequest {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
}

export enum EChart {
  line = "line",
  bar = "bar",
  horizontalBar = "horizontalBar",
  radar = "radar",
  doughnut = "doughnut",
  polar = "polar",
  bubble = "bubble",
  pie = "pie",
  scatter = "scatter",
}

export enum EVersionStatus {
  public = "public",
  private = "private",
  pending = "pending",
  rejected = "rejected",
}

export enum EImageAlign {
  NONE = "none",
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export enum ClasorExtension {
  CONTENT = "clasor",
}

export enum EFlowType {
  BASIC = "basic",
  SWIMLANE = "swimlane",
  MINDMAP = "mindmap",
}

export enum EDiagramITemType {
  NODES = "nodes",
  CONNECTORS = "connectors",
}
