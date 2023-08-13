import { createUnweightedGraph } from "./createGraph";
import Queue from "../structures/queue";
import { glowNodes } from "../animate";

const topoSort = (nodes, edges, isDirected, showMessage, delay) => {
    if (!isDirected) {
        showMessage("Please make the graph directed!", 'error');
        return;
    }

    let inDegree = {};
    Object.keys(nodes).forEach(node => {
        inDegree[node] = 0;
    });

    const adjList = createUnweightedGraph(nodes, edges, true);
    const queue = new Queue();

    Object.keys(nodes).forEach(node => {
        adjList[node].forEach(child => inDegree[child]++);
    });

    Object.keys(nodes).forEach(node => {
        if (inDegree[node] === 0) {
            queue.enqueue(node);
        }
    });

    let sequence = [];

    while (!queue.isEmpty()) {
        const node = queue.dequeue();
        sequence.push(node);

        adjList[node].forEach(child => {
            inDegree[child]--;
            if (inDegree[child] === 0) {
                queue.enqueue(child);
            }
        });
    }

    if (sequence.length !== Object.keys(nodes).length) {
        showMessage("The graph has cycles!", 'error');
        return;
    }
    const animation = {
        nodesAnimation: glowNodes(sequence, delay)
    };

    return animation;
}

export default topoSort;