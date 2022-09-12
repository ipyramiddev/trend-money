import IRL from "components/IRL";
import DappFrame from "sections/dapps/DappFrame";

const opto_specs = {
    cpu: {
        model: "i7 4770"
    },
    ram: "16gb (2x8gb)",
    storage: "128gb ssd",
    clients: [
        {
            name:"Aptos market",
            url: "",
        },
        {
            name:"api gui",
            url: "",
        }
    ]

}

const temp_market = {
    name: "opto0",
    connected: true,
    specs: opto_specs,
    img: '0.gif',
    url: ""
}



const MarketView = () => {
    return (
        <div className=" flex-col w-screen p-6 h-screen">
            <p className="text-3xl"> Markets </p>

            <MarketHeader market={temp_market} />
            <MarketFrame market={}/>
            <IRL />
        </div>
    )
}

interface MarketClient {
    name:string;
    base_url:string;
    ports: any[];
}



const MarketFrame = () =>{
    return (
        <div className="min-h-screen items-center justify-center p-4">
            <p className="text-3xl text-center">...coming soon</p>
        </div>
        // </div>
    )
}


interface MarketProps {
    market: any,

}
const MarketHeader = ({ market }: MarketProps) => {
    return (
        <div className="flex flex-col justify-start">
            <div className="flex flex-col">
                {/* <p className="text-3xl text-left">{market.name}</p> */}
                {/* <p className="text-3xl text-left">{market.url}</p> */}
            </div>
            
            {/* <mintWagmi */}
        </div>
    )
}

export default MarketView;
