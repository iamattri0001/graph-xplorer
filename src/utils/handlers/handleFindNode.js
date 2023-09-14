import { showMessage } from "./showMessageHandler";

export const findNode = (nodes, setNodes, name, x, y) => {
  if (!nodes[name]) {
    showMessage(`Vertex '${name}' doesn't exist`, "error");
    return;
  }

  // document.getElementById(name).classList.remove('fill-node');
  document.getElementById(name).classList.add("highlight");

  setTimeout(() => {
    document.getElementById(name).classList.remove("highlight");
    // document.getElementById(name).classList.add('fill-node');
  }, 3000);

  setNodes((prevState) => {
    let newNodes = { ...prevState };
    newNodes[name].x = x;
    newNodes[name].y = y;
    return newNodes;
  });
};
