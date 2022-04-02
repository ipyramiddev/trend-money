export default function RecentPools(props) {
    return (
        <div>
            <p className="text-center text-2xl text-white"> Recent Pools</p>
            <div className="rounded-2xl pb-3 m-3 text-white ">
                <div>
                    {/* create list of recent pools */}
                    {props.previous_pools.map((pool, i) => {
                        return (
                            <div key={i} className="flex flex-center bg-white bg-opacity-40 m-2 p-3 rounded-2xl">
                                <div className="flex flex-col px-2">
                                    <p>{pool.name}</p>
                                    <img src={`./tokens/asset_${props.symbol}.png`} alt=''/>
                                </div>
                                <div className="flex flex-col px-2">
                                    <p className="text-yellow">{pool.duration}</p>
                                    <p className='label-text'>duration</p>
                                </div>
                                <div className="flex flex-col px-2">
                                    <p className="text-blue">{pool.avg_apr}%</p>
                                    <p className='label-text'>avg. apr</p>
                                </div>
                                <div className="flex flex-col px-2">
                                    <p className="text-blue">{pool.interest_accumulated}</p>
                                    <p className='label-text'>interest accum.</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}