import { createWeightedGraph } from "./createGraph";
import { MinHeap } from "../structures/heap";
import { glowNodes, highlightPath } from "../animate";

const prims = (nodes, edges, isDirected, showMessage, delay, weightFactor) => {
  if (isDirected) {
    showMessage("MST is not defined for directed graphs", "error");
    return;
  }

  const adjList = createWeightedGraph(nodes, edges, false, weightFactor);

  const startNode = Object.keys(nodes)[0];

  const greaterThan = (tuple1, tuple2) => {
    return tuple1[2] > tuple2[2];
  };

  const lessThan = (tuple1, tuple2) => {
    return tuple1[2] < tuple2[2];
  };

  const heap = new MinHeap(greaterThan, lessThan);
  adjList[startNode].forEach((edge) => {
    heap.insert([startNode, edge[0], edge[1]]);
  });

  let included = new Set();
  included.add(startNode);

  let nodesSeq = [startNode];
  let edgesSeq = [];

  let costOfMST = 0;
  while (!heap.isEmpty()) {
    const tuple = heap.extractMin();
    if (!included.has(tuple[1])) {
      const node = tuple[1];
      included.add(node);
      nodesSeq.push(node);
      edgesSeq.push({ from: tuple[0], to: node });
      costOfMST += tuple[2];

      adjList[node].forEach((edge) => {
        if (!included.has(edge[0])) {
          heap.insert([node, edge[0], edge[1]]);
        }
      });
    }
  }

  if (included.size !== Object.keys(nodes).length) {
    showMessage("MST is not defined for disconnected graphs", "error");
    return;
  }
  showMessage("Cost of MST is " + costOfMST, "success");
  const animation = {
    nodesAnimation: glowNodes(nodesSeq, delay),
    edgesAnimation: highlightPath(edgesSeq, delay, false),
  };

  return animation;
};

export default prims;
