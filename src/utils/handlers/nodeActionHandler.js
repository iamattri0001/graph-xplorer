import { showMessage } from "./showMessageHandler";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const nodeActionHandler = (
  nodeAction,
  nodes,
  setNodes,
  edges,
  setEdges,
  givenName,
  addHistory
) => {
  let name;
  if (givenName) {
    if (nodeAction === "Add") {
      name = givenName;
      const paddingX = 0.2 * window.innerWidth;
      const paddingY = 0.15 * window.innerHeight;
      const node = {
        name: name,
        x: getRandomInt(paddingX, window.innerWidth - paddingX),
        y: getRandomInt(paddingY, window.innerHeight - paddingY),
      };

      setNodes((prevState) => ({
        ...prevState,
        [name]: node,
      }));
      return true;
    } else {
      name = givenName;
      // delete action case, will go to the bottm part of code now
    }
  } else {
    name = document.getElementById("node-name").value;
  }

  if (name === "") return;
  if (nodeAction === "Add") {
    if (nodes[name]) {
      showMessage("Provide a unique name", "error");
      return;
    }

    document.getElementById("node-name").value = "";
    const paddingX = 0.2 * window.innerWidth;
    const paddingY = 0.15 * window.innerHeight;

    const node = {
      name: name,
      x: getRandomInt(paddingX, window.innerWidth - paddingX),
      y: getRandomInt(paddingY, window.innerHeight - paddingY),
    };

    addHistory([["add", "node", node]]);
    setNodes((prevState) => ({
      ...prevState,
      [name]: node,
    }));

    return true;
  } else {
    if (!nodes[name]) {
      showMessage("Vertex doesn't exist", "error");
      return;
    }

    document.getElementById("node-name").value = "";
    let history = [["delete", "node", nodes[name]]];

    const newNodes = { ...nodes };
    delete newNodes[name];

    let newEdges = [];
    edges.forEach((edge) => {
      if (edge.from !== name && edge.to !== name) {
        newEdges.push(edge);
      } else {
        history.push(["delete", "edge", edge]);
      }
    });

    addHistory(history);

    setNodes(newNodes);
    setEdges(newEdges);
    // if (showMessage) {
    showMessage("Deleted vertex '" + name + "'", "success");
    // }
  }
};
export default nodeActionHandler;
