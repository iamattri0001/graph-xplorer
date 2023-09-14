import { fadeNodes, stopFadeNodes } from "../animate";
import { createUnweightedGraph } from "./createGraph";

const articulationPoits = (nodes, edges, isDirected, showMessage, delay) => {
  if (isDirected) {
    showMessage("Please make the graph undirected", "error");
    return;
  }

  let in_time = {};
  let lowest = {};
  let points = new Set();
  let timer = 0; //wrap inside obj for pass by refrence

  const adjList = createUnweightedGraph(nodes, edges, false);

  Object.keys(nodes).forEach((node) => {
    if (!in_time[node]) {
      dfs(adjList, node, "", in_time, lowest, points, { timer });
    }
  });

  const artPoints = Array.from(points);
  if (artPoints.length) {
    fadeNodes(artPoints, delay * artPoints.length);
    showMessage(artPoints.length + " articulation point(s) found", "success");
  } else {
    showMessage("No articulation point found", "success");
    return;
  }

  setTimeout(() => {
    stopFadeNodes();
  }, 5000);
};

const dfs = (adjList, node, par, in_time, lowest, points, obj) => {
  in_time[node] = ++obj.timer;
  lowest[node] = in_time[node];

  let childCount = 0;

  adjList[node].forEach((child) => {
    if (child !== par) {
      if (!in_time[child]) {
        dfs(adjList, child, node, in_time, lowest, points, obj);
        lowest[node] = Math.min(lowest[node], lowest[child]);
        if (lowest[child] >= in_time[node] && par !== "") {
          points.add(node);
        }
        childCount++;
      } else {
        lowest[node] = Math.min(lowest[node], in_time[child]);
      }
    }
  });

  if (par === "" && childCount > 1) {
    points.add(node);
  }
};

export default articulationPoits;
