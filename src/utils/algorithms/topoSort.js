import { createUnweightedGraph } from "./createGraph";
import Queue from "../structures/queue";
import { glowNodes } from "../animate";

const topoSort = (nodes, edges, isDirected, showMessage, delay, weightFactor, setNodes) => {
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

    let levelWiseOrder = [];
    let count = 0;

    while (!queue.isEmpty()) {
        let size = queue.size();
        let curLevel = [];
        while (size--) {
            const node = queue.dequeue();
            curLevel.push(node);
            count++;

            adjList[node].forEach(child => {
                inDegree[child]--;
                if (inDegree[child] === 0) {
                    queue.enqueue(child);
                }
            });
        }

        levelWiseOrder.push(curLevel);
    }

    if (count !== Object.keys(nodes).length) {
        showMessage("The graph has cycles!", 'error');
        return;
    }

    const paddingX = 0.2 * window.innerWidth;
    const paddingY = 0.15 * window.innerHeight;

    const x_max = window.innerWidth - paddingX/2;
    const x_min = paddingX;


    const y_max = window.innerHeight - paddingY/2;
    const y_min = paddingY;

    let delta_x = (x_max - x_min) / (count > 1 ? count - 1 : 1);
    let gap_on_left = paddingX;

    let newNodes = { ...nodes };
    let sequence = [];

    levelWiseOrder.forEach(level => {
        let delta_y = (y_max - y_min) / (level.length > 1 ? level.length - 1 : 1);
        let gap_on_top = paddingY;
        level.forEach(node => {
            newNodes[node].x = gap_on_left;
            newNodes[node].y = gap_on_top + Math.random() * 20;

            gap_on_top += delta_y;

            sequence.push(node);
        });
        gap_on_left += delta_x;
    });

    setNodes(newNodes);

    const animation = {
        nodesAnimation: glowNodes(sequence, delay)
    };

    return animation;
}

export default topoSort;