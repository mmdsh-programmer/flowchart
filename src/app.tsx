import Flowchart from "./components/flowchart";
import React from "react";

const App = () => {
  return (
    <Flowchart
      codeHash="test"
      close={() => { return console.log("close"); }}
    />
  );
};

export default App;
