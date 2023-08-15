import React, { useState, useEffect } from 'react'
import { algorithms, killAnimation } from './../../utils/graphAlgos';
import { MdOutlineLiveHelp } from 'react-icons/md';
import { BsArrowBarLeft } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineFileText } from 'react-icons/ai';

const RightMenu = ({
    setIsDirected,
    setIsWeighted,
    isWeighted,
    isDirected,
    nodes,
    edges,
    handleResetGraph,
    showMessage,
    setIsHelpOpen,
    setInputMenuOpen }) => {

    const [lastExec, setLastExec] = useState(2);
    const [animation, setAnimation] = useState(null);
    const [delay, setDelay] = useState(2);


    const [isRightMenuOpen, setIsRightMenuOpen] = useState(true);

    const handleRightShiftDown = (event) => {
        if (event.shiftKey && event.code === 'ShiftRight') {
            setIsRightMenuOpen((prevState) => !prevState);
        }
    };

    const handleRightCtrlDown = (event) => {
        if (event.code === 'ControlRight') {
            document.getElementById('run-btn').click();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleRightShiftDown);
        window.addEventListener('keydown', handleRightCtrlDown);

        return () => {
            window.removeEventListener('keydown', handleRightShiftDown);
            window.removeEventListener('keydown', handleRightCtrlDown);
        };
    }, []);

    const runAlgorithm = () => {
        if (Object.keys(nodes).length === 0) {
            showMessage('Please build a graph first', 'error');
            return;
        }

        const algoId = document.getElementById('selected-algo').value;

        const animation = algorithms[algoId].algo(nodes, edges, isDirected, showMessage, delay * 1000);

        setLastExec(algoId);
        setAnimation(animation);
    }

    const handleAlgoChange = () => {
        killAnimation(lastExec, animation);
    }
    return (
        <div
            className={`floating-menu absolute h-screen flex items-center justify-center ${isRightMenuOpen ? `right-5` : `right-[-154px]`} transition-all duration-200 gap-x-1`}>
            <div className='text-wedgewood-100 text-3xl cursor-pointer menu-switch'>
                {isRightMenuOpen ? (
                    <IoCloseOutline onClick={() => setIsRightMenuOpen(false)} />
                ) : (
                    <BsArrowBarLeft onClick={() => setIsRightMenuOpen(true)} className='animate-drag-left' />
                )}
            </div>

            <div className='flex flex-col py-5 px-3 items-center justify-center gap-y-10 bg-wedgewood-900 rounded-md'>
                <div
                    className='flex flex-col gap-y-2'>
                    <div
                        onClick={() => {
                            setIsWeighted(true)
                            killAnimation(lastExec)
                        }}
                        className={`text-center px-3 py-1 text-sm rounded-sm cursor-pointer transition-all duration-500 border ${isWeighted ? 'bg-wedgewood-500 text-wedgewood-100 border-wedgewood-300' : `border-wedgewood-300 text-wedgewood-300`}`}>
                        Weighted
                    </div>

                    <div
                        onClick={() => {
                            setIsWeighted(false)
                            killAnimation(lastExec)
                        }}
                        className={`text-center px-3 py-1 text-sm rounded-sm cursor-pointer transition-all duration-500 border ${!isWeighted ? 'bg-wedgewood-500 text-wedgewood-100 border-wedgewood-300' : `border-wedgewood-300 text-wedgewood-300`}`}>
                        Unweighted
                    </div>

                </div>

                <div className='flex flex-col gap-y-2'>
                    <div
                        onClick={() => {
                            killAnimation(lastExec)
                            setIsDirected(true)
                        }}
                        className={`text-center px-3 py-1 text-sm rounded-sm cursor-pointer transition-all duration-500 border ${isDirected ? 'bg-wedgewood-500 text-wedgewood-100 border-wedgewood-300' : `border-wedgewood-300 text-wedgewood-300`}`}>
                        Directed
                    </div>

                    <div
                        onClick={() => {
                            setIsDirected(false)
                            killAnimation(lastExec)
                        }}
                        className={`text-center px-3 py-1 text-sm rounded-sm cursor-pointer transition-all duration-500 border ${!isDirected ? 'bg-wedgewood-500 text-wedgewood-100 border-wedgewood-300' : `border-wedgewood-300 text-wedgewood-300`}`}>
                        Undirected
                    </div>
                </div>

                <div className='all-algos flex flex-col gap-y-4 text-sm'>
                    <select
                        onChange={handleAlgoChange}
                        id="selected-algo"
                        className='bg-wedgewood-200 text-wedgewood-950 w-[136px] px-1 py-1 outline-none cursor-pointer rounded-md'
                    >
                        {algorithms.map((algo) => (
                            <option
                                key={algo.id}
                                value={algo.id}
                                style={{ width: '36px', wordWrap: 'break-word' }}
                            >
                                {algo.title}
                            </option>
                        ))}
                    </select>

                    <div className='flex items-center justify-center flex-col text-wedgewood-200 gap-y-2'>
                        <span className='text-sm'>Step Delay</span>
                        <input type="range" step={0.1} max={5} min={0.2} title={`animation delay: ${delay} `} className='appearance-none h-1 w-full bg-gradient-to-r from-wedgewood-100 to-wedgewood-600 rounded-md outline-none thumb:bg-red-500 cursor-pointer' value={delay} onChange={(ev) => setDelay(ev.target.value)} />
                    </div>

                    <button className='text-center px-3 py-1 text-sm rounded-sm cursor-pointer transition-all duration-100 border hover:bg-wedgewood-500 hover:text-wedgewood-100 border-wedgewood-300 text-wedgewood-300' id='run-btn' onClick={runAlgorithm}>Visualize</button>
                </div>

                <div>
                    <button className='btn' onClick={handleResetGraph}>Reset Graph</button>
                </div>

                <div className='flex items-center justify-center gap-x-3'>
                    <button onClick={() => setInputMenuOpen(true)} title='Build from input'>
                        <AiOutlineFileText className='text-3xl inline text-wedgewood-50 cursor-pointer hover:scale-110 transition-all hover:text-wedgewood-400' />
                    </button>

                    <button onClick={() => setIsHelpOpen(true)}><MdOutlineLiveHelp className='text-3xl inline text-wedgewood-50 cursor-pointer hover:scale-110 transition-all hover:text-wedgewood-400 pulse' title='Help' /></button>

                </div>
            </div>
        </div>
    )
}

export default RightMenu