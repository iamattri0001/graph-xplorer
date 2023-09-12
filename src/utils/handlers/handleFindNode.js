import { showMessage } from "./showMessageHandler"

export const findNode = (nodes, setNodes, name, x, y) => {
    if (!nodes[name]) {
        showMessage(`Vertex '${name}' doesn't exist`, 'error');
        return;
    }
    
    setNodes((prevState) => {
        let newNodes = { ...prevState };
        newNodes[name].x = x;
        newNodes[name].y = y;
        return newNodes;
    });

}