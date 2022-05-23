import React from "react";
function Home() {
    const protocolIntegrations = [
        {name: 'Ubeswap', img: 'ube_logo.svg',},
        {name: 'Mobius', img: 'ube_logo.svg'},
        // {name: 'Uniswap', img: 'ube_logo.svg'},
    ]
    // HOME PAGE

    return (
        <div className="h-screen m-4 bg-black text-white items-center text-center justify-center img-center">
            <p className="text-4xl text-center m-5"> Simple ETF-Style Yield</p>
            <p className="text-2xl text-center m-2 p-4">Bundled pools w/ fragmented deposits across top celo defi protocols, Risk Adverse Yield Aggregate,</p>
            <div className="flex flex-col items-center">
                <p className="text-9xl pl-2">Σ</p>
                <img className="w-80" src="./Tokenfork.png" alt="" />
            </div>
            <div className="flex flex-row justify-center m-3 p-2">
                <a href="/app">
                    <button className="seam-button m-3 text-3xl py-2 px-3">View Pools </button>
                </a>
            </div>
            <div className=" ">
                <p className="text-2xl text-white">
                    multi-pool yield stability via a single deposit
                </p>


            </div>
            <div className="flex flex-col justify-center m-3 p-2 items-center">
                <p>Integrating with top celo Defi protocols</p>
                <div className="flex flex-row gap-4 items-center">
                    {protocolIntegrations.map((protocol, index) => {
                        return (
                    <div key={index} className={`w-30 rounded-lg bg-${protocol.color}`}>
                        <img className="w-20" src="ube_logo.svg" alt="" />
                        <p>{protocol.name}</p>
                    </div>
                        )})}
                    <div className="w-30 rounded-lg">
                        <img className="w-20" src="mobius.svg" alt="" />
                        <p> Mobius</p>
                    </div>

                </div>
                    <div>
                        <img className="opacity-40" src="./uniswap.png" alt="" />
                        <p>coming soon...</p>
                    </div>
            </div>
        </div>
    );
}
export default Home;
