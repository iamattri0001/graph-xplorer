import React, { useState, useEffect } from 'react';

import RightMenu from './UI/RightMenu';
import Navbar from './UI/Navbar';
import Graph from './Graph';
import LeftMenu from './UI/LeftMenu';
import ContextMenu from './UI/ContextMenu';

const Home = () => {

    const [nodeSize, setNodeSize] = useState(1.5);
    const [isDirected, setIsDirected] = useState(false);
    const [isWeighted, setIsWeighted] = useState(false);

    const [weightFactor, setWeightFactor] = useState(1);

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuX, setContextMenuX] = useState(0);
    const [contextMenuY, setContextMenuY] = useState(0);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenuX(e.pageX);
        setContextMenuY(e.pageY);
        setContextMenuVisible(true);
    }

    const handleCloseContextMenu = () => {
        setContextMenuVisible(false);
    };

    return (
        <div
            className='bg-wedgewood-950 min-h-screen relative md:overflow-hidden flex'
            onContextMenu={handleContextMenu}>
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

            <ContextMenu visible={contextMenuVisible} x={contextMenuX} y={contextMenuY} onClose={handleCloseContextMenu} />

        </div>
    );
};

export default Home;
