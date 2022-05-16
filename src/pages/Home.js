import React from "react";
import { home_page_text } from "../home_page_text";
import { BiRightArrowAlt } from "react-icons/bi";
import PoolShowcase from "../components/PoolShowcase";
import TokenStack from "../components/TokenStack";
import { progress } from 'daisyui';
function Home() {
    // HOME PAGE

    return (
        <div className="h-screen m-4 bg-black text-white items-center">
            <p className="text-4xl text-center m-5"> Simple ETF-Style Yield</p>
            <p className="text-2xl text-center m-2 p-4">fragmented deposits across top celo defi protocols, Risk Adverse Yield Aggregate,</p>
            <div className="flex flex-row justify-center">
                <a href="/app">
                <button className="seam-button m-3">View Pools </button>
                </a>
                </div>
            <div className=" ">
                <TokenStack tokens={["cUSD", "cUSDT"]} />
            </div>
            {/* <TeamSection team={home_page_text.team} /> */}
            {/* <p className="opacity-40">© Blockchain @ poly</p> */}
        </div>
    );
}

export default Home;
{/* <div className={`radial-progress progress-white text-blac bg-white `} style={{ "--value": (yp.YTF_portion * 100) }} >
<div>{String(yp.YTF_portion).slice(2)}%</div>
</div> */}