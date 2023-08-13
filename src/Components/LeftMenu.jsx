
import { useState, useEffect, useRef } from 'react'
import { BsArrowBarRight } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineArrowRight } from 'react-icons/ai';

import nodeActionHandler from '../utils/handlers/nodeActionHandler';
import edgeActionHandler from '../utils/handlers/edgeActionHandler';

const LeftMenu = ({ nodes, edges, setEdges, setNodes, isDirected, showMessage, setNodeSize }) => {
    const [isOpen, setIsOpen] = useState(true);


    const [nodeAction, setNodeAction] = useState('Add');
    const [edgeAction, setEdgeAction] = useState('Add');

    const handleLeftShiftDown = (event) => {
        if (event.shiftKey && event.code === 'ShiftLeft') {
            setIsOpen((prevState) => !prevState);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleLeftShiftDown);

        return () => {
            window.removeEventListener('keydown', handleLeftShiftDown);
        };
    }, []);

    const handleEdgeAction = (event) => {
        event.preventDefault();
        edgeActionHandler(edgeAction, nodes, edges, setEdges, isDirected, showMessage);
    }


    const handleNodeAction = (event) => {
        event.preventDefault();
        nodeActionHandler(nodeAction, nodes, setNodes, edges, setEdges, showMessage);
    }

    const sourceInputRef = useRef(null);
    const destInputRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            destInputRef.current.focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            sourceInputRef.current.focus();
        }
    };

    return (
        <div
            className={`floating-menu absolute h-screen flex items-center justify-center ${isOpen ? `left-5` : `left-[-194px]`} transition-all duration-200 gap-x-2`}>

            <div className=' text-wedgewood-50 flex flex-col items-center justify-center gap-y-7'>
                <div className='bg-wedgewood-900 w-full flex flex-col gap-y-2 items-center justify-center py-3'>
                    <span className='text-wedgewood-200'>
                        Vertex Size
                    </span>
                    <input type="range" id="node-size-controller" max={2.5} min={1} step={0.1} onChange={(ev) => setNodeSize(ev.target.value)} defaultValue={2} className='appearance-none h-1 w-[75%] bg-gradient-to-r from-wedgewood-100 to-wedgewood-600 rounded-md outline-none thumb:bg-red-500 cursor-pointer' />
                </div>
                <form
                    className='flex items-center justify-center gap-y-2 flex-col bg-wedgewood-900 w-full px-5 py-3'
                    onSubmit={(ev) => { ev.preventDefault() }}>

                    <input
                        type='text'
                        id='node-name'
                        placeholder='Name of the vertex'
                        className='px-2 max-w-[160px] py-1 rounded-sm bg-transparent border-b-[1.5px] placeholder:text-gray-400  border-wedgewood-950 focus:placeholder: outline-none focus:border-wedgewood-400'
                        autoComplete='off' />
                    <div className='flex items-center justify-center gap-x-2'>
                        <select
                            id="node-action"
                            value={nodeAction}
                            onChange={(ev) => setNodeAction(ev.target.value)}
                            className='bg-wedgewood-200 text-wedgewood-950 px-1 py-1 text-sm rounded-sm outline-none cursor-pointer w-full'>
                            <option value='Add' > Add </option>
                            <option value='Delete' > Delete </option>
                        </select>
                        <div>
                            <button
                                className='btn flex'
                                onClick={handleNodeAction}>
                                GO <AiOutlineArrowRight className='inline text-lg' />
                            </button>

                        </div>

                    </div>
                </form>

                <form className='flex items-center gap-y-2 flex-col bg-wedgewood-900 w-full px-5 py-3'>
                    <div className='flex items-center flex-col justify-center gap-x-3'>

                        <input
                            type='text'
                            id='edge-source'
                            placeholder='Source'
                            className='px-2 py-1 rounded-sm w-[128px] bg-transparent border-b-[1.5px] border-wedgewood-950 placeholder:text-gray-400  outline-none focus:border-wedgewood-400'
                            autoComplete='off'
                            onKeyDown={handleKeyDown}
                            ref={sourceInputRef}
                        />

                        <input
                            type='text'
                            id='edge-dest'
                            placeholder='Destination'
                            className='px-2 py-1 rounded-sm w-[128px] bg-transparent border-b-[1.5px] border-wedgewood-950 placeholder:text-gray-400  outline-none focus:border-wedgewood-400'
                            autoComplete='off'
                            onKeyDown={handleKeyDown}
                            ref={destInputRef}
                        />
                    </div>
                    <div className='flex items-center justify-center gap-x-2'>
                        <select
                            id="edge-action"
                            value={edgeAction}
                            onChange={(ev) => setEdgeAction(ev.target.value)}
                            className='bg-wedgewood-200 text-wedgewood-950 px-1 py-1 text-sm outline-none cursor-pointer'>
                            <option value='Add' > Add </option>
                            <option value='Delete' > Delete </option>
                        </select>

                        <button
                            className='btn'
                            onClick={handleEdgeAction}>
                            GO <AiOutlineArrowRight className='inline text-lg' />
                        </button>

                    </div>
                </form>
            </div>
            <div className='text-wedgewood-100 text-3xl cursor-pointer menu-switch'>
                {isOpen ? (
                    <IoCloseOutline onClick={() => setIsOpen(false)} />
                ) : (
                    <BsArrowBarRight onClick={() => setIsOpen(true)} className='animate-drag-left' />
                )}
            </div>

        </div>
    )
}

export default LeftMenu;