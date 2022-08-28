import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { connectToMetamask } from "./hooks/useWallet";
import DepositModal from "./modals/DepositModal";

import SeamPool from "./components/pool/SeamPool.js";
import pool_data from './pool_data.js';
import UserHeader from "./components/UserHeader.js";
import UniPool from "./components/pool/UniPool.js";
import PlatformOverview from "./components/PlatformOverview";
import SwitchView from "./sections/SwitchView";
function App() {

  const [poolData, setPoolData] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalances] = useState([]);
  const [provider, setProvider] = useState(null);
  

  
  const [showDepositModal, setShowDepositModal] = useState(false);



  const toggleDepositModal = () => {
    setShowDepositModal(!showDepositModal);
  }

  return (
    <div className="static px-10 py-4 h-full bg-black text-white">
      <div className="">
        {showDepositModal? <DepositModal toggle={toggleDepositModal} />: null}
      </div>
      <div className="flex flex-col items-center ">
        {/* {walletConnected ? null : (<button onClick={connectWallet} className="rounded-lg w-70 font-2xl p-3 m-5 border-dashed border-white border-2 hover:bg-white hover:text-blac" >Connect Wallet</button>)} */}
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
