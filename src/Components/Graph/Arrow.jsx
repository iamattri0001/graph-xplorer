import React from 'react';

const Arrow = ({ from, to, nodeSize }) => {
    function calculatePointOnLine(x1, y1, x2, y2, a) {

        let dx, dy;

        if (x1 === x2) {
            // Vertical line (undefined slope)
            dx = 0;
            dy = a;
        } else {
            // Calculate the slope of the line
            const m = (y2 - y1) / (x2 - x1);

            // Calculate the change in x (dx) and change in y (dy)
            const sign = Math.sign(x2 - x1);
            dx = sign * (a / Math.sqrt(1 + Math.pow(m, 2)));
            dy = m * dx;
        }

        // Calculate the coordinates of the new point
        const x3 = x2 - dx;
        const y3 = y2 - dy;

        return { x: x3, y: y3 };
    }


    function findPointP(pointOnLine, x1, y1, x2, y2, distance) {
        let xP1, yP1, xP2, yP2;

        if (x1 === x2) {
            // Vertical line (slope undefined)
            xP1 = pointOnLine.x;
            yP1 = pointOnLine.y + distance;

            xP2 = pointOnLine.x;
            yP2 = pointOnLine.y - distance;
        } else if (y1 === y2) {
            // Horizontal line (slope zero)
            xP1 = pointOnLine.x + distance;
            yP1 = pointOnLine.y;

            xP2 = pointOnLine.x - distance;
            yP2 = pointOnLine.y;
        } else {
            // Calculate the slope of line L
            const slopeL = (y2 - y1) / (x2 - x1);

            // Calculate the perpendicular line passing through pointOnLine
            const perpendicularSlope = -1 / slopeL;
            const perpendicularIntercept = pointOnLine.y - perpendicularSlope * pointOnLine.x;

            // Calculate the x-coordinate of point P (to the right of pointOnLine)
            xP1 = pointOnLine.x + distance / Math.sqrt(1 + perpendicularSlope ** 2);

            // Calculate the y-coordinate of point P (to the right of pointOnLine)
            yP1 = perpendicularSlope * xP1 + perpendicularIntercept;

            // Calculate the x-coordinate of point P (to the left of pointOnLine)
            xP2 = pointOnLine.x - distance / Math.sqrt(1 + perpendicularSlope ** 2);

            // Calculate the y-coordinate of point P (to the left of pointOnLine)
            yP2 = perpendicularSlope * xP2 + perpendicularIntercept;
        }

        return [
            { x: xP1, y: yP1 }, // Point P to the right of pointOnLine
            { x: xP2, y: yP2 }  // Point P to the left of pointOnLine
        ];
    }


    const x1 = from.x;
    const y1 = from.y;
    const x2 = to.x;
    const y2 = to.y;
    const distance = nodeSize * 20; //equals the radius of circle of node
    const pointOnLine = calculatePointOnLine(x1, y1, x2, y2, distance);

    const pointOfPerpendicular = calculatePointOnLine(x1, y1, x2, y2, distance + distance / 2);

    const pointsP = findPointP(pointOfPerpendicular, x1, y1, x2, y2, 10);

    return (
        <g className='stroke-inherit'>
            <line
                className='stroke-inherit'
                x1={pointsP[0].x}
                y1={pointsP[0].y}

                x2={pointOnLine.x}
                y2={pointOnLine.y}
                strokeWidth={1.3}
            />
            <line
                className='stroke-inherit'
                x1={pointsP[1].x}
                y1={pointsP[1].y}

                x2={pointOnLine.x}
                y2={pointOnLine.y}
                strokeWidth={1.3}
            />
        </g>
    );
};

export default Arrow;