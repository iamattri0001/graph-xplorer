export const undoActions = (nodes, setNodes, edges, setEdges, getHistory) => {
    const history = getHistory();
    if (!history) {
        return;
    }

    history.forEach(action => {
        if (action[0] === 'add') {
            if (action[1] === 'node') {
                let newNodes = nodes;
                delete newNodes[action[2].name];
                setNodes(prevState => {
                    const newNodes = { ...prevState };
                    delete newNodes[action[2].name];
                    return newNodes;
                });

            } else {
                setEdges(prevState => {
                    let newEdges = prevState.filter(edge => edge != action[2]);
                    return newEdges;
                });
            }
        } else {
            if (action[1] === 'node') {
                setNodes(prevState => ({
                    ...prevState,
                    [action[2].name]: action[2]
                }));
            } else {
                setEdges(prevState => {
                    let newEdges = prevState;
                    newEdges.push(action[2]);
                    return newEdges;
                });
            }
        }
    });
}