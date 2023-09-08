import { glowNodes, highlightPath } from "../animate";
import { createUnweightedGraph } from "./createGraph";

const dfsAlgo = (nodes, edges, isDirected, showMessage, delay) => {
    let source;

    source = prompt("Enter the starting vertex:");
    if (!source) return;
    
    if (!nodes[source]) {
        showMessage("Vertex '" + source + "' not found", 'error');
        return;
    }

    showMessage('Started DFS traversal from node: "' + source + '"', 'success');
    const adjList = createUnweightedGraph(nodes, edges, isDirected);
    let vis = new Set();
    let nodesSeq = [];
    let edgesSeq = [];
    dfs(adjList, source, vis, nodesSeq, edgesSeq);

    const animation = {
        nodesAnimation: glowNodes(nodesSeq, delay),
        edgesAnimation: highlightPath(edgesSeq, delay, isDirected)
    };

    return animation;
}

const dfs = (adjList, node, vis, nodesSeq, edgesSeq) => {
    vis.add(node);
    nodesSeq.push(node);
    adjList[node].forEach(child => {
        if (!vis.has(child)) {
            edgesSeq.push({ from: node, to: child });
            dfs(adjList, child, vis, nodesSeq, edgesSeq);
        }
    });
}
export default dfsAlgo;