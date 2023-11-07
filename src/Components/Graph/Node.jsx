import React, { useState, useEffect } from "react";
import { getTransformStyles, duration } from "../../utils/animations/transform";
import nodeActionHandler from "../../utils/handlers/nodeActionHandler";

import { AiOutlineDelete } from "react-icons/ai";
import { useGraph } from "../../contexts/GraphProvider";

const Node = ({ name, x, y, handlePositionChange, nodeSize }) => {
  const { nodes, edges, setEdges, setNodes, addHistory } = useGraph();

  const [isDragging, setIsDragging] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(duration.slow);

  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const deleteIconCordinates = {
    x: window.innerWidth * 0.85,
    y: window.innerHeight * 0.9,
  };
  const handleMouseDown = () => {
    setIsDragging(true);
    setTransitionDuration(duration.fast);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDragging) return;

      const newX = event.clientX;
      const newY = event.clientY;

      const dist = Math.sqrt(
        Math.pow(newX - deleteIconCordinates.x, 2) +
          Math.pow(newY - deleteIconCordinates.y, 2)
      );

      if (dist <= 40) {
        setIsDeleteActive(true);
      } else {
        setIsDeleteActive(false);
      }

      handlePositionChange(name, newX, newY);
    };

    const handleMouseUp = (event) => {
      // event.preventDefault();

      if (isDeleteActive) {
        nodeActionHandler(
          "Delete",
          nodes,
          setNodes,
          edges,
          setEdges,
          name,
          addHistory
        );
      }

      setIsDragging(false);
      setTransitionDuration(duration.slow);
    };

    const handleTouchMove = (event) => {
      // event.preventDefault();
      if (!isDragging) return;

      if (event.touches) {
        setTransitionDuration(duration.fast);
        const touch = event.touches[0];
        const newX = touch.clientX;
        const newY = touch.clientY;

        const dist = Math.sqrt(
          Math.pow(newX - deleteIconCordinates.x, 2) +
            Math.pow(newY - deleteIconCordinates.y, 2)
        );

        if (dist <= 30) {
          setIsDeleteActive(true);
        } else {
          setIsDeleteActive(false);
        }

        handlePositionChange(name, newX, newY);
      }
      // setTransitionDuration(duration.slow);
    };

    const handleTouchEnd = (event) => {
      // event.preventDefault();
      setTransitionDuration(duration.slow);
      if (isDeleteActive) {
        nodeActionHandler(
          "Delete",
          nodes,
          setNodes,
          edges,
          setEdges,
          name,
          addHistory
        );
      }
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("mouseup", handleMouseUp, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, name, handlePositionChange]);

  const transformStyles = getTransformStyles(x, y, transitionDuration);

  return (
    <g
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      className="text-dark"
    >
      {isDragging && (
        <g>
          <circle
            cx={deleteIconCordinates.x}
            cy={deleteIconCordinates.y}
            r={isDeleteActive ? 45 : 30}
            strokeWidth={1.4}
            className={`transition-all ${
              isDeleteActive
                ? `stroke-transparent fill-wedgewood-400`
                : `stroke-white fill-transparent `
            }`}
          />
          <g
            transform={`translate(${deleteIconCordinates.x - 20}, ${
              deleteIconCordinates.y - 20
            })`}
          >
            <AiOutlineDelete size={40} className="text-wedgewood-50" />
          </g>
        </g>
      )}

      <circle
        id={name}
        className={`node fill-node stroke-wedgewood-100 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } `}
        r={14 * nodeSize}
        strokeWidth={1.5}
        dataname={name}
        style={{
          ...transformStyles,
        }}
      />
      <text
        className={`absolute ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ ...transformStyles }}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        fontSize="16"
      >
        {name.slice(0, 4)}
      </text>
    </g>
  );
};

export default Node;
