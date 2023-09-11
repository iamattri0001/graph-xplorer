import { useEffect } from 'react';
import Node from './Graph/Node';
import Edge from './Graph/Edge';
import { useGraph } from '../contexts/GraphProvider';

const Graph = ({ isDirected, isWeighted, nodeSize, weightFactor }) => {

    const { nodes, setNodes, edges, setEdges } = useGraph();
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
        if (localStorage.getItem('graph-working')) {
            const { nodes, edges } = JSON.parse(localStorage.getItem('graph-working'));
            setEdges(edges);
            setNodes(nodes);
        }
    }, []);


    useEffect(() => {
        if (Object.keys(nodes).length) {
            localStorage.setItem('graph-working', JSON.stringify({
                nodes,
                edges
            }));
        }
    }, [nodes, edges]);

    return (
        <div className='flex-grow w-screen'>
            <svg className='h-full w-full select-none'>
                <g>
                    {
                        edges.map((edge, i) =>
                            <Edge
                                key={i}
                                from={{ x: nodes[edge.from].x, y: nodes[edge.from].y }}
                                to={{ x: nodes[edge.to].x, y: nodes[edge.to].y }}
                                fromName={edge.from}
                                toName={edge.to}
                                type={edge.type}
                                isWeighted={isWeighted}
                                isDirected={isDirected}
                                nodeSize={nodeSize}
                                weightfactor={weightFactor}
                            />)
                    }

                    {
                        Object.entries(nodes).map(([name, node]) =>
                            <Node
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
        </div>
    )
}

export default Graph