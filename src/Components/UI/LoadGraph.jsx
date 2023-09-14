import React from "react";
import Modal from "./Modal";
import { loadGraphHandler } from "../../utils/handlers/graphHandler";

import { showMessage } from "../../utils/handlers/showMessageHandler";

const LoadGraph = ({
  setIsLoadOpen,
  isLoadOpen,
  setEdges,
  setNodes,
  allGraphs,
  resetHistory,
}) => {
  return (
    <Modal openCloseHandler={setIsLoadOpen} openOrClose={isLoadOpen}>
      <form
        className="bg-wedgewood-500 w-[16rem] h-[6rem] rounded-md flex items-center justify-center gap-x-2"
        onSubmit={(ev) => {
          ev.preventDefault();
          resetHistory();
          loadGraphHandler(
            setNodes,
            setEdges,
            document.getElementById("selected-name").value,
            allGraphs
          );

          showMessage("Graph Loaded!", "success");
          setIsLoadOpen(false);
        }}
      >
        <select
          className="bg-wedgewood-200 text-wedgewood-950 w-[116px] px-1 py-1 outline-none text-sm cursor-pointer rounded-md"
          id="selected-name"
        >
          {allGraphs.map((graph, i) => {
            return (
              <option key={i} value={graph.name}>
                {graph.name.toUpperCase()}
              </option>
            );
          })}
        </select>

        <button className="btn">Load</button>
      </form>
    </Modal>
  );
};

export default LoadGraph;
