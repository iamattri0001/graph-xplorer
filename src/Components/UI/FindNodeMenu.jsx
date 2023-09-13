import { showMessage } from "../../utils/handlers/showMessageHandler";
import { findNode } from "../../utils/handlers/handleFindNode";
import { useGraph } from "../../contexts/GraphProvider";
import Modal from "./Modal";
import { useEffect, useRef } from "react";

const FindNodeMenu = ({ findOpen, setFindOpen, onClose, x, y }) => {
    const { nodes, setNodes } = useGraph();
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <Modal openOrClose={findOpen} openCloseHandler={setFindOpen} >
            <div className='w-[20rem] h-[8rem] bg-wedgewood-400 rounded-md px-4 py-2 flex items-center justify-center'>
                <form className='flex items-center justify-center gap-x-2 '>
                    <input ref={inputRef} type="text" id="node-find-name" className='bg-transparent outline-none border-b-[1px] border-wedgewood-950 placeholder-wedgewood-600 text-wedgewood-950 px-2' placeholder='Name of the graph' autoComplete='off' />
                    <button className='btn' type="submit" onClick={(ev) => {
                        ev.preventDefault();
                        const name = document.getElementById('node-find-name').value;
                        if (name === '') {
                            showMessage('Provide a name', 'error');
                            return;
                        }

                        findNode(nodes, setNodes, name, x, y);
                        setFindOpen(false);
                        onClose();
                    }}>Find</button>
                </form>
            </div>
        </Modal>
    )
}

export default FindNodeMenu
