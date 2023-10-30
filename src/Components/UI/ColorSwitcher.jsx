import React, { useState } from "react";
import Modal from "./Modal";
import { useGraph } from "../../contexts/GraphProvider";

const ColorSwitcher = ({ openOrClose, openCloseHandler, name }) => {
  if (!openOrClose) return null;
  const { setNodes } = useGraph();
  const [value, setValue] = useState("#111");
  return (
    <Modal openOrClose={true} openCloseHandler={openCloseHandler}>
      <div className="bg-wedgewood-400 h-[180px] w-[220px] rounded flex items-center justify-center flex-col gap-y-3">
        <h3>Pick a color and click apply</h3>
        <input
          type="color"
          className="w-9 h-9 rounded-full p-0"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          className="btn"
          onClick={() => {
            setNodes((prevState) => {
              const newNode = { ...prevState[name], color: value };
              let newState = { ...prevState, [name]: newNode };
              console.log(newNode);
              return newState;
            });
            openCloseHandler(false);
          }}
        >
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default ColorSwitcher;
