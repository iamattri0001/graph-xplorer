import React, { useState, useEffect } from 'react';

const Node = ({ name, x, y, handlePositionChange, nodeSize }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x, y });

    const handleMouseDown = (event) => {
        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            // event.preventDefault();
            if (!isDragging) return;

            const newX = event.clientX;
            const newY = event.clientY;

            setPosition({ x: newX, y: newY });
            handlePositionChange(name, newX, newY);
        };

        const handleMouseUp = (event) => {
            // event.preventDefault();
            setIsDragging(false);
        };

        const handleTouchMove = (event) => {
            // event.preventDefault();
            if (!isDragging) return;

            if (event.touches) {
                const touch = event.touches[0];
                const newX = touch.clientX;
                const newY = touch.clientY;
                setPosition({ x: newX, y: newY });
                handlePositionChange(name, newX, newY);
            }

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

    return (
        <g
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            className="text-dark"
        >
            <circle
                className={`node fill-node stroke-wedgewood-100 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} `}
                r={20 * nodeSize}
                cx={position.x}
                cy={position.y}
                strokeWidth={1.5}
                dataname={name}
                style={{ filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))' }}
            />
            <text
                className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                x={position.x}
                y={position.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="19"
            >
                {name.slice(0, 4)}
            </text>
        </g>

    );
};

export default Node;
