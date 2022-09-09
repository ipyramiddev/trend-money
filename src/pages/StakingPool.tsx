import Stat from "components/Stat";
import Token from "components/Token";
import TokenStack from "components/TokenStack";
import DappLogo from "sections/dapps/DappLogo";
import { dappByName } from "util/dappUtils";


interface PoolProps {
    pool: any;
}


// Strats are what compose a

const tag_map= {
    lend: {name:"Supply", color:"pink",},
    borrow: {name:"Liquidity pool", color:"red",},
    lp: {name:"Liquidity pool", color:"yellow",},
    order: {name:"Orderbook", color:"orange",}

}
const CategoryTag =(cat:string,color="pink") =>{
    const tag = tag_map.lend
    let tag_color = "bg-blue"
    // if(
    return (
        <p
            className={"text-md px-3 py-1 rounded-lg "+ tag.color}
        >{cat}</p>)
}

const SubStrat = ({pool}:any) =>{


    return (<div className="flex flex-row gap gap-3 seam-outline p-2 text-white">
        {/* TOKEN */}
            
        <div>
        <p className="text-xl font-bold">{pool.name}</p>
        {ProtocolTag(pool.platform)}
        </div>
        <TokenStack tokens={pool.assets}/>
        {CategoryTag(pool.category_tag)}
        <div className="flex flex-row justify-between">
            <Stat format={true} name="portion" value={pool.portion*100} unit="%"  />
        </div>
    </div>);
}

const stratEntry = () => {
    return (<div></div>);
}

const ProtocolTag = (p:any) =>{
    const dapp_name = dappByName(p)
    const dapp_img = dapp_name? dapp_name.image :"Pontem.png"

    return(<div className="flex flex-row items-center justify-center px-2 py-1 rounded-xl outline outline-2 outline-white">
        <img className="rounded-lg w-8 h-8 " src={`dapps/${dapp_img}`} alt="dapp-img" />
        <p>{p}</p>
    </div>)
}
// const Σ = (){}

export const StakingPool = ({ pool }: PoolProps) => {

    const pool_assets = ["APT","BTC"]

    const protocols = pool.pools.map((i:any) => [i.address||"0x0x",{name:i.name,image:i.image}])
    console.log("PROTOCOLS", protocols);

    // const protocols = _.pluck(pool.pools, 'protocol');

    return (<div className="w-full seam-outline  shadow-lg shadow-white roundex-2xl text-white">
        <div className='flex flex-row justify-between'>
            <h1 className="text-3xl">{pool.name}</h1>
            <div className="items-center justify-center rounded-2xl">
                <TokenStack tokens={pool_assets}/>
                </div>
            </div>
        <div className='flex flex-row justify-between'>
        <div className='flex flex-col '>
                {pool.pools.map((pool:any)=>{return(<SubStrat pool={pool}/>)})}
            </div>
            <div className='flex flex-row justify-end gap gap-4'>
                {/* <BarChart/> */}
                <div className="stat place-items-center">
                    {/* <div className="stat-value">{props.avg_apr_24h}</div> */}
                    <div className="stat-title">apr 24h.</div>
                </div>
                <div className="stat place-items-center">
                    {/* <div className="stat-value">{props.avg_apr_7d}</div> */}
                    <div className="stat-title">apr 7d.</div>
                </div>
                {/* {protocols.map((p:any)=>{
                    return (<p>{p.name}</p>
                )})} */}
            </div>
        </div>
    </div>);
};
