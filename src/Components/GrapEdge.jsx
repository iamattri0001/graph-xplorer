import EdgeArrow from "./EdgeArrow"

const GrapEdge = ({ from, to, isWeighted, isDirected, fromName, toName }) => {
    return (
        <g className='edge stroke-edge' datafrom={fromName} datato={toName}>

            <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                strokeWidth={1}
            />

            {isWeighted && <text
                className='stroke-none fill-wedgewood-50 text-sm'
                x={(from.x + to.x) / 2 + 5}
                y={(from.y + to.y) / 2 - 10}>

                {Math.ceil(Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)) / 10)}
            </text>}

            {isDirected &&
                <EdgeArrow from={from} to={to} />
            }
        </g>

    )
}

export default GrapEdge