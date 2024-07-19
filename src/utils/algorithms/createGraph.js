export const createUnweightedGraph = (nodes, edges, isDirected) => {
  let list = {};

  Object.keys(nodes).forEach((node) => {
    list[node] = [];
  });

  edges.forEach((edge) => {
    list[edge.from].push(edge.to);
    if (!isDirected) list[edge.to].push(edge.from);
  });

  Object.keys(list).forEach((node) => (list[node] = [...new Set(list[node])]));

  return list;
};

export const createWeightedGraph = (
  nodes,
  edges,
  isDirected,
  weightFactor = 1
) => {
  let list = {};
  Object.keys(nodes).forEach((node) => {
    list[node] = [];
  });

  edges.forEach((edge) => {
    console.log(edge);
    const { from, to } = edge;
    const fromNode = nodes[from];
    const toNode = nodes[to];

    const weight = edge.weight || Math.ceil(
      (Math.sqrt(
        Math.pow(fromNode.x - toNode.x, 2) + Math.pow(fromNode.y - toNode.y, 2)
      ) /
        10) *
        weightFactor
    );

    list[from].push([to, weight]);

    if (!isDirected) {
      list[to].push([from, weight]);
    }
  });

  Object.keys(list).forEach((node) => (list[node] = [...new Set(list[node])]));

  return list;
};
