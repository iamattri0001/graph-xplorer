import { glowNodes, highlightPath } from "../animate";
import { createUnweightedGraph } from "./createGraph";
import { createEdgeSeq } from "./sequenceGenerate";
const dfsAlgo = (nodes, edges, isDirected, showMessage, delay) => {
  let source;

  source = prompt("Enter the starting vertex:");
  if (!source) return;

  if (!nodes[source]) {
    showMessage("Vertex '" + source + "' not found", "error");
    return;
  }

  showMessage('Started DFS traversal from node: "' + source + '"', "success");
  const adjList = createUnweightedGraph(nodes, edges, isDirected);
  let vis = new Set();
  let nodesSeq = [];
  dfs(adjList, source, vis, nodesSeq);

  let edgesSeq = createEdgeSeq(adjList, nodesSeq);
  const animation = {
    nodesAnimation: glowNodes(nodesSeq, delay),
    edgesAnimation: highlightPath(edgesSeq, delay, isDirected),
  };

  return animation;
};

const dfs = (adjList, node, vis, nodesSeq) => {
  vis.add(node);
  nodesSeq.push(node);
  adjList[node].forEach((child) => {
    if (!vis.has(child)) {
      dfs(adjList, child, vis, nodesSeq);
    }
  });
};
export default dfsAlgo;
