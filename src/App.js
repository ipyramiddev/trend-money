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
import Web3Modal from "web3modal";
import { networkParams } from "./networks";
import { toHex, truncateAddress } from "./utils";
import { ethers } from "ethers";
import { providerOptions } from "./providerOptions";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

  
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



  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);


  // HOME PAGE
  return (
    <div className="p-5 bg-blac text-white">
      <Helmet>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js" />
</Helmet>
      <div className="flex flex-col items-center">
        {/* <button className="rounded-lg w-70 font-2xl p-3 m-5 border-dashed border-white border-2 hover:bg-white hover:text-blac" >Connect Wallet</button> */}
        {/* <p><ConnectButton/> </p> */}
        {!account ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <button onClick={disconnect}>Disconnect</button>
          )}

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
