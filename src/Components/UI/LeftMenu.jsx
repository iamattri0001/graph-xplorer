import { useState, useEffect, useRef } from "react";
import { BsArrowBarRight } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";
import { ImUndo2, ImRedo2 } from "react-icons/im";

import nodeActionHandler from "../../utils/handlers/nodeActionHandler";
import edgeActionHandler from "../../utils/handlers/edgeActionHandler";

import { undoActions } from "../../utils/handlers/handleUndo";
import { redoActions } from "../../utils/handlers/handleRedo";

import { useGraph } from "../../contexts/GraphProvider";

const LeftMenu = ({
  isDirected,
  setNodeSize,
  nodeSize,
  weightFactor,
  setWeightFactor,
}) => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    getDeletedHistory,
    addHistory,
    getHistory,
  } = useGraph();

  const [isOpen, setIsOpen] = useState(true);

  const [nodeAction, setNodeAction] = useState("Add");
  const [edgeAction, setEdgeAction] = useState("Add");

  const handleLeftShiftDown = (event) => {
    if (event.shiftKey && event.code === "ShiftLeft") {
      setIsOpen((prevState) => !prevState);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleLeftShiftDown);

    return () => {
      window.removeEventListener("keydown", handleLeftShiftDown);
    };
  }, []);

  const handleEdgeAction = (event) => {
    event.preventDefault();
    edgeActionHandler(
      edgeAction,
      nodes,
      edges,
      setEdges,
      isDirected,
      null,
      null,
      addHistory
    );
  };

  const handleNodeAction = (event) => {
    event.preventDefault();
    nodeActionHandler(
      nodeAction,
      nodes,
      setNodes,
      edges,
      setEdges,
      null,
      addHistory
    );
  };

  const sourceInputRef = useRef(null);
  const destInputRef = useRef(null);
  const weightInputRef = useRef(null);

  const focusedRef = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (focusedRef.current === sourceInputRef.current) {
        focusedRef.current = destInputRef.current;
        destInputRef.current.focus();
      } else if (focusedRef.current === destInputRef.current) {
        focusedRef.current = weightInputRef.current;
        weightInputRef.current.focus();
      } else {
        focusedRef.current = sourceInputRef.current;
        sourceInputRef.current.focus();
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (focusedRef.current === sourceInputRef.current) {
        weightInputRef.current.focus();
        focusedRef.current = weightInputRef.current;
      } else if (focusedRef.current === destInputRef.current) {
        sourceInputRef.current.focus();
        focusedRef.current = sourceInputRef.current;
      } else {
        focusedRef.current = destInputRef.current;
        destInputRef.current.focus();
      }
    }
  };

  return (
    <>
      <div
        className={`floating-menu absolute h-screen flex items-center justify-center ${
          isOpen ? `left-5` : `left-[-194px]`
        } transition-all duration-200 gap-x-2`}
      >
        <div className=" text-wedgewood-50 flex flex-col items-center justify-center gap-y-5">
          <div className="bg-wedgewood-900 w-full py-4 flex flex-col gap-y-5 items-center justify-center rounded-md">
            <div className="flex flex-col w-full items-center justify-center gap-y-2">
              <span className="text-wedgewood-200 text-sm">Vertex Size</span>
              <input
                type="range"
                id="node-size-controller"
                max={2}
                min={1}
                step={0.1}
                onChange={(ev) => setNodeSize(ev.target.value)}
                value={nodeSize}
                className="appearance-none h-1 w-[75%] bg-gradient-to-r from-wedgewood-100 to-wedgewood-600 rounded-md outline-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col w-full items-center justify-center gap-y-2">
              <span className="text-wedgewood-200 text-sm">Weight Scale</span>
              <input
                type="range"
                id="weight-scale-controller"
                max={10}
                min={0.1}
                step={0.1}
                onChange={(ev) => setWeightFactor(ev.target.value)}
                value={weightFactor}
                title={`${weightFactor}x`}
                className="appearance-none h-1 w-[75%] bg-gradient-to-r from-wedgewood-100 to-wedgewood-600 rounded-md outline-none cursor-pointer"
              />
            </div>
          </div>

          <form
            className="flex items-center justify-center gap-y-2 flex-col bg-wedgewood-900 w-full px-5 py-3 rounded-md"
            onSubmit={(ev) => {
              ev.preventDefault();
            }}
          >
            <input
              type="text"
              id="node-name"
              placeholder="Name of the vertex"
              className="px-2 max-w-[160px] py-1 rounded-sm bg-transparent border-b-[1.5px] placeholder:text-sm placeholder:text-gray-400  border-wedgewood-950 focus:placeholder: outline-none focus:border-wedgewood-400"
              autoComplete="off"
            />
            <div className="flex items-center justify-center gap-x-2">
              <select
                id="node-action"
                value={nodeAction}
                onChange={(ev) => setNodeAction(ev.target.value)}
                className="bg-wedgewood-200 text-wedgewood-950 px-1 py-1 text-sm rounded-sm outline-none cursor-pointer w-full"
              >
                <option value="Add"> Add </option>
                <option value="Delete"> Delete </option>
              </select>
              <div>
                <button className="btn flex" onClick={handleNodeAction}>
                  <AiOutlineArrowRight className="inline text-lg" />
                </button>
              </div>
            </div>
          </form>

          <form className="flex items-center gap-y-2 flex-col bg-wedgewood-900 w-full px-5 py-3 rounded-md">
            <div className="flex items-center flex-col justify-center gap-x-3">
              <input
                type="text"
                id="edge-source"
                placeholder="Source"
                className="px-2 py-1 rounded-sm w-[128px] bg-transparent border-b-[1.5px] placeholder:text-sm border-wedgewood-950 placeholder:text-gray-400  outline-none focus:border-wedgewood-400"
                autoComplete="off"
                onKeyDown={handleKeyDown}
                ref={sourceInputRef}
                onClick={() => (focusedRef.current = sourceInputRef.current)}
              />

              <input
                type="text"
                id="edge-dest"
                placeholder="Destination"
                className="px-2 py-1 rounded-sm w-[128px] bg-transparent border-b-[1.5px] placeholder:text-sm border-wedgewood-950 placeholder:text-gray-400  outline-none focus:border-wedgewood-400"
                autoComplete="off"
                onKeyDown={handleKeyDown}
                ref={destInputRef}
                onClick={() => (focusedRef.current = destInputRef.current())}
              />

              <input
                type="text"
                id="edge-weight"
                placeholder="Weight (optional)"
                className={`px-2 py-1 rounded-sm w-[128px] bg-transparent border-b-[1.5px] placeholder:text-sm border-wedgewood-950 placeholder:text-gray-400  outline-none focus:border-wedgewood-400 ${
                  edgeAction === "Delete" ? "hidden" : ``
                }`}
                autoComplete="off"
                onKeyDown={handleKeyDown}
                ref={weightInputRef}
                onClick={() => (focusedRef.current = weightInputRef.current())}
              />
            </div>
            <div className="flex items-center justify-center gap-x-2">
              <select
                id="edge-action"
                value={edgeAction}
                onChange={(ev) => setEdgeAction(ev.target.value)}
                className="bg-wedgewood-200 text-wedgewood-950 px-1 py-1 text-sm outline-none cursor-pointer"
              >
                <option value="Add"> Add </option>
                <option value="Delete"> Delete </option>
              </select>

              <button className="btn" onClick={handleEdgeAction}>
                <AiOutlineArrowRight className="inline text-lg" />
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-x-4 bg-wedgewood-900 w-fit px-5 py-3 rounded-md">
            <button
              title="undo"
              className="text-3xl inline text-wedgewood-50 cursor-pointer hover:scale-110 transition-all hover:text-wedgewood-400"
              onClick={() => undoActions(setNodes, setEdges, getHistory)}
            >
              <ImUndo2 />
            </button>

            <button
              title="redo"
              className="text-3xl inline text-wedgewood-50 cursor-pointer hover:scale-110 transition-all hover:text-wedgewood-400"
              onClick={() => redoActions(setNodes, setEdges, getDeletedHistory)}
            >
              <ImRedo2 />
            </button>
          </div>
        </div>
        <div className="text-wedgewood-100 text-3xl cursor-pointer menu-switch">
          {isOpen ? (
            <IoCloseOutline onClick={() => setIsOpen(false)} />
          ) : (
            <BsArrowBarRight
              onClick={() => setIsOpen(true)}
              className="animate-drag-left"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
