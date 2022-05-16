import React, { useState,useEffect } from "react";
import { ethers, BigNumber } from "ethers";
// import PiePool from './components/pool/PiePool.js';
import SeamPool from "./components/pool/SeamPool.js";
import pool_data from './pool_data.js';
import PvChart from "./components/graphs/LineChart.js";
import UserHeader from "./components/UserHeader.js";
import {getPool} from "./hooks/useUni.js";
import UniPool from "./components/pool/UniPool.js";
import SubSeam from "./components/pool/SubSeam.js";
function App() { 

  const [poolData, setPoolData] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [provider, setProvider ] = useState(null);

  const connectToMetamask = async () => {
    if (!walletConnected) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const balanceInEther = ethers.utils.formatEther(balance);
    const block = await provider.getBlockNumber();
    // const pool = await getPool(provider);
    setWalletConnected(true);
    setProvider(provider);
    setWalletAddress(accounts[0]);
    // getPool(provider).then(data => {
    //   console.log("pool data",data);z
      // setPoolData(pool);
      
    // });
    setWalletBalance(balanceInEther);
    
    }
  }

  // const loadBalances = async () => {
  //   if (walletConnected) {

  const loadPoolData = async (pool_address) => {
    // if (provider) {
      const data = await getPool(provider, pool_address);
      
      setPoolData(data);
    // }
  }


  const [selectedAsset, setSelectedAsset] = useState("CELO");

  // HOME PAGE
  return (
    <div className="px-10 py-4 h-full bg-black text-white">
      <div className="flex flex-col items-center ">
        
        {walletConnected?null:(<button onClick={connectToMetamask} className="rounded-lg w-70 font-2xl p-3 m-5 border-dashed border-white border-2 hover:bg-white hover:text-blac" >Connect Wallet</button>)}
        {/* {walletAddress} */}
        
        {walletConnected? (<button onClick={loadPoolData} className="rounded-lg w-70 font-2xl p-3 m-5 border-dashed border-white border-2 hover:bg-white hover:text-blac" >Get Pools</button>) : null}
        {poolData!=null ? (<div>
          
          <p>{poolData.total}</p>
        </div>) : null}
        <UserHeader walletAddress={walletAddress} walletBalance={walletBalance} />
    {/* <p>Connection Status: {walletConnected? (<p className="text-green">"Connected"</p>) : (<p className="opacity-40 text-center">Not Connected</p>)}</p> */}
            
      </div>

      <div className="flex-cols-2 ">
        ( <SeamPool {...pool_data.YETF} />)
              {/* <SeamPool  pool={poolData}/> */}

              
          </div>
        
    </div>
  );
}

export default App;
