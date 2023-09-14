import { showMessage } from "./showMessageHandler";

export const saveGraphHandler = (nodes, edges, name, allGraphs) => {
  let newGraph = { name, nodes, edges };

  let alreadyExists = false;
  for (let i = 0; i < allGraphs.length; i++) {
    if (allGraphs[i].name === name) {
      alreadyExists = true;
      allGraphs[i] = newGraph;
      break;
    }
  }

  if (!alreadyExists) {
    allGraphs.push(newGraph);
  }
  localStorage.setItem("saved-graphs", JSON.stringify(allGraphs));
};

export const resetGraphHandler = (setNodes, setEdges) => {
  localStorage.removeItem("graph-working");
  setEdges([]);
  setNodes({});
  showMessage("Graph has been reset", "success");
};

export const loadGraphHandler = (setNodes, setEdges, name, allGraphs) => {
  let selectedGraph = null;

  for (let i = 0; i < allGraphs.length; i++) {
    if (allGraphs[i].name === name) {
      selectedGraph = allGraphs[i];
      break;
    }
  }

  setNodes(selectedGraph.nodes);
  setEdges(selectedGraph.edges);
};

export const deleteGraphHandler = (name, allGraphs) => {
  let newGraphs = [];
  allGraphs.forEach((graph) => {
    if (graph.name !== name) newGraphs.push(graph);
  });

  localStorage.setItem("saved-graphs", JSON.stringify(newGraphs));
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const randomizeGraphHandler = (nodes, setNodes) => {
  let newNodes = {};
  const paddingX = 0.2 * window.innerWidth;
  const paddingY = 0.15 * window.innerHeight;
  Object.keys(nodes).forEach((node) => {
    const newNode = {
      name: node,
      x: getRandomInt(paddingX, window.innerWidth - paddingX),
      y: getRandomInt(paddingY, window.innerHeight - paddingY),
    };
    newNodes[node] = newNode;
  });
  // setNodes(newNodes);
  setNodes((prevNodes) => ({ ...prevNodes, ...newNodes }));
};
