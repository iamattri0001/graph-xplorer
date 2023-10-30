import React, { useState } from "react";
import ColorSwitcher from "./ColorSwitcher";

const NodeContextMenu = ({ visible, x, y, onClose, name }) => {
  if (!visible || !name) return null;
  const style = {
    position: "absolute",
    top: `${y}px`,
    left: `${x}px`,
    zIndex: 1000,
  };

  const menuOptionClasses =
    "cursor-pointer hover:bg-wedgewood-600 transition-all w-full px-4";

  const disabledOptionClasses = "cursor-not-allowed w-full px-4 text-gray-500";

  const [colorSwitchOpen, setColorSwitchOpen] = useState(false);

  return (
    <div
      style={style}
      className="bg-wedgewood-800 pt-1 pb-2 rounded select-none flex items-center justify-center border border-wedgewood-300 shadow-wedgewood-400"
    >
      <div className="flex flex-col text-wedgewood-50">
        <div className={menuOptionClasses}>Change Name</div>
        <div
          className={menuOptionClasses}
          onClick={() => setColorSwitchOpen(true)}
        >
          Change Color
        </div>
      </div>

      <ColorSwitcher
        name={name}
        openOrClose={colorSwitchOpen}
        openCloseHandler={setColorSwitchOpen}
      />
    </div>
  );
};

export default NodeContextMenu;
