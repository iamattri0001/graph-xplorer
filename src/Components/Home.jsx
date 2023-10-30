import { useState, useEffect, useRef } from "react";

import RightMenu from "./UI/RightMenu";
import Navbar from "./UI/Navbar";
import Graph from "./Graph";
import LeftMenu from "./UI/LeftMenu";
import ContextMenu from "./UI/ContextMenu";
import { useMediaQuery } from "react-responsive";
import MobilePrompt from "./UI/MobilePrompt";

const Home = () => {
  const [nodeSize, setNodeSize] = useState(1.5);
  const [isDirected, setIsDirected] = useState(false);
  const [isWeighted, setIsWeighted] = useState(false);

  const [weightFactor, setWeightFactor] = useState(1);

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);

  const contextMenuRef = useRef(null);

  const handleDocumentClick = (e) => {
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

  const isMobile = useMediaQuery({ query: "(max-width: 620px)" });
  return isMobile ? (
    <MobilePrompt />
  ) : (
    <div
      className="backdrop-blur-sm min-h-screen relative md:overflow-hidden flex select-none"
      onContextMenu={handleContextMenu}
    >
      <Navbar />

      <LeftMenu
        isDirected={isDirected}
        nodeSize={nodeSize}
        setNodeSize={setNodeSize}
        weightFactor={weightFactor}
        setWeightFactor={setWeightFactor}
      />

      <Graph
        isDirected={isDirected}
        isWeighted={isWeighted}
        nodeSize={nodeSize}
        weightFactor={weightFactor}
      />

      <RightMenu
        setIsDirected={setIsDirected}
        setIsWeighted={setIsWeighted}
        isDirected={isDirected}
        isWeighted={isWeighted}
        weightFactor={weightFactor}
      />

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
