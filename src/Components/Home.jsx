import React, { useState, useEffect } from 'react';

import RightMenu from './UI/RightMenu';
import Navbar from './UI/Navbar';
import Graph from './Graph';
import LeftMenu from './UI/LeftMenu';

const MemoizedRightMenu = React.memo(RightMenu);
const MemoizedGraph = React.memo(Graph);
const MemoizedLeftMenu = React.memo(LeftMenu);

const Home = ({ showMessage }) => {
    const [nodes, setNodes] = useState({});
    const [edges, setEdges] = useState([]);

    const [nodeSize, setNodeSize] = useState(1.5);

    const [isWeighted, setIsWeighted] = useState(false);
    const [isDirected, setIsDirected] = useState(false);

    const [weightFactor, setWeightFactor] = useState(1);

    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('graph-working')) {
            const { nodes, edges } = JSON.parse(localStorage.getItem('graph-working'));
            setEdges(edges);
            setNodes(nodes);
        }
    }, []);

    const addHistory = (action) => {
        if (history.length < 20) {
            setHistory([...history, action]);
        } else {
            let newHistory = history;
            while (newHistory.length > 20) {
                newHistory.shift();
            }
            newHistory.push(action);
        }
    }

    const getHistory = () => {
        if (history.length === 0) {
            return null;
        } else {
            let lastAction = history[history.length - 1];
            let newHistory = history;
            newHistory.pop();
            setHistory(newHistory);
            return lastAction;
        }
    }
    
    const resetHistory = () => {
        setHistory([]);
    }

    return (
        <div className='bg-wedgewood-950 min-h-screen relative md:overflow-hidden flex'>
            <Navbar />

            <MemoizedRightMenu
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

            <MemoizedGraph
                nodes={nodes}
                edges={edges}
                setNodes={setNodes}
                isDirected={isDirected}
                isWeighted={isWeighted}
                showMessage={showMessage}
                nodeSize={nodeSize}
                weightFactor={weightFactor}
            />

            <MemoizedLeftMenu
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
                addHistory={addHistory}
                getHistory={getHistory}
                resetHistory={resetHistory}
            />
        </div>
    );
};

export default Home;
