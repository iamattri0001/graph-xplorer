import Queue from "../structures/queue";
import { glowNodes, highlightPath } from "../animate";
import { createUnweightedGraph } from "./createGraph";

const bfsAlgo = (nodes, edges, isDirected, showMessage, delay) => {
  let source;

  source = prompt("Enter the starting vertex:");
  if (!source) return;
  if (!nodes[source]) {
    showMessage("Vertex '" + source + "' not found", "error");
    return;
  }
  showMessage('Started BFS traversal from node: "' + source + '"', "success");
  const adjList = createUnweightedGraph(nodes, edges, isDirected);
  let vis = new Set();
  let nodesSeq = [];
  let edgesSeq = [];

  bfs(adjList, source, vis, nodesSeq, edgesSeq);

  const animation = {
    nodesAnimation: glowNodes(nodesSeq, delay),
    edgesAnimation: highlightPath(edgesSeq, delay, isDirected),
  };

  return animation;
};

const bfs = (adjList, node, vis, nodesSeq, edgesSeq) => {
  const queue = new Queue();
  queue.enqueue(node);

  vis.add(node);

  while (!queue.isEmpty()) {
    const node = queue.peek();
    queue.dequeue();

    nodesSeq.push(node);

    adjList[node].forEach((child) => {
      if (!vis.has(child)) {
        vis.add(child);
        edgesSeq.push({ from: node, to: child });
        queue.enqueue(child);
      }
    });
  }
};
export default bfsAlgo;
