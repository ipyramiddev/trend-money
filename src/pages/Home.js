import React from "react";
function Home() {
    // HOME PAGE

    return (
        <div className="h-screen m-4 bg-black text-white items-center text-center justify-center img-center">
            <p className="text-4xl text-center m-5"> Simple ETF-Style Yield</p>
            <p className="text-2xl text-center m-2 p-4">fragmented deposits across top celo defi protocols, Risk Adverse Yield Aggregate,</p>
            <div className="flex flex-col items-center">
            <p className="text-9xl pl-2">Σ</p>
            <img  className="w-80" src="./Tokenfork.png" alt=""/>
            </div>
            <div className="flex flex-row justify-center m-3 p-2">
                <a href="/app">
                <button className="seam-button m-3 text-3xl">View Pools </button>
                </a>
                </div>
            <div className=" ">
                <p className="text-2xl text-white">
                    Cross protocol yields represented by a single token
                </p>
                
            </div>
        </div>
    );
}
export default Home;
