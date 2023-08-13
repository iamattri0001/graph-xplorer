import { useEffect } from "react";

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
                <div className='w-screen absolute h-screen bg-black/50 z-10 flex flex-col gap-y-3 items-center justify-center'>
                    {children}
                    <div>
                        <button className='btn text-base' onClick={() => openCloseHandler(false)}>Close</button>
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;
