import IRL from "components/IRL";

const opto_specs = {
    cpu: {
        model: "i7 4770"
    },
    ram: "16gb (2x8gb)",
    storage: "128gb ssd",
    clients: [
        {
            name:"Aptos node",
            url: "",
        },
        {
            name:"api gui",
            url: "",
        }
    ]

}

const temp_node = {
    name: "opto0",
    connected: true,
    specs: opto_specs,
    img: '0.gif',
    url: ""
}

const NodePage = () => {
    return (
        <div className=" flex-col w-screen p-6 h-screen">
            <p className="text-3xl"> Nodes </p>

            <NodeHeader node={temp_node} />
            <IRL />
        </div>
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
                <img className="w-60 h-60" src="0.gif"/>
            </div>
            {/* <mintWagmi */}
        </div>
    )
}

export default NodePage;