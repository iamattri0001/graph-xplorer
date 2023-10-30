import { useEffect, useState, useRef } from "react";
import Node from "./Graph/Node";
import Edge from "./Graph/Edge";
import { useGraph } from "../contexts/GraphProvider";
import NodeContextMenu from "./UI/NodeContextMenu";

const Graph = ({ isDirected, isWeighted, nodeSize, weightFactor }) => {
  const { nodes, setNodes, edges, setEdges } = useGraph();
  const handlePositionChange = (name, x, y) => {
    const node = nodes[name];
    if (node) {
      x = Math.max(x, 40);
      x = Math.min(x, window.innerWidth - 25);

      y = Math.max(80, y);
      y = Math.min(y, window.innerHeight - 25);

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

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);
  const [contextTarget, setContextTarget] = useState(null);

  const handleContextMenu = (e, target) => {
    e.preventDefault();
    console.log(target);
    setContextTarget(target);
    setContextMenuX(e.pageX);
    setContextMenuY(e.pageY);
    setContextMenuVisible(true);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  const contextMenuRef = useRef(null);
  const handleDocumentClick = (e) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
      handleCloseContextMenu();
    }
  };

  useEffect(() => {
    if (contextMenuVisible) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [contextMenuVisible]);

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
              handleContextMenu={handleContextMenu}
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
      <div ref={contextMenuRef}>
        <NodeContextMenu
          name={contextTarget}
          visible={contextMenuVisible}
          x={contextMenuX}
          y={contextMenuY}
          onClose={handleCloseContextMenu}
        />
      </div>
    </div>
  );
};

export default Graph;
