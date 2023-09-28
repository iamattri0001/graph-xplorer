import { useGraph } from "../../contexts/GraphProvider";
import Arrow from "./Arrow";

const Edge = ({ from, to, edge, nodeSize }) => {
  const { isWeighted, isDirected } = useGraph();
  // Calculate the midpoint for the text element
  const textX = (from.x + to.x) / 2 + 5;
  const textY = (from.y + to.y) / 2 - 10;

  return (
    <g className="edge stroke-edge" datafrom={edge.from} datato={edge.to}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x} // Calculate the new x2 based on the translation
        y2={to.y} // Calculate the new y2 based on the translation
        strokeWidth={1.3}
      />

      {isWeighted && (
        <text
          className="stroke-none fill-wedgewood-50 text-md transition-all duration-700"
          x={textX}
          y={textY}
        >
          {edge.weight ? (
            <>{edge.weight}</>
          ) : (
            Math.ceil(
              Math.sqrt(
                Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)
              ) / 10
            )
          )}
        </text>
      )}

      {isDirected && <Arrow from={from} to={to} nodeSize={nodeSize} />}
    </g>
  );
};

export default Edge;
