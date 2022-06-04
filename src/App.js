import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import {getUbeInfo, getUbePoolInfo,loadU } from "./hooks/useUbe";
import DepositModal from "./modals/DepositModal";
import { gql } from '@apollo/client';

import SeamPool from "./components/pool/SeamPool.js";
import pool_data from './pool_data.js';
import UserHeader from "./components/UserHeader.js";
import UniPool from "./components/pool/UniPool.js";
import PlatformOverview from "./components/PlatformOverview";
function App() {

  const [poolData, setPoolData] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [provider, setProvider] = useState(null);
  const [selectedPool, setSelectedPool ] = useState(null);
  const [tokenData, setTokenData ] = useState(null);
  const [clients, setClients ] = useState(null);

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



  
  const [showDepositModal, setShowDepositModal] = useState(false);

  const toggleDepositModal = () => {
    setShowDepositModal(!showDepositModal);
  }

  // HOME PAGE
  return (
    <div className="static px-10 py-4 h-full bg-black text-white">
      <div className="">
        {showDepositModal? <DepositModal toggle={toggleDepositModal} />: null}
      </div>
      <div className="flex flex-col items-center ">
        {walletConnected ? null : (<button onClick={connectToMetamask} className="rounded-lg w-70 font-2xl p-3 m-5 border-dashed border-white border-2 hover:bg-white hover:text-blac" >Connect Wallet</button>)}
        {poolData != null ? (<div>
          <p>{poolData.total}</p>
        </div>) : null}
        {walletAddress!==""?<UserHeader walletAddress={walletAddress} walletBalance={walletBalance} />:null}
      </div>
      <div className="">
        {pool_data.seamPools.map((pool, index) => (
        (<SeamPool {...pool} i={index} key={index} toggleDepositModal={toggleDepositModal}/>)
        ))}
      </div>
    </div>
  );
}

export default App;
