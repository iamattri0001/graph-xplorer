import { createUnweightedGraph } from "./createGraph";

const findComps = (nodes, edges, isDirected, showMessage) => {
  if (isDirected) {
    showMessage("Number of components are not defined for directed graph");
    return -1;
  }

  const adjList = createUnweightedGraph(nodes, edges, isDirected);
  let vis = new Set();
  let comps = 0;

  Object.keys(nodes).forEach((node) => {
    if (!vis.has(node)) {
      dfs(adjList, node, vis, "");
      comps++;
    }
  });

  showMessage("Number of components: " + comps, "success");
  return comps;
};

const dfs = (adjList, node, vis, par) => {
  vis.add(node);
  adjList[node].forEach((child) => {
    if (child !== par && !vis.has(child)) {
      dfs(adjList, child, vis, node);
    }
  });
};
export default findComps;
