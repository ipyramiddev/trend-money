// import logo from './logo.svg';

// import abi from './abi.json';
// import { ethers } from 'ethers';
// import { Contract } from 'ethers';

// import Web3 from "web3";
// import Web3Modal from "web3modal";

import React, { useState,useEffect } from "react";
import { LineChart, Line } from 'recharts';
import PiePool from './components/pool/PiePool.js';
import SeamPool from "./components/pool/SeamPool.js";

import pool_data from './pool_data.js';

function App() {

  const [poolData, setPoolData] = useState({
    poolName: "",
    poolTotalDeposits: "",
    poolAddress: "",
    poolBalance: "",
    poolTotalSupply: "",
  });


  const [walletConnected, setWalletConnected] = useState(false);

  const pieData = {
    labels: [
      'usdc-pool@2x mobius',
      'CELO-MOBI @2x - pinata',
      'Yellow'
    ],
    datasets: [{
      label: 'Yp allocations',
      data: [30, 50, 20],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 5
    }]
  };

  
  // HOME PAGE
  return (
    <div className="px-10 py-4 bg-blac text-white">
      <div className="flex flex-col items-center ">
        <button className="rounded-lg w-70 font-2xl p-3 m-5 border-dashed border-white border-2 hover:bg-white hover:text-blac" >Connect Wallet</button>
        

    {/* <p>Connection Status: {walletConnected? (<p className="text-green">"Connected"</p>) : (<p className="opacity-40 text-center">Not Connected</p>)}</p> */}
            
      </div>

      <div className="flex-cols-2 ">

                   
              <SeamPool YETF={pool_data.YETF} />
          </div>
        
    </div>
  );
}

export default App;
