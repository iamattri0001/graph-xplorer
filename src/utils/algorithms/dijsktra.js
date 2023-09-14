import { createWeightedGraph } from "./createGraph";
import { MinHeap } from "../structures/heap";
import { glowNodes, highlightPath } from "../animate";

//comparators for heap
const greaterThan = (pair1, pair2) => {
  return pair1[1] > pair2[2];
};
const lessThan = (pair1, pair2) => {
  return pair1[1] < pair2[2];
};

const dijsktra = (
  nodes,
  edges,
  isDirected,
  showMessage,
  delay,
  weightFactor
) => {
  let source, dest;

  source = prompt("Enter the source vertex: ");
  if (!source) return;

  if (!nodes[source]) {
    showMessage("Vertex '" + source + "' not found", "error");
    return;
  }

  dest = prompt("Enter the destination vertex: ");
  if (!dest) return;

  if (!nodes[dest]) {
    showMessage("Vertex '" + dest + "' not found", "error");
    return;
  }

  const adjList = createWeightedGraph(nodes, edges, isDirected, weightFactor);
  const heap = new MinHeap(greaterThan, lessThan);

  let dist = {};
  let par = {};

  Object.keys(nodes).forEach((node) => {
    dist[node] = Infinity;
    par[node] = node;
  });

  dist[source] = 0;

  heap.insert([source, 0]);

  while (!heap.isEmpty()) {
    const pair = heap.extractMin();
    const node = pair[0];
    const curDist = pair[1];

    adjList[node].forEach((edge) => {
      if (edge[1] + curDist < dist[edge[0]]) {
        dist[edge[0]] = curDist + edge[1];
        par[edge[0]] = node;
        heap.insert([edge[0], dist[edge[0]]]);
      }
    });
  }

  if (dist[dest] === Infinity) {
    showMessage("No path between '" + source + "' and '" + dest + "'", "error");
    return;
  }

  showMessage("Shortest Path is " + dist[dest], "success");

  let nodesSeq = [];
  while (dest !== source) {
    nodesSeq.push(dest);
    dest = par[dest];
  }
  nodesSeq.push(source);

  nodesSeq = nodesSeq.reverse();
  let edgesSeq = [];

  for (let i = 1; i < nodesSeq.length; i++) {
    edgesSeq.push({
      from: nodesSeq[i - 1],
      to: nodesSeq[i],
    });
  }
  const animation = {
    nodesAnimation: glowNodes(nodesSeq, delay),
    edgesAnimation: highlightPath(edgesSeq, delay, isDirected),
  };

  return animation;
};

export default dijsktra;
