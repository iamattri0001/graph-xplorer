import { useEffect, useRef } from "react";
import textInputHandler from "./../../utils/handlers/textInputHandler";
import { useGraph } from "../../contexts/GraphProvider";

const TextInputMenu = ({ setIsDirected, setIsWeighted }) => {
  const { nodes, setNodes, setEdges, resetHistory } = useGraph();

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleBuild = (event) => {
    event.preventDefault();
    const data = document.getElementById("input-data").value;
    if (data !== "")
      textInputHandler(
        data,
        nodes,
        setNodes,
        setEdges,
        setIsDirected,
        setIsWeighted,
        resetHistory
      );
  };
  return (
    <div className="bg-wedgewood-400 px-4 py-7 flex flex-col items-center justify-center gap-y-3 rounded-md h-[380px]">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl">Input Format</h1>
        <p>
          Firt line contains 2 space-separated positive integers: number of
          vertices n and number of edges m
        </p>
        <p>{}</p>
      </div>

      <form className="flex items-center gap-x-5 justify-center h-full">
        <textarea
          ref={inputRef}
          id="input-data"
          cols={50}
          rows={8}
          className="bg-wedgewood-200 border border-wedgewood-500 px-2 py-1 resize-none focus:outline-wedgewood-950"
        />

        <div className="flex flex-col items-center justify-center gap-y-4 text-sm">
          <select>
            <option value="undirected">Undirected</option>
            <option value="directed">Directed</option>
          </select>
          <select
            value={setIsWeighted ? "weighted" : "unweighted"}
            onChange={(ev) => {
              if (ev.target.value === "weighted") setIsWeighted(true);
              else setIsWeighted(false);
            }}
          >
            <option value="unweighted">Unweighted</option>
            <option value="weighted">Weighted</option>
          </select>
          <div className="flex items-center justify-center gap-x-2">
            <button className="btn" onClick={handleBuild}>
              Build
            </button>
            <button
              className="btn"
              onClick={(event) => {
                document.getElementById("input-data").value = "";
                event.preventDefault();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TextInputMenu;
