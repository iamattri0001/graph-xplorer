import sequentialGlow from "./animations/sequentialGlow";

//utilities
const areSameEdges = (edgeElement, edge, isDirected) => {
  const edgeElementFrom = edgeElement.getAttribute("datafrom");
  const edgeElementTo = edgeElement.getAttribute("datato");

  if (edgeElementFrom === edge.from && edgeElementTo === edge.to) return true;
  else if (
    !isDirected &&
    edgeElementFrom === edge.to &&
    edgeElementTo === edge.from
  )
    return true;
  return false;
};

const areSameNodes = (nodeElement, node) => {
  const nodeName = nodeElement.getAttribute("dataname");
  return nodeName === node;
};

//animations
export const fadeEdges = (notToFade, isDirected, duration) => {
  const allEdges = Array.from(document.getElementsByClassName("edge"));
  let toFade = [];
  allEdges.forEach((edgeElement) => {
    let found = false;
    notToFade.forEach((edge) => {
      if (areSameEdges(edgeElement, edge, isDirected)) {
        found = true;
      }
    });
    if (!found) {
      toFade.push(edgeElement);
    } else {
      edgeElement.classList.add("stroke-selected");
    }
  });

  toFade.forEach((edgeElement) => {
    edgeElement.classList.add("fade");
  });

  if (duration) {
    setTimeout(() => {
      stopFadeEdges();
    }, duration);
  }
};

export const fadeNodes = (notToFade, duration) => {
  const allNodes = Array.from(document.getElementsByClassName("node"));
  let toFade = [];
  allNodes.forEach((nodeElement) => {
    let found = false;
    notToFade.forEach((node) => {
      if (areSameNodes(nodeElement, node)) {
        found = true;
      }
    });

    if (!found) {
      toFade.push(nodeElement);
    } else {
      nodeElement.classList.add("fill-visited");
    }
  });

  toFade.forEach((nodeElement) => {
    nodeElement.classList.add("fade");
  });

  if (duration) {
    setTimeout(() => {
      stopFadeNodes();
    }, duration);
  }
};

export const stopFadeNodes = () => {
  const allNodes = Array.from(document.getElementsByClassName("node"));
  allNodes.forEach((nodeElement) => {
    nodeElement.classList.remove("fade");
    nodeElement.classList.remove("fill-visited");
  });
};

export const stopFadeEdges = () => {
  const allEdges = Array.from(document.getElementsByClassName("edge"));
  allEdges.forEach((edgeElement) => {
    edgeElement.classList.remove("fade");
    edgeElement.classList.remove("stroke-selected");
  });
};

export const glowNodes = (sequence, delay) => {
  const allNodes = Array.from(document.querySelectorAll(".node"));
  const elementsSequence = [];
  sequence.forEach((node) => {
    allNodes.forEach((nodeElement) => {
      if (node === nodeElement.getAttribute("dataname")) {
        elementsSequence.push(nodeElement);
      }
    });
  });

  const animation = new sequentialGlow();
  animation.startAnimation(
    elementsSequence,
    delay,
    "fill-node",
    "fill-visited"
  );
  return animation;
};

export const stopGlow = (animation) => {
  animation?.nodesAnimation?.stopAnimation();
  animation?.edgesAnimation?.stopAnimation();
};

export const highlightPath = (sequence, delay = 2000, isDirected) => {
  let allEdges = Array.from(document.querySelectorAll(".edge"));
  let elementsSequence = [];
  sequence.forEach((edge) => {
    let found = false;
    allEdges.forEach((edgeElement) => {
      if (areSameEdges(edgeElement, edge, isDirected) && !found) {
        found = true;
        elementsSequence.push(edgeElement);
      }
    });
  });

  fadeEdges(elementsSequence);

  const animation = new sequentialGlow();
  animation.startAnimation(
    elementsSequence,
    delay,
    "stroke-edge",
    "stroke-path",
    delay
  );
  return animation;
};
