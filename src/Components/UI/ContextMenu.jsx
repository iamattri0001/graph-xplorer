import { useState } from 'react';

import { IoCloseOutline } from 'react-icons/io5';
import { findNode } from '../../utils/handlers/handleFindNode';
import { useGraph } from '../../contexts/GraphProvider';

import { randomizeGraphHandler, resetGraphHandler } from '../../utils/handlers/graphHandler';

import SaveGraph from './SaveGraph';
import LoadGraph from './LoadGraph';
import DeleteGraph from './DeleteGraph';


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

    const [findOpen, setFindOpen] = useState(true);

    const allGraphs = localStorage.getItem('saved-graphs') ? JSON.parse(localStorage.getItem('saved-graphs')) : [];

    const menuOptionClasses = 'cursor-pointer hover:bg-wedgewood-600 transition-all w-full px-4';

    const disabledOptionClasses = 'cursor-not-allowed w-full px-4 text-gray-400';

    return (
        <div id='context-menu' style={style} className='bg-wedgewood-800 rounded pt-1 pb-2 select-none'>
            <div className='absolute bg-wedgewood-50 hover:bg-wedgewood-200 transition-all p-[2px] rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={onClose}>
                <IoCloseOutline size={20} />
            </div>


            <div className='flex flex-col gap-y-1 text-wedgewood-50'>

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

        </div >
    );
};

export default ContextMenu;
