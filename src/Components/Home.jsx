import { useState, useEffect, useRef } from "react";

import RightMenu from "./UI/RightMenu";
import Navbar from "./UI/Navbar";
import Graph from "./Graph";
import LeftMenu from "./UI/LeftMenu";
import ContextMenu from "./UI/ContextMenu";

const Home = () => {
  const [nodeSize, setNodeSize] = useState(1.5);

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);

  const contextMenuRef = useRef(null);

  // Function to handle clicks anywhere on the document
  const handleDocumentClick = (e) => {
    // Check if the click occurred outside of the context menu
    if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
      handleCloseContextMenu();
    }
  };

  useEffect(() => {
    // Add a click event listener to the document when the context menu is visible
    if (contextMenuVisible) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      // Remove the event listener when the context menu is not visible
      document.removeEventListener("click", handleDocumentClick);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [contextMenuVisible]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuX(e.pageX);
    setContextMenuY(e.pageY);
    setContextMenuVisible(true);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  return (
    <div
      className="bg-wedgewood-950 min-h-screen relative md:overflow-hidden flex"
      onContextMenu={handleContextMenu}
    >
      <Navbar />

      <LeftMenu nodeSize={nodeSize} setNodeSize={setNodeSize} />

      <Graph nodeSize={nodeSize} />

      <RightMenu />

      <div ref={contextMenuRef}>
        <ContextMenu
          visible={contextMenuVisible}
          x={contextMenuX}
          y={contextMenuY}
          onClose={handleCloseContextMenu}
        />
      </div>
    </div>
  );
};

export default Home;
