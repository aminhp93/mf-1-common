import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

function ReactHotkeysHookDemo() {
  const [count, setCount] = useState(0);
  useHotkeys("a", () => setCount((prevCount) => prevCount + 1));

  return <span>{count}</span>;
}

export default ReactHotkeysHookDemo;
