
export default function PoolBox(pool) {
    return (
        <div className="m-8">
            <div className=" bg-yellow rounded-2xl pool-stack">
                <div className="pool-stack bg-blue rounded-2xl">
                    <div className="pool-stack border-8 bg-blac border-pink rounded-2xl">
                        <div>
                            <div className="flex flex-row justify-between text-left p-3">
                                <div className="text-left text-purple text-2xl">
                                    {pool.name}
                                    <div className="flex flex-row m-2">
                                        <p className="text-white text-lg opacity-50 pr-1">Total Deposited:</p>
                                        <p className="text-blue text-lg">{pool.total_deposited}</p>
                                    </div>
                                    <div className="flex flex-row m-2">
                                        <p className="text-white text-lg opacity-50 pr-1">Weekly volume: </p>
                                        <p className="text-blue text-lg">{pool.weekly_volume}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-5xl text-lightPurple">
                                        {pool.apr}
                                    </p>
                                    <p className="text-2xl text-white text-right px-1 opacity-60">apr</p>
                                    
                                </div>
                            </div>
                            <div className="flex flex-row justify-end p-2 text-white">
                                {/* <button className="bg-pink rounded-xl px-2 py-1 h-10 hover:opacity-40 m-2">Deposit</button>
                                <button className="bg-blue rounded-xl px-3 py-1 h-10 hover:opacity-40 m-2 ">Withdrawl</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
