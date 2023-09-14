import { stopFadeEdges, stopFadeNodes, stopGlow } from "./animate";
import performBFS from "./algorithms/performBFS";
import performDFS from "./algorithms/performDFS";
import findCycle from "./algorithms/findCycle";
import numberOfComps from "./algorithms/numberOfComps";
import prims from "./algorithms/prims";
import findBridges from "./algorithms/bridges";
import articulationPoits from "./algorithms/articulationPoints";
import topoSort from "./algorithms/topoSort";
import dijsktra from "./algorithms/dijsktra";

//to stop animations

export const killAnimation = (algoId, animation) => {
  if (["0", "1", "2", "3", "7", "8"].includes(algoId)) {
    stopGlow(animation);
    stopFadeEdges();
  } else {
    stopFadeEdges();
    stopFadeNodes();
  }
};

export const algorithms = [
  {
    id: 0,
    name: "dfs",
    title: "Perform DFS",
    algo: performDFS,
  },
  {
    id: 1,
    name: "bfs",
    title: "Perform BFS",
    algo: performBFS,
  },
  {
    id: 2,
    name: "findCycle",
    title: "Check for cycles",
    algo: findCycle,
  },
  {
    id: 3,
    name: "prims",
    title: "Minimum Cost Spanning Tree (by Prim's)",
    algo: prims,
  },
  {
    id: 4,
    name: "numberOfComps",
    title: "Number of components",
    algo: numberOfComps,
  },
  {
    id: 5,
    name: "bridges",
    title: "Find all bridges",
    algo: findBridges,
  },
  {
    id: 6,
    name: "articulationPoints",
    title: "Find all articulation points",
    algo: articulationPoits,
  },
  {
    id: 7,
    name: "topoSort",
    title: "Find topological sort",
    algo: topoSort,
  },
  {
    id: 8,
    name: "dijsktra",
    title: "Find shortest path",
    algo: dijsktra,
  },
];
