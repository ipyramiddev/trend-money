import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import {getUbeInfo, getUbePoolInfo } from "./hooks/useUbe";
// import PiePool from './components/pool/PiePool.js';
import SeamPool from "./components/pool/SeamPool.js";

import pool_data from './pool_data.js';
import PvChart from "./components/graphs/LineChart.js";
import UserHeader from "./components/UserHeader.js";
import { getPool,cUSD_UST_pool } from "./hooks/useUni.js";
import UniPool from "./components/pool/UniPool.js";
import SubSeam from "./components/pool/SubSeam.js";
import TokenPrices from "./components/TokenPrices";
import PlatformOverview from "./components/PlatformOverview";
function App() {

  const [poolData, setPoolData] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [provider, setProvider] = useState(null);
  const [selectedPool, setSelectedPool ] = useState(null);
  const [tokenData, setTokenData ] = useState(null);

  const connectToMetamask = async () => {
    if (!walletConnected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEther = ethers.utils.formatEther(balance);
      setWalletConnected(true);
      setProvider(provider);
      setWalletAddress(accounts[0]);
      setWalletBalance(balanceInEther);

    }
  }

  const loadPoolData = async () => {
    // const data = await getPool(provider, pool_address);
    // const tokenData = await fetchTokenData();
    const factoryData = await getUbeInfo(provider);
    const poolData = await getUbePoolInfo(provider,cUSD_UST_pool);
    setPoolData(factoryData);
    // setTokenData(tokenData);

  }

  const loadUbe = async () => {
    const factoryData = await getUbeInfo(provider);
    const ube_celo_pool = await getUbePoolInfo(provider,cUSD_UST_pool);
    console.log(ube_celo_pool)
  }


  const [selectedAsset, setSelectedAsset] = useState("CELO");

  // HOME PAGE
  return (
    <div className="static px-10 py-4 h-full bg-black text-white">
      <div className="">
      <TokenPrices  />
      </div>
      <div className="flex flex-col items-center ">
        {/* <PlatformOverview/> */}
        

        {walletConnected ? null : (<button onClick={connectToMetamask} className="rounded-lg w-70 font-2xl p-3 m-5 border-dashed border-white border-2 hover:bg-white hover:text-blac" >Connect Wallet</button>)}
        {/* {walletAddress} */}

        {walletConnected ? (
          <div>
            <form className="text-black">
              
                <select onChange={(e) => setSelectedPool(e.target.value)}>
                  <option value={cUSD_UST_pool}>cUSD _ut</option>
                  <option value="UNI">UNI</option>
                  <option value="SUB">SUB</option>
                </select>

            </form>

          <button onClick={loadPoolData} className="rounded-lg w-70 font-2xl p-3 m-5 border-dashed border-white border-2 hover:bg-white hover:text-blac" >Get Pools</button>
          </div>
          ) : null}
        {poolData != null ? (<div>

          <p>{poolData.total}</p>
        </div>) : null}
        <UserHeader walletAddress={walletAddress} walletBalance={walletBalance} />
        {/* <p>Connection Status: {walletConnected? (<p className="text-green">"Connected"</p>) : (<p className="opacity-40 text-center">Not Connected</p>)}</p> */}

      </div>

      <div className="flex-cols-2 ">
        {pool_data.seamPools.map((pool, index) => (
        (<SeamPool {...pool} i={index} key={index}/>)
        ))}
        <button onClick={loadUbe}>Load Ube</button>
      </div>

    </div>
  );
}

export default App;
