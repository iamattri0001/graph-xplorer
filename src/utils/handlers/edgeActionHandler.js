import { showMessage } from "./showMessageHandler";

const edgeActionHandler = (
  edgeAction,
  nodes,
  edges,
  setEdges,
  isDirected,
  givenSrc,
  givenDest,
  addHistory
) => {
  let sourceName;
  if (givenSrc) {
    sourceName = givenSrc;
  } else {
    sourceName = document.getElementById("edge-source").value;
  }

  let destName;
  if (givenDest) {
    destName = givenDest;
  } else {
    destName = document.getElementById("edge-dest").value;
  }

  if (sourceName === "" || destName === "") {
    return;
  }

  if (edgeAction === "Add") {
    if (sourceName === destName) {
      showMessage(
        "Edge '" + sourceName + "' to '" + destName + "' causing Self loop",
        "error"
      );
      return;
    }
    const sourceNode = nodes[sourceName];
    const destNode = nodes[destName];

    if (!sourceNode) {
      showMessage(`'${sourceName}'  not presnt in graph`, "error");
      return;
    }

    if (!destNode) {
      showMessage(`'${destName}'  not presnt in graph`, "error");
      return;
    }
    const weightInput = document.getElementById("edge-weight").value;
    const weight = weightInput ? Number(weightInput) : null;
    if (weightInput !== "" && isNaN(weight)) {
      showMessage("Weight must be a number", "error");
      return;
    }

    if (weight && weight < 0) {
      showMessage("Weight must be positive", "error");
      return;
    }

    const edge = {
      from: sourceNode.name,
      to: destNode.name,
      weight: weight !== "" ? Number(weight) : null,
    };

    addHistory([["add", "edge", edge]]);
    setEdges([...edges, edge]);
    document.getElementById("edge-source").value = "";
    document.getElementById("edge-dest").value = "";
    document.getElementById("edge-weight").value = "";
    return true;
  } else {
    let newEdges = [];
    let toDelete = null;
    edges.forEach((edge) => {
      if (!isDirected) {
        if (
          (edge.from !== sourceName || edge.to !== destName) &&
          (edge.from !== destName || edge.to !== sourceName)
        ) {
          newEdges.push(edge);
        } else {
          toDelete = edge;
        }
      } else {
        if (edge.from !== sourceName || edge.to !== destName) {
          newEdges.push(edge);
        } else {
          toDelete = edge;
        }
      }
    });

    if (newEdges.length === edges.length) {
      showMessage("Edge doesn't exist", "error");
    } else {
      showMessage("Edge deleted", "success");
      setEdges(newEdges);
      addHistory([["delete", "edge", toDelete]]);
      document.getElementById("edge-source").value = "";
      document.getElementById("edge-dest").value = "";
    }
  }
};

export default edgeActionHandler;
