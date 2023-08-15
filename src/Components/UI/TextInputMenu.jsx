import React from 'react'
import textInputHandler from './../../utils/handlers/textInputHandler';

const TextInputMenu = ({nodes, setNodes, edges,  setEdges, setIsDirected, showMessage }) => {

    const handleBuild = (event) => {
        event.preventDefault();
        const data = document.getElementById('input-data').value;
        if (data !== '')
            textInputHandler(data, nodes, setNodes, setEdges, setIsDirected, showMessage);
    }

    return (
        <div className='bg-wedgewood-400 px-4 py-7 flex flex-col items-center justify-center gap-y-3 rounded-md h-[50vh]'>
            <div>
                <h1 className='text-2xl'>Input Format</h1>
                <p>Firt line contains 2 space-separated positive integers: number of vertices n and number of edges m</p>
                <p>Next m lines contain the edges in the from: u v</p>
            </div>
            <form className='flex items-center gap-x-2 justify-center h-full'>
                <textarea id='input-data' cols={50} rows={8} className='bg-wedgewood-200 border border-wedgewood-500 px-2 py-1 resize-none focus:outline-wedgewood-950' />

                <div className='flex flex-col items-center justify-center gap-y-4'>
                    <div className='text-sm flex items-center justify-center gap-x-2'>

                        <input type="radio" id="is-directed" name="graph-type" value="directed" className='cursor-pointer' />
                        <label htmlFor="is-directed" className='cursor-pointer'>Directed</label>

                        <input type="radio" id="is-undirected" name="graph-type" value="undirected" className='cursor-pointer' defaultChecked='true' />
                        <label htmlFor="is-undirected" className='cursor-pointer'>Undirected</label>
                    </div>
                    <div className='flex items-center justify-center gap-x-2'>
                        <button className='btn' onClick={handleBuild}>Build</button>
                        <button className='btn' onClick={(event) => {
                            document.getElementById('input-data').value = '';
                            event.preventDefault();
                        }}>Clear</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TextInputMenu
