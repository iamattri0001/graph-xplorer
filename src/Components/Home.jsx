import React, { useState, useEffect } from 'react';

import RightMenu from './UI/RightMenu';
import Navbar from './UI/Navbar';
import Graph from './Graph';
import LeftMenu from './UI/LeftMenu';

const Home = ({ showMessage }) => {

    const [nodes, setNodes] = useState({});
    const [edges, setEdges] = useState([]);

    const [nodeSize, setNodeSize] = useState(1.5);

    const [isWeighted, setIsWeighted] = useState(false);
    const [isDirected, setIsDirected] = useState(false);

    const [weightFactor, setWeightFactor] = useState(1);

    useEffect(() => {
        if (localStorage.getItem('graph-working')) {
            const { nodes, edges } = JSON.parse(localStorage.getItem('graph-working'));
            setEdges(edges);
            setNodes(nodes);
        }
    }, []);

    return (
        <div className='bg-wedgewood-950 min-h-screen relative md:overflow-hidden flex'>
            <Navbar
                nodes={nodes}
                edges={edges}
                setEdges={setEdges}
                setNodes={setNodes}
                showMessage={showMessage}
                isDirected={isDirected}
            />


            <RightMenu
                setIsDirected={setIsDirected}
                setIsWeighted={setIsWeighted}
                isDirected={isDirected}
                isWeighted={isWeighted}
                nodes={nodes}
                setNodes={setNodes}
                setEdges={setEdges}
                edges={edges}
                showMessage={showMessage}
                weightFactor={weightFactor}
            />
            <Graph
                nodes={nodes}
                edges={edges}
                setNodes={setNodes}
                isDirected={isDirected}
                isWeighted={isWeighted}
                showMessage={showMessage}
                nodeSize={nodeSize}
                weightFactor={weightFactor}
            />

            <LeftMenu
                nodes={nodes}
                edges={edges}
                setEdges={setEdges}
                setNodes={setNodes}
                isDirected={isDirected}
                showMessage={showMessage}
                nodeSize={nodeSize}
                setNodeSize={setNodeSize}
                weightFactor={weightFactor}
                setWeightFactor={setWeightFactor}
            />
        </div >
    )
}

export default Home
