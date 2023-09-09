import Arrow from './Arrow'

const Edge = ({ from, to, isWeighted, isDirected, fromName, toName, nodeSize, weightfactor }) => {
    // Calculate the midpoint for the text element
    const textX = (from.x + to.x) / 2 + 5;
    const textY = (from.y + to.y) / 2 - 10;

    return (
        <g className='edge stroke-edge' datafrom={fromName} datato={toName}>
            <g transform={`translate(${from.x}, ${from.y})`} className="transition-transform duration-500 ease">
                <line
                    x1={0}
                    y1={0}
                    x2={to.x - from.x} // Calculate the new x2 based on the translation
                    y2={to.y - from.y} // Calculate the new y2 based on the translation
                    strokeWidth={1.3}
                />
            </g>

            {isWeighted && (
                <text className='stroke-none fill-wedgewood-50 text-md transition-all duration-700' transform={`translate(${textX}, ${textY})`}>
                    {Math.ceil((Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)) / 10) * weightfactor)}
                </text>
            )}

            {isDirected && <Arrow from={from} to={to} nodeSize={nodeSize} />}
        </g>
    );
};

export default Edge;
