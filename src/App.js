// import logo from './logo.svg';

// import abi from './abi.json';
// import { ethers } from 'ethers';
// import { Contract } from 'ethers';

// import Web3 from "web3";
// import Web3Modal from "web3modal";

import React, { useState,useEffect } from "react";
import { LineChart, Line } from 'recharts';
import PiePool from './components/PiePool.js';
import SeamPool from "./components/SeamPool.js";
import pool_data from './pool_data.js';
// import {ConnectButton} from "./components/ConnectButton";
import {Helmet} from "react-helmet";

  
function App() {

  const [poolData, setPoolData] = useState({
    poolName: "",
    poolTotalDeposits: "",
    poolAddress: "",
    poolBalance: "",
    poolTotalSupply: "",
  });

  const [user, setUser] = useState({
    userAddress: "",
    depositsBalance: "",
  });

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
    <div className="p-5 bg-blac text-white">
      <div className="flex flex-col items-center">
        <button className="rounded-lg w-70 font-2xl p-3 m-5 border-dashed border-white border-2 hover:bg-white hover:text-blac" >Connect Wallet</button>
        {/* <p><ConnectButton/> </p> */}
        

<p>{`Connection Status: `}</p>
            
      </div>

      <div className="flex-cols-2 ">

        <div className="rounded-xl p-1 border-dashed border-white border-2">
          <div className="rounded-xl p-3 border-dashed border-white border-2">
            <h1 className="text-white text-3xl">YETF Pool</h1>
            <div className="flex-cols-2">
              <div>
                <p className="opacity-70">Total deposits: </p>
              </div>
              <div>
                {/* <PiePool /> */}
              </div>
            </div>
              <SeamPool YETF={pool_data.YETF} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
