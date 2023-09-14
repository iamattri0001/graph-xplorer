import { glowNodes, highlightPath } from "../animate";
import { createUnweightedGraph } from "./createGraph";

const findCycle = (nodes, edges, isDirected, showMessage, delay) => {
  const adjList = createUnweightedGraph(nodes, edges, isDirected);
  let finished = new Set();
  let vis = new Set();
  let sequence = [];

  Object.keys(adjList).forEach((node) => {
    if (!vis.has(node) && sequence.length === 0) {
      if (isDirected) {
        checkCycleDirected(adjList, node, vis, finished, sequence, isDirected);
      } else {
        checkCycleUndirected(adjList, node, vis, "", sequence);
      }
    }
  });

  if (sequence.length) {
    const endNode = sequence[sequence.length - 1];
    let nodesSeq = [endNode];
    for (let i = sequence.length - 2; i >= 0; i--) {
      if (sequence[i] === endNode) {
        break;
      } else {
        nodesSeq.push(sequence[i]);
      }
    }
    nodesSeq.push(endNode); // to complete the cycle for animation convenience
    nodesSeq = nodesSeq.reverse();

    const edgesSeq = [];
    for (let i = 1; i < nodesSeq.length; i++)
      edgesSeq.push({ from: nodesSeq[i - 1], to: nodesSeq[i] });
    edgesSeq.push({ from: nodesSeq[nodesSeq.length - 1], to: nodesSeq[0] });

    const animation = {
      nodesAnimation: glowNodes(nodesSeq, delay),
      edgesAnimation: highlightPath(edgesSeq, delay, isDirected),
    };
    showMessage("Cycle found", "success");
    return animation;
  } else {
    showMessage("No cycle found", "succes");
    return null;
  }
};

const checkCycleUndirected = (adjList, node, vis, par, sequence) => {
  vis.add(node);
  sequence.push(node);

  for (let i = 0; i < adjList[node].length; i++)
    if (adjList[node][i] !== par) {
      if (vis.has(adjList[node][i])) {
        sequence.push(adjList[node][i]);
        return 1;
      } else {
        const hasCyle = checkCycleUndirected(
          adjList,
          adjList[node][i],
          vis,
          node,
          sequence
        );
        if (hasCyle) {
          return 1;
        }
      }
    }

  sequence.pop();
  return false;
};

const checkCycleDirected = (adjList, node, vis, finished, sequence) => {
  vis.add(node);
  sequence.push(node);

  for (let i = 0; i < adjList[node].length; i++) {
    if (!vis.has(adjList[node][i])) {
      let hasCyle = checkCycleDirected(
        adjList,
        adjList[node][i],
        vis,
        finished,
        sequence
      );
      if (hasCyle) {
        return true;
      }
    } else {
      if (!finished.has(adjList[node][i])) {
        sequence.push(adjList[node][i]);
        return true;
      }
    }
  }
  sequence.pop();
  finished.add(node);
  return false;
};

export default findCycle;
