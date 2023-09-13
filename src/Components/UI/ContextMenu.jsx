import { useState } from 'react';

import { useGraph } from '../../contexts/GraphProvider';

import { randomizeGraphHandler, resetGraphHandler } from '../../utils/handlers/graphHandler';

import SaveGraph from './SaveGraph';
import LoadGraph from './LoadGraph';
import DeleteGraph from './DeleteGraph';
import FindNodeMenu from './FindNodeMenu';


const ContextMenu = ({ visible, x, y, onClose }) => {
    if (!visible) return null;

    const { nodes, setNodes, edges, setEdges, resetHistory } = useGraph();

    const style = {
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        zIndex: 1000,
    };

    const [isSaveOpen, setIsSaveOpen] = useState(false);
    const [isLoadOpen, setIsLoadOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [findOpen, setFindOpen] = useState(false);

    const allGraphs = localStorage.getItem('saved-graphs') ? JSON.parse(localStorage.getItem('saved-graphs')) : [];

    const menuOptionClasses = 'cursor-pointer hover:bg-wedgewood-600 transition-all w-full px-4';

    const disabledOptionClasses = 'cursor-not-allowed w-full px-4 text-gray-400';

    return (
        <div id='context-menu' style={style} className='bg-wedgewood-800 pt-1 pb-2 rounded select-none flex items-center justify-center border border-wedgewood-300 shadow-wedgewood-400'>

            <div className='flex flex-col text-wedgewood-50'>

                <div onClick={() => {
                    onClose();
                    randomizeGraphHandler(nodes, setNodes);
                }} className={menuOptionClasses}>Randomize</div>


                <div onClick={(e) => {
                    setFindOpen(true);
                }} className={menuOptionClasses}>Find Vertex</div>


                <div onClick={() => {
                    setIsSaveOpen(true);
                }} className={menuOptionClasses}>Save Graph</div>


                <div onClick={() => {
                    resetGraphHandler(setNodes, setEdges);
                    onClose();
                }} className={menuOptionClasses}>Reset Graph</div>


                <div onClick={() => { setIsLoadOpen(true) }}
                    className={allGraphs.length ? menuOptionClasses : disabledOptionClasses}>
                    Load saved Graphs
                </div>

                <div onClick={() => { setIsDeleteOpen(true) }}
                    className={allGraphs.length ? menuOptionClasses : disabledOptionClasses}>
                    Delete saved graphs
                </div>


            </div>

            {isSaveOpen && <SaveGraph
                setIsSaveOpen={setIsSaveOpen}
                isSaveOpen={isSaveOpen}
                allGraphs={allGraphs}
                nodes={nodes}
                edges={edges}
            />}

            {isLoadOpen && allGraphs.length && <LoadGraph
                setEdges={setEdges}
                setNodes={setNodes}
                setIsLoadOpen={setIsLoadOpen}
                isLoadOpen={isLoadOpen}
                allGraphs={allGraphs}
                resetHistory={resetHistory}
            />}

            {isDeleteOpen && <DeleteGraph
                setIsDeleteOpen={setIsDeleteOpen}
                isDeleteOpen={isDeleteOpen}
                allGraphs={allGraphs}
            />}

            {findOpen && <FindNodeMenu
                findOpen={findOpen}
                setFindOpen={setFindOpen}
                onClose={onClose}
                x={x}
                y={y}
            />}

        </div >
    );
};

export default ContextMenu;
