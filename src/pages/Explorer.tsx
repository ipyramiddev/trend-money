// Create Explorer page to view tokens and their supply, unique wallets, and transactions
import React, { useState, useEffect } from 'react';
import '../index.css';
// const fullNodes = [
import { AptosClient, AptosAccount, FaucetClient, BCS, TxnBuilderTypes, HexString, Types } from "aptos";
import { dapps } from "data/dapps/dapp_data";
import BubbleSection from '../sections/BubbleSection';
import UserOverview from '../sections/UserOverview';
import { useFaucet, sendTransaction } from '../hooks/useAptos';
import SplineSection from '../sections/SplineSection';
import TxnList from 'sections/TxnList';
import ModuleExplorer from '../sections/modules/ModuleExplorer';
import UserExplorer from '../sections/UserExplorer';
import {connectToWallet} from '../hooks/wallet';
// import { AccountContextProvider } from 'context/AccountContext';
import Pools from '../sections/pools/Pools';
import DappsView from 'sections/dapps/DappsView';
import { loadTxs } from 'hooks/useTransaction';
import Validators from '../sections/staking/Validators';
import { useWeb3 } from '@fewcha/web3-react';
import { formatParam } from 'hooks/formatting';
// devnet is used here for testing
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

interface Props {
    isLoading: boolean;
    isConnected: boolean;
    // setConnected: (connected: boolean) => void;
}

const Explorer = () => {
    const { account, balance, isConnected, network,currentWallet } = useWeb3();
    useEffect(() => {
    }, [account,isConnected]);
    const [modules, setModules] = React.useState<Types.MoveModuleBytecode[]>([]);
    const tabs = [
        {name:'Modules + Dapps',id:'ModuleExplorer'},
        {name:'User Account ', id:'UserExplorer'},
        {name:'Dapps', id:'Dapps'},
    ]
    const [view, setView] = useState("ModuleExplorer");
    return (
    <div className="flex flex-col w-full p-3 m-2 items-center justify-center">
        <p className="text-3xl text-center">Explorer</p>
        <div className="flex flex-row items-start start">
            <div className="flex tabs flex-row seam-outline">
                {tabs.map((tab:any, index) => {
                    return (
                        <div 
                        onClick={() => setView(tab.id)}
                        className={`px-2 m-2 py-1 rounded-xl ${view === tab.id ? 'bg-white text-black' : 'outline outline-2 outline-white text-white'}`}>
                        <p className="text-2xl px-2 m-1 py-1 text-center justify-center">{tab.name}</p>
                        </div>)
                })
                }
            </div>
        </div>
        <div className="flex flex-col w-full items-center justify-start">
                <p className="account-outline">{formatParam(account?.address||'')}</p>
            {isConnected ? <p className="px-2 py-1 rounded-sm text-green1 outline-2 outline-green1 m-2">connected</p> : <p>not connected</p>}
            {view === "ModuleExplorer" ? <ModuleExplorer client={client} mod={modules}  />:null}
            {view === "UserExplorer"&&isConnected ? <UserExplorer account={account} client={client}/> :null}
            {view === "Pools" ? <Pools client={client} /> :null}
            {view === "Dapps" ? <DappsView /> :null}
        </div>
    </div>
    );

}

export default Explorer;