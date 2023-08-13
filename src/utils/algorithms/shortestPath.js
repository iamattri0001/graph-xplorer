import { createWeightedGraph } from "./createGraph";

const dijkstra = (nodes, edges, isDirected) => {
    const adjList = createWeightedGraph(nodes, edges, isDirected);
    console.log(adjList);
}

export default dijkstra;