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

    const [deletedHistory, setDeletedHistory] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('graph-working')) {
            const { nodes, edges } = JSON.parse(localStorage.getItem('graph-working'));
            setEdges(edges);
            setNodes(nodes);
        }
    }, []);
    
    const addHistory = (action) => {
        setHistory(prevState => {
            let newHistory = [...prevState];

            while (newHistory.length > 20) {
                newHistory.shift();
            }

            newHistory.push(action);

            return newHistory;
        });
    }

    const getHistory = () => {
        if (history.length === 0) {
            return null;
        } else {
            let lastAction = history[history.length - 1];
            setHistory(prevState => {
                let newHistory = [...prevState];
                newHistory.pop();
                return newHistory;
            });
            addDeletedHistory(lastAction);
            return lastAction;
        }
    }

    const resetHistory = () => {
        setHistory([]);
        setDeletedHistory([]);
    }

    const addDeletedHistory = (action) => {
        setDeletedHistory(prevState => {
            let newDeletedHistory = [...prevState];

            while (newDeletedHistory.length > 20) {
                newDeletedHistory.shift();
            }
            newDeletedHistory.push(action);

            return newDeletedHistory;
        });
    }

    const getDeletedHistory = () => {
        if (deletedHistory.length === 0) {
            return null;
        } else {
            let lastAction = deletedHistory[deletedHistory.length - 1];
            setDeletedHistory(prevState => {
                let newDeletedHistory = [...prevState];
                newDeletedHistory.pop();
                return newDeletedHistory;
            });
            addHistory(lastAction);
            return lastAction;
        }
    }


    return (
        <div className='bg-wedgewood-950 min-h-screen relative md:overflow-hidden flex'>
            <Navbar />


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
                addDeletedHistory={addDeletedHistory}
                getDeletedHistory={getDeletedHistory}
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
                addHistory={addHistory}
                resetHistory={resetHistory}
            />

        </div>
    );
};

export default Home;
