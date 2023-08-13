const nodeActionHandler = (nodeAction, nodes, setNodes, edges, setEdges, showMessage, givenName) => {
    let name;
    if (givenName) {
        name = givenName;
    } else {
        name = document.getElementById('node-name').value;
    }
    if (name === '')
        return;
    if (nodeAction === 'Add') {
        if (nodes[name]) {
            showMessage('Provide a unique name', 'error')
            return;
        }
        document.getElementById('node-name').value = '';
        const paddingX = 0.2 * window.innerWidth;
        const paddingY = 0.2 * window.innerHeight;
        const node = {
            name: name,
            x: Math.random() * Math.random() * (window.innerWidth - 2 * paddingX) + paddingX,
            y: Math.random() * Math.random() * (window.innerHeight - 2 * paddingY) + paddingY
        }

        setNodes(prevState => ({
            ...prevState,
            [name]: node
        }));

        return true;
    } else {
        if (!nodes[name]) {
            showMessage("Vertex doesn't exist", 'error');
            return;
        }

        const newNodes = { ...nodes };
        delete newNodes[name];

        let newEdges = [];
        edges.forEach(edge => {
            if (edge.from !== name && edge.to !== name) {
                newEdges.push(edge);
            }
        });
        document.getElementById('node-name').value = '';
        setNodes(newNodes);
        setEdges(newEdges);
        showMessage("Deleted vertex '" + name + "' from graph.", 'success');
    }
};
export default nodeActionHandler;