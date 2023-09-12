import { useEffect } from "react";
import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({ openCloseHandler, openOrClose, children }) => {
    const handleEscDown = (event) => {
        if(event.code === 'Escape'){
            openCloseHandler(false);
        }
    }
    
    useEffect(() => {
        if (openOrClose) {
            window.addEventListener('keydown', handleEscDown);
        } else {
            window.removeEventListener('keydown', handleEscDown);
        }

        return () => {
            window.removeEventListener('keydown', handleEscDown);
        }
        // eslint-disable-next-line 
    }, [openOrClose]);

    return (
        <>
            {openOrClose &&
                <div className='w-screen fixed h-screen bg-black/80 z-10 flex flex-col gap-y-3 items-center justify-center left-0 top-0'>
                    {children}
                    <div>
                        <button className='btn text-2xl rounded-full p-1' onClick={() => openCloseHandler(false)}><IoCloseOutline /></button>
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;
