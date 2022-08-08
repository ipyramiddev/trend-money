import React from "react";
import PlatformOverview from "../components/PlatformOverview";
import UniIcon from "../components/UniIcon";
import {dapps} from "../dapp_data";

const DefiDappsNames = ["tsunami",]

function Protocol(protocol){
    return(
    <div className="w-30 h-12 rounded-2xl">
        <p>{protocol.name}</p>
        <img source={'./dapps/' + protocol.image} className="w-20 h-20" />
      
    </div>
    );
}


function Home() {

    const protocolIntegrations = [
        { name: 'Ubeswap', img: 'ube_logo.svg', color: 'lightPurple' },
        { name: 'Mobius', img: 'mobius.svg', color: 'blue' },
        // { name: 'Uniswap', img: 'ube_logo.svg', color: 'light-pink' }
    ]
    // HOME PAGE

    return (
        <div className="min-h-screen pb-10 m-4 bg-black text-white items-center text-center justify-center img-center">
            <p className="text-5xl text-center m-5"> Simple ETF-Style Yield</p>
            <p className="text-2xl text-center m-2 p-4">Bundled pools w/ fragmented deposits across top celo defi protocols, Risk Adverse Yield Aggregate.</p>
            <div className="flex flex-col items-center">
                <div className="m-4 pb-6">
                <p className="text-9xl pl-2">Σ</p>
                <img className="w-80" src="./Tokenfork.png" alt="" />
                </div>

                <div>
                    {DefiDappsNames.map((protocolName, index) => {
                        const protocol = dapps.find(dapp => dapp.name === protocolName)
                        return(
                        <Protocol integration={protocol} key={index} />)
                    })}
                </div>
            </div>
            <div className="flex flex-row justify-center m-5 p-2">
                <a href="/app">
                    <button className="seam-button m-3 text-3xl py-2 px-3">View Pools </button>
                </a>
            </div>
            <div className="m-2 ">
                <p className="text-2xl text-white">
                    multi-pool yield stability via a single deposit
                </p>
            </div>
            <div className="flex flex-col justify-center m-3 p-3 mb-10 items-center rounded-lg border border-4 border-white bg-white-opacity-10">
                <p className="text-3xl font-bold p-2">Integrating with top celo Defi protocols</p>
                <div className="flex flex-row gap-4 items-center text-center">
                    {protocolIntegrations.map((protocol, index) => {
                        return (
                            <div key={index} className={`w-30 rounded-lg  bg-${protocol.color} p-1`}>
                                <p>{protocol.name}</p>
                                <img className={`w-20 rounded-lg p-2  bg-opacity-70 bg-${protocol.color}`} src={protocol.img} alt={protocol.img} />
                            </div>
                        )
                    })}
                </div>
                <div className="w-20 h-30 rounded-lg bg-pink bg-opacity-30">
                    <UniIcon />
                </div>
                
            </div>
                <PlatformOverview/>
        </div>
    );
}
export default Home;
