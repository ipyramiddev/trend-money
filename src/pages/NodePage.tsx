import IRL from "components/IRL";
import DappFrame from "sections/dapps/DappFrame";
import { opto_specs } from "./opto_specs";

const temp_node = {      
    name: "opto0",
    connected: true,
    specs: opto_specs,
    img: './optos/opto0.gif',
    url: ""
}



const NodePage = () => {
    return (
        <div className=" flex-col w-screen p-6 h-screen">
            <p className="text-3xl"> Nodes </p>

            <NodeHeader node={temp_node} />
            {/* <NodeFrame node={}/> */}
            <IRL />
        </div>
    )
}

interface NodeClient {
    name:string;
    base_url:string;
    ports: any[];
}

interface NodeFrameProps {
    node: Node;
    viewUrl?: string;
    clients: NodeClient[]
}


const NodeFrame = ({node,viewUrl}:NodeFrameProps) =>{
    return (
        <div className="">
            <iframe className="scrollbar rounded-xl  scrollbar-thumb-pink scrollbar-track-blue" 
            width={'100%'}
            height={'800px'}
            // ref={ref}
            // onLoad={newNav}
            title="host" src={viewUrl}/>
        </div>
        // </div>
    )
}

const SpecSections = () => {
    return(
        <div className="flex flex-row gap gap-3">

        </div>
    )
}

interface NodeProps {
    node: any,

}
const NodeHeader = ({ node }: NodeProps) => {
    return (
        <div className="flex flex-col justify-start">
            <div className="flex flex-col">
                <p className="text-3xl text-left">{node.name}</p>
                <p className="text-3xl text-left">{node.url}</p>
            </div>
            <div>
                <img className="w-60 h-60" src="./optos/0.gif"/>
            </div>
            {/* <mintWagmi */}
        </div>
    )
}

export default NodePage;