import TokenStack from "components/TokenStack";


interface PoolProps {
    pool: any;
}

const SubStrat = (pool:any) =>{
    return (<div className="seam-outline p-2">
        {/* TOKEN */}
        <div className="flex flex-row justify-between">
            <p>{pool.portion}</p>
        </div>
    </div>);
}

export const StakingPool = ({ pool }: PoolProps) => {

    const pool_assets = ["APT","BTC"]

    const protocols = pool.pools.map((i:any) => [i.address||"0x0x",{name:i.name,image:i.image}])
    console.log("PROTOCOLS", protocols);

    // const protocols = _.pluck(pool.pools, 'protocol');

    return (<div className="w-full seam-outline roundex-2xl text-white">
        <div className='flex flex-row justify-between'>
            <div>
            <h1 className="text-3xl">{pool.name}</h1>
                {/* {TokenStack(pool_assets)} */}
            </div>
            <div className='flex flex-row justify-end gap gap-4'>
                {/* <BarChart/> */}
                {pool.pools.map((pool:any)=>{return(<SubStrat pool={pool}/>)})}
                <div className="stat place-items-center">
                    {/* <div className="stat-value">{props.avg_apr_24h}</div> */}
                    <div className="stat-title">apr 24h.</div>
                </div>
                <div className="stat place-items-center">
                    {/* <div className="stat-value">{props.avg_apr_7d}</div> */}
                    <div className="stat-title">apr 7d.</div>
                </div>
                {protocols.map((p:any)=>{
                    return (<p>{p.name}</p>
                )})}
            </div>
        </div>
    </div>);
};
