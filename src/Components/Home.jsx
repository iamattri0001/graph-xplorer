import React, { useState, useEffect } from 'react';

import RightMenu from './RightMenu';
import Navbar from './Navbar';
import Graph from './Graph';
import Help from './Help';
import Modal from './Modal';
import TextInputMenu from './TextInputMenu';
import LeftMenu from './LeftMenu';

const Home = ({ showMessage }) => {

    const [nodes, setNodes] = useState({});

    const [nodeSize, setNodeSize] = useState(2);

    const [edges, setEdges] = useState([]);

    const [isWeighted, setIsWeighted] = useState(false);
    const [isDirected, setIsDirected] = useState(false);

    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const [inputMenuOpen, setInputMenuOpen] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('graph')) {
            const { nodes, edges } = JSON.parse(localStorage.getItem('graph'));
            setEdges(edges);
            setNodes(nodes);
        }
    }, []);

    const handleResetGraph = () => {
        localStorage.removeItem('graph');
        setEdges([]);
        setNodes({});
        showMessage('Graph has been reset', 'success');
    }
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
                edges={edges}
                showMessage={showMessage}
                handleResetGraph={handleResetGraph}
                setIsHelpOpen={setIsHelpOpen}
                setInputMenuOpen={setInputMenuOpen}
            />
            <Graph
                nodes={nodes}
                edges={edges}
                setNodes={setNodes}
                isDirected={isDirected}
                isWeighted={isWeighted}
                showMessage={showMessage}
                nodeSize={nodeSize}
            />

            <LeftMenu
                nodes={nodes}
                edges={edges}
                setEdges={setEdges}
                setNodes={setNodes}
                isDirected={isDirected}
                showMessage={showMessage}
                setNodeSize={setNodeSize}
            />
            {isHelpOpen &&
                <Modal openCloseHandler={setIsHelpOpen} openOrClose={isHelpOpen}>
                    <Help />
                </Modal>
            }

            {inputMenuOpen &&
                <Modal openCloseHandler={setInputMenuOpen} openOrClose={inputMenuOpen}>
                    <TextInputMenu
                        nodes={nodes}
                        setNodes={setNodes}
                        edges={edges}
                        setEdges={setEdges}
                        setIsDirected={setIsDirected}
                        showMessage={showMessage} />
                </Modal>}

            <Modal />
        </div >
    )
}

export default Home