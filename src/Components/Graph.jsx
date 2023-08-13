import { useEffect } from 'react';
import GraphNode from './GraphNode';
import GrapEdge from './GrapEdge';

const Graph = ({ nodes, edges, setNodes, isDirected, isWeighted, nodeSize }) => {

    const handlePositionChange = (name, x, y) => {
        const node = nodes[name];
        if (node) {
            node.x = x;
            node.y = y;

            setNodes(prevState => ({
                ...prevState,
                [name]: node
            }));
        }
    }
    useEffect(() => {
        if (Object.keys(nodes).length) {
            localStorage.setItem('graph', JSON.stringify({
                nodes,
                edges
            }));
        }
    }, [nodes, edges]);


    return (
        <svg className='flex-grow w-screen select-none'>
            <g>
                {
                    edges.map((edge, i) =>
                        <GrapEdge
                            key={i}
                            from={{ x: nodes[edge.from].x, y: nodes[edge.from].y }}
                            to={{ x: nodes[edge.to].x, y: nodes[edge.to].y }}
                            fromName={edge.from}
                            toName={edge.to}
                            type={edge.type}
                            isWeighted={isWeighted}
                            isDirected={isDirected}
                        />)
                }

                {
                    Object.entries(nodes).map(([name, node]) =>
                        <GraphNode
                            key={name}
                            name={name}
                            x={node.x}
                            y={node.y}
                            handlePositionChange={handlePositionChange}
                            nodeSize={nodeSize}
                        />
                    )
                }
            </g>
        </svg>
    )
}

export default Graph