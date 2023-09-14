import nodeActionHandler from "./nodeActionHandler";

import { showMessage } from "./showMessageHandler";

const textInputHandler = (
  data,
  nodes,
  setNodes,
  setEdges,
  setIsDirected,
  resetHistory
) => {
  const showInvalidInput = () => {
    showMessage("Invalid Input", "error");
    return;
  };

  const isDirected = document.getElementById("is-directed").checked
    ? true
    : false;

  data = data.trim();
  const lines = data.split("\n");

  const numbersArray = lines.flatMap((line) =>
    line.split(" ").map((numberStr) => Number(numberStr.trim()))
  );

  if (numbersArray.length < 2) {
    showInvalidInput();
    return;
  }

  if (
    numbersArray[1] >
    (numbersArray[0] * (numbersArray[0] - 1)) / (isDirected ? 1 : 2)
  ) {
    showInvalidInput();
    return;
  }

  for (let i = 0; i < numbersArray.length; i++) {
    if (isNaN(numbersArray[i])) {
      showInvalidInput();
      return;
    }
  }

  if (numbersArray.length < 2 * numbersArray[1] + 2) {
    showMessage("Incomplete Input", "error");
    return;
  }

  for (let i = 2; i < numbersArray.length; i++) {
    if (numbersArray[i] > numbersArray[0]) {
      showInvalidInput();
      return;
    }
  }

  setNodes({});
  setEdges([]);

  showMessage("Please wait..", "loading", 2000);

  setTimeout(() => {
    setIsDirected(isDirected);

    for (let i = 1; i <= numbersArray[0]; i++) {
      let result = nodeActionHandler(
        "Add",
        nodes,
        setNodes,
        [],
        setEdges,
        String(i)
      );
      if (!result) {
        setEdges([]);
        setNodes({});
        return;
      }
    }

    let newEdges = [];
    for (let i = 2; i < numbersArray.length; i += 2) {
      if (
        numbersArray[i] <= numbersArray[0] &&
        numbersArray[i + 1] <= numbersArray[0] &&
        numbersArray[i] > 0 &&
        numbersArray[i + 1] > 0
      ) {
        const edge = {
          from: String(numbersArray[i]),
          to: String(numbersArray[i + 1]),
        };
        newEdges.push(edge);
      } else {
        showInvalidInput();
        setNodes({});
        return;
      }
    }

    setEdges(newEdges);
    showMessage("Graph Created", "success");
  }, 2000);
  resetHistory();
};

export default textInputHandler;
