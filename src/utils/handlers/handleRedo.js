export const redoActions = (setNodes, setEdges, getDeletedHistory) => {
  const deletedHistory = getDeletedHistory();
  if (!deletedHistory) {
    return;
  }

  deletedHistory.forEach((action) => {
    if (action[0] === "add") {
      if (action[1] === "node") {
        setNodes((prevState) => ({
          ...prevState,
          [action[2].name]: action[2],
        }));
      } else if (action[1] === "edge") {
        setEdges((prevState) => {
          let newEdges = [...prevState];
          newEdges.push(action[2]);
          return newEdges;
        });
      }
    } else if (action[0] === "delete") {
      if (action[1] === "node") {
        setNodes((prevState) => {
          const newNodes = { ...prevState };
          delete newNodes[action[2].name];
          return newNodes;
        });
      } else if (action[1] === "edge") {
        setEdges((prevState) => {
          let newEdges = prevState.filter((edge) => edge != action[2]);
          return newEdges;
        });
      }
    }
  });
};
