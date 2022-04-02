export default function CurrentPool(pool) {
    return (

        <div className="rounded-2xl p-5 m-5 bg-white  text-white bg-opacity-50">
            <div>
                <div className="text-4xl">
                    <p>{pool.name}</p>
                    <p className="text-lg opacity-50 pl-4">{pool.symbol}</p>
                </div>
                <div className=" flex flex-row justify-between">
                <div className="text-right outline-8 outline-yellow">
                    <p className="text-2xl text-blue">{pool.apr}%</p>
                    <p className="text-md opacity-50">apr</p>
                </div>
                <div className="text-left">
                    <p className="text-2xl text-blue">{pool.duration}</p>
                    <p className="text-md opacity-50">duration</p>
                </div>
                </div>
            </div>
        </div>
    );
}