import { BASE_TYPES } from "BaseStyles";
import WindowWrapper from "components/etc/WindowWrapper";
import Token from "components/Token";
import React, { useState } from "react";

const SeamPass = () => {
    return (
        <div className="w-full max-h-full m-10 items-center">
            <SeamPassNft />
        </div>
    )
}

const PassDetails = () => {
    return (
        <div className="space-y-32 pt-5 text-white justify-center items-center">
            <div className="mt-32 justify-center">
                <p className={BASE_TYPES.BASE_T3}>Collection Info + Utility</p>
            </div>
            <div className="flex flex-wrap justify-center">
                <div className={BASE_TYPES.BASE_BOX}>
                <p className={BASE_TYPES.BASE_T2}>Premium Data Indexers</p>
                <span className="inline">
                <p className={BASE_TYPES.BASE_T4}>The Seam Explorer includes premium features that require the Seam Pass to access. One of these features is SeamQL, an Aptos-based query language to group transactions and perform database operations.</p>
                </span>
                </div>

                <div className={BASE_TYPES.BASE_BOX}>
                    <p className={BASE_TYPES.BASE_T2}>Strategy Builder + Simulator</p>
                    <p className={BASE_TYPES.BASE_T4}>Navigate SEAMlessly through multiple dapps on the aptos via our dapp explorer and compose complex DeFi positions. This will be done through our Strategy Simulator and Composer </p>
                </div>

                <div className={BASE_TYPES.BASE_BOX}>
                    <p className={BASE_TYPES.BASE_T2}>Automatic Raffle Entries</p>
                    <p className={BASE_TYPES.BASE_T4}>Holders of the Seam Will be elible to recieve an 
                    Airdrop of the SEAM token. In addition holders will get exculsive whitelist opprotunities from our many partner projects as well as giveaways from top exisiting collections.
                    </p>
                </div>
                <div className={BASE_TYPES.BASE_BOX}>
                    <p className={BASE_TYPES.BASE_T2} >Airdrop + Whitelists</p>
                    <p className={BASE_TYPES.BASE_T4}> Airdrop of the SEAM token. In addition holders will get exculsive whitelist opprotunities from our many partner projects as well as giveaways from top exisiting collections.</p>
                </div>
            </div>
        </div>
    )
}


const SeamPassNft = () => {
    const [totalMinted, setTotalMinted] = useState(0);
    const totalSupply = 1000;
    return (
        <div className="m-20 items-center">
            <div className={BASE_TYPES.BASE_WINDOW}>

                <p className="font-sans Dank Mono text-center text-2xl">Introducing</p>
                <p className={BASE_TYPES.BASE_T1 + " font-sans Dank Mono"}>The SEAM Pass</p>
                <div className='relative'>
                    <div className='absolute top-0 left-10 w-30 p-3 seam-outline'>
                        <p className='text-3xl font-bold'>Seam Pass</p>
                        <p> {totalMinted}/{totalSupply} Minted</p>
                        <p className="text-center text-xl opacity-70">Mint Price</p>
                        <div className="flex flex-row items-center justify-center p-3">
                            <p className="text-3xl text-bold ">1 APT</p>
                            <Token token="APT" />
                        </div>
                        <button className={BASE_TYPES.BASE_BUTTON}>
                            Mint
                        </button>
                    </div>
                    <iframe src='https://my.spline.design/seampass-6cde71b57e69fc2a8a038f4f97318163/' width='100%' height='800px' />
                    {/* DO NOT DELETE */}
                    <div className='w-full h-20 bg-black absolute bottom-0' />
                </div>
            </div>
            <PassDetails />
        </div>
    );
}

export default SeamPass