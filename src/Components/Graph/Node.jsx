import React, { useState, useEffect } from 'react';
import { getTransformStyles, duration } from '../../utils/animations/transform';
import nodeActionHandler from '../../utils/handlers/nodeActionHandler'

import { AiOutlineDelete } from 'react-icons/ai';
import { useGraph } from '../../contexts/GraphProvider';


const Node = ({ name, x, y, handlePositionChange, nodeSize }) => {
    const { nodes, edges, setEdges, setNodes, addHistory } = useGraph();

    const [isDragging, setIsDragging] = useState(false);
    const [transitionDuration, setTransitionDuration] = useState(duration.slow);

    const [isDeleteActive, setIsDeleteActive] = useState(false);

    const deleteIconCordinates = {
        x: window.innerWidth * 0.82,
        y: window.innerHeight * 0.9
    }
    const handleMouseDown = () => {
        setIsDragging(true);
        setTransitionDuration(duration.fast);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!isDragging) return;

            const newX = event.clientX;
            const newY = event.clientY;

            const dist = Math.sqrt(Math.pow(newX - deleteIconCordinates.x, 2) + Math.pow(newY - deleteIconCordinates.y, 2));

            if (dist <= 30) {
                setIsDeleteActive(true);
            } else {
                setIsDeleteActive(false);
            }

            handlePositionChange(name, newX, newY);
        };

        const handleMouseUp = (event) => {
            // event.preventDefault();
            if (isDeleteActive) {
                console.log('delete');
                nodeActionHandler('Delete', nodes, setNodes, edges, setEdges, null, name, addHistory);
            }
            setIsDragging(false);
            // setIsDeleteActive(false)
            setTransitionDuration(duration.slow)
        };

        const handleTouchMove = (event) => {
            // event.preventDefault();
            if (!isDragging) return;

            setTransitionDuration(duration.fast);
            if (event.touches) {
                const touch = event.touches[0];
                const newX = touch.clientX;
                const newY = touch.clientY;
                handlePositionChange(name, newX, newY);
            }
            setTransitionDuration(duration.slow);
        };

        const handleTouchEnd = (event) => {
            // event.preventDefault();
            setIsDragging(false);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('mouseup', handleMouseUp, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, name, handlePositionChange]);

    const transformStyles = getTransformStyles(x, y, transitionDuration);

    return (
        <g
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            className="text-dark"
        >

            {isDragging &&
                <g
                    className='text-5xl'
                    style={{ ...getTransformStyles(deleteIconCordinates.x, deleteIconCordinates.y, '0.5s') }}>
                    <AiOutlineDelete className={isDeleteActive ? `text-red-400` : `text-wedgewood-50`} />
                </g>
            }

            <circle
                className={`node fill-node stroke-wedgewood-100 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} `}
                r={20 * nodeSize}
                // cx={x}
                // cy={y}
                strokeWidth={1.5}
                dataname={name}
                style={{ ...transformStyles, filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))' }}
            />
            <text
                className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                // x={x}
                // y={y}
                style={{ ...transformStyles }}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="19"
            >
                {name.slice(0, 4)}
            </text>
        </g >
    );
};

export default Node;
