import { ImGithub } from 'react-icons/im';
import { BsLinkedin } from 'react-icons/bs';

const Help = () => {
    return (
        <div className='w-[80vw] h-[60vh] px-8 flex flex-col items-start gap-y-16 py-8 rounded-md bg-wedgewood-200 overflow-y-auto'>

            <div className='flex items-start justify-center gap-y-4 flex-col'>
                <h1 className='text-5xl title-font'>Left Menu</h1>
                <div className='ml-5'>
                    <h3 className='text-2xl'>Vertex</h3>
                    <p className='text-base'> For adding a vertex, you must provide a unique name to preserve it's identity. For deleting a vertex it must exist in the graph. Be carefull, deleting a vertex also deletes all the incoming and outgoing edges to and from that vertex. Name of vertices are case-sensitive, i.e. 'vertex' and 'Vertex' are 2 different names.</p>
                </div>

                <div className='ml-5'>
                    <h3 className='text-2xl'>Edge</h3>
                    <p>You can also add edges, and delete exisiting edges from the graph. For an edge to be deleted, it must exist in the graph. Also, while adding an edge both, source and destination must exist in graph.</p>
                </div>

                <div className='ml-5'>
                    <h3 className='text-2xl'>Weight</h3>
                    <p>You don't need to provide any weight to the edges. Weight is calculated automatically according to the length of the edges. And can be adjusted by dragging the vertices connected via that edge.</p>
                </div>

                <div className='ml-5'>
                    <h3 className='text-2xl'>Vertex Size Adjustment</h3>
                    <p>Size of vertex can be adjusted via this slider.</p>
                </div>

                <div className='ml-5'>
                    <h3 className='text-2xl'>Weight Scale Adjustment</h3>
                    <p>Scale of weight of edges (which is basically the distance betweeen the vertices) can be asjusted via this slider.</p>
                </div>
            </div>

            <div className='flex items-start justify-center gap-y-4 flex-col'>
                <h1 className='text-5xl title-font'>Right Menu</h1>
                <div className='ml-5'>
                    <h3 className='text-2xl'>Visualize</h3>
                    <p>You can select any algorithm from the drop down menu and click on 'Visualize' button. Depending on the requirements to visualise the selected algorithm, a suitable animation will guide you through the sequence of steps.</p>
                </div>

                <div className='ml-5'>
                    <h3 className='text-2xl'>Step Delay</h3>
                    <p>There is a slider above 'Visualize' button. This slider can be used to adjust the delay time between each step (min 0.2s and max 5s). This adjustment option can be very useful when you're studying a very complex graph and you want to track each step carefully.</p>
                </div>

                <div className='ml-5'>
                    <h3 className='text-2xl'>Reset Graph</h3>
                    <p>Immediately discard all the existing vertices and edges from the graph.</p>
                </div>

                <div className='ml-5'>
                    <h3 className='text-2xl'>Build from Input</h3>
                    <p>You can also build a graph by providing the information about number of vertices, number of edges, and all the edges.</p>
                </div>
            </div>
            <div className='flex items-center justify-center w-full text-wedgewood-900 text-3xl gap-x-4'>
                <a href="https://github.com/iamattri0001/graph-xplorer" rel='noreferrer' target='_blank'>
                    < ImGithub className='hover:text-wedgewood-950 transition-all duration-200 hover:scale-110' />
                </a>
                <a href="https://www.linkedin.com/in/deepanshu-attri-17a895241/" rel='noreferrer' target='_blank'>
                    < BsLinkedin className='hover:text-wedgewood-950 transition-all duration-200 hover:scale-110' />
                </a>
            </div>

        </div>
    )
}

export default Help
