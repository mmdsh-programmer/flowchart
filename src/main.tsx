import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/index.css";
import "./styles/flowChart.scss";
import "./styles/flowChartExtra.scss";
import "./styles/npmDefaultStyles.scss";
import "./styles/editor.scss";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
