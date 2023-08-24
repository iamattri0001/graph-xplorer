export const saveGraphHandler = (nodes, edges, name, allGraphs) => {

    let newGraph = { name, nodes, edges };

    let alreadyExists = false;
    for (let i = 0; i < allGraphs.length; i++) {
        if (allGraphs[i].name === name) {
            alreadyExists = true;
            allGraphs[i] = newGraph;
            break;
        }
    }

    if (!alreadyExists) {
        allGraphs.push(newGraph);
    }
    localStorage.setItem('saved-graphs', JSON.stringify(allGraphs));
}

export const resetGraphHandler = (setNodes, setEdges, showMessage) => {
    localStorage.removeItem('graph-working');
    setEdges([]);
    setNodes({});
    showMessage('Graph has been reset', 'success');
}

export const loadGraphHandler = (setNodes, setEdges, name, allGraphs) => {
    let selectedGraph = null;
    setEdges([]);
    setNodes({});

    for (let i = 0; i < allGraphs.length; i++) {
        if (allGraphs[i].name === name) {
            selectedGraph = allGraphs[i];
            break;
        }
    }

    setTimeout(() => {
        setNodes(selectedGraph.nodes);
        setEdges(selectedGraph.edges);
    }, 2000);
}

export const deleteGraphHandler = (name, allGraphs) => {
    let newGraphs = [];
    allGraphs.forEach(graph => {
        if (graph.name !== name)
            newGraphs.push(graph);
    });

    localStorage.setItem('saved-graphs', JSON.stringify(newGraphs))
}
