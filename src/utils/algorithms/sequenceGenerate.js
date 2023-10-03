//works only for DFS like algorithms (explore depth-wise)
export const createEdgeSeq = (adjList, nodeSeq) => {
  let edgeSeq = [];
  nodeSeq.forEach((node, i) => {
    for (let j = i - 1; j >= 0; j--) {
      let flag = false;
      for (let k = 0; k < adjList[nodeSeq[j]].length; k++) {
        if (adjList[nodeSeq[j]][k] == node) {
          edgeSeq.push({ from: nodeSeq[j], to: String(node) });
          flag = true;
          break;
        }
      }
      if (flag) break;
    }
  });
  return edgeSeq;
};
