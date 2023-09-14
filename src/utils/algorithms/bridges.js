import { fadeEdges } from "../animate";
import { createUnweightedGraph } from "./createGraph";

const findBridges = (nodes, edges, isDirected, showMessage, delay) => {
  if (isDirected) {
    showMessage("Please make the graph undirected", "error");
    return;
  }
  let in_time = {};
  let lowest = {};
  let timer = 0; // wrap it into an obj for pass by refrence
  let bridges = [];

  const adjList = createUnweightedGraph(nodes, edges, false);
  Object.keys(nodes).forEach((node) => {
    if (!in_time[node]) {
      dfs(adjList, node, "", in_time, lowest, bridges, { timer });
    }
  });

  if (bridges.length) {
    showMessage(bridges.length + " bridge(s) found", "success");
    fadeEdges(bridges, false, delay * bridges.length);
  } else {
    showMessage("No bridge found", "success");
  }
};

const dfs = (adjList, node, par, in_time, lowest, bridges, obj) => {
  in_time[node] = ++obj.timer;
  lowest[node] = in_time[node];

  adjList[node].forEach((child) => {
    if (child !== par) {
      if (!in_time[child]) {
        dfs(adjList, child, node, in_time, lowest, bridges, obj);
        lowest[node] = Math.min(lowest[node], lowest[child]);
        if (lowest[child] > in_time[node]) {
          bridges.push({ from: node, to: child });
        }
      } else {
        lowest[node] = Math.min(lowest[node], in_time[child]);
      }
    }
  });
};

export default findBridges;
