import React, { useState, useEffect } from 'react';
import { getTransformStyles, duration } from '../../utils/animations/transform';

const Node = ({ name, x, y, handlePositionChange, nodeSize }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [transitionDuration, setTransitionDuration] = useState(duration.slow);

    const handleMouseDown = () => {
        setIsDragging(true);
        setTransitionDuration(duration.fast);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!isDragging) return;

            const newX = event.clientX;
            const newY = event.clientY;

            handlePositionChange(name, newX, newY);
        };
        const handleMouseUp = (event) => {
            // event.preventDefault();
            setIsDragging(false);
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
        </g>

    );
};

export default Node;
