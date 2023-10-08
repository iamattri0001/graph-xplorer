import { useEffect } from "react";
import Node from "./Graph/Node";
import Edge from "./Graph/Edge";
import { useGraph } from "../contexts/GraphProvider";

const Graph = ({ isDirected, isWeighted, nodeSize, weightFactor }) => {
  const { nodes, setNodes, edges, setEdges } = useGraph();
  const handlePositionChange = (name, x, y) => {
    const node = nodes[name];
    if (node) {
      x = Math.max(x, 40);
      x = Math.min(x, window.innerWidth - 25);

      y = Math.max(80, y);
      y = Math.min(y, window.innerHeight - 25);
      // if (x < 40) {
      //   x = 40;
      // } else if (x >= window.innerWidth - 25) {
      //   x = window.innerWidth - 25;
      // }

      // if (y < 80) {
      //   y = 80;
      // } else if (y >= window.innerHeight - 25) {
      //   y = window.innerHeight - 25;
      // }

      node.x = x;
      node.y = y;

      setNodes((prevState) => ({
        ...prevState,
        [name]: node,
      }));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("graph-working")) {
      const { nodes, edges } = JSON.parse(
        localStorage.getItem("graph-working")
      );
      setEdges(edges);
      setNodes(nodes);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(nodes).length) {
      localStorage.setItem(
        "graph-working",
        JSON.stringify({
          nodes,
          edges,
        })
      );
    }
  }, [nodes, edges]);

  return (
    <div className="flex-grow w-screen">
      <svg className="h-full w-full select-none">
        <g>
          {edges.map((edge, i) => (
            <Edge
              key={i}
              from={{ x: nodes[edge.from].x, y: nodes[edge.from].y }}
              to={{ x: nodes[edge.to].x, y: nodes[edge.to].y }}
              isWeighted={isWeighted}
              isDirected={isDirected}
              nodeSize={nodeSize}
              weightfactor={weightFactor}
              edge={edge}
            />
          ))}

          {Object.entries(nodes).map(([name, node]) => (
            <Node
              key={name}
              name={name}
              x={node.x}
              y={node.y}
              handlePositionChange={handlePositionChange}
              nodeSize={nodeSize}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Graph;
