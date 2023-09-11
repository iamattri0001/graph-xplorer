import React, { useState, useEffect } from 'react';

import RightMenu from './UI/RightMenu';
import Navbar from './UI/Navbar';
import Graph from './Graph';
import LeftMenu from './UI/LeftMenu';

const Home = ({ showMessage }) => {

    const [nodeSize, setNodeSize] = useState(1.5);
    const [isDirected, setIsDirected] = useState(false);
    const [isWeighted, setIsWeighted] = useState(false);

    const [weightFactor, setWeightFactor] = useState(1);

    return (
        <div className='bg-wedgewood-950 min-h-screen relative md:overflow-hidden flex'>
            <Navbar />

            <LeftMenu
                isDirected={isDirected}
                showMessage={showMessage}
                nodeSize={nodeSize}
                setNodeSize={setNodeSize}
                weightFactor={weightFactor}
                setWeightFactor={setWeightFactor}
            />

            <Graph
                isDirected={isDirected}
                isWeighted={isWeighted}
                showMessage={showMessage}
                nodeSize={nodeSize}
                weightFactor={weightFactor}
            />

            <RightMenu
                setIsDirected={setIsDirected}
                setIsWeighted={setIsWeighted}
                isDirected={isDirected}
                isWeighted={isWeighted}
                showMessage={showMessage}
                weightFactor={weightFactor}
            />

        </div>
    );
};

export default Home;
