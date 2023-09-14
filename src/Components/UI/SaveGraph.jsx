import React, { useRef, useEffect } from "react";
import Modal from "./Modal";
import { saveGraphHandler } from "../../utils/handlers/graphHandler";
import { showMessage } from "../../utils/handlers/showMessageHandler";

const SaveGraph = ({ setIsSaveOpen, isSaveOpen, nodes, edges, allGraphs }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal openCloseHandler={setIsSaveOpen} openOrClose={isSaveOpen}>
      <div className="w-[20rem] h-[8rem] bg-wedgewood-400 rounded-md px-4 py-2 flex items-center justify-center">
        <form
          className="flex items-center justify-center gap-x-2"
          onSubmit={(ev) => {
            ev.preventDefault();
            const name = inputRef.current.value;
            if (name === "") {
              showMessage("Provide a name!", "error");
              return;
            }
            saveGraphHandler(nodes, edges, name, allGraphs);
            showMessage("Saved!", "success");
            setIsSaveOpen(false);
          }}
        >
          <input
            type="text"
            id="graph-name"
            className="bg-transparent outline-none border-b-[1px] border-wedgewood-950 placeholder-wedgewood-600 text-wedgewood-950 px-2"
            placeholder="Name of the graph"
            autoComplete="off"
            ref={inputRef}
          />
          <button className="btn">Save</button>
        </form>
      </div>
    </Modal>
  );
};

export default SaveGraph;
