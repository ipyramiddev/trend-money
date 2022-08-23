// Create Explorer page to view tokens and their supply, unique wallets, and transactions
import React, { useState, useEffect } from 'react';
import '../index.css';
// const fullNodes = [
import { AptosClient, AptosAccount, FaucetClient, BCS, TxnBuilderTypes, HexString, Types } from "aptos";
import { dapps } from "../dapp_data";
import BubbleSection from '../sections/BubbleSection';
import UserOverview from '../sections/UserOverview';
import { loadCoins, loadNfts, loadCoinStore, useFaucet, sendTransaction } from '../hooks/useAptos';
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
    
    const [userProps, setUserProps] = useState<UserProps | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const { account, balance, isConnected, network,currentWallet } = useWeb3();
    const [userAccount, setUserAccount] = useState<Types.AccountData | null>(null);
    const createAccount = async () => {
        const res = await (window as any).martian.connect();
        console.log("RES", res);
        const act = (await client.getAccount(res.address)) as Types.AccountData;
        const address = res.address;
        const balance = await loadCoins(address);
        const nfts = await loadNfts(address);
        const resources = (await window.martian.getAccountResources(address)) as Types.MoveResource[];
        console.log("RESOURCES", resources);
        const txs = await loadTxs(account?.address,client);
        setUserProps({
            connected: true,
            user: {
                address: address,
                nfts: nfts,
                coins: {
                    balance: balance,
                },
                txns: txs
            }
        });
    }
    useEffect(() => {
        createAccount();
    }, []);
    const [modules, setModules] = React.useState<Types.MoveModuleBytecode[]>([]);
    const tabs = [
        {name:'Modules + Dapps',id:'ModuleExplorer'},
        {name:'User Account ', id:'UserExplorer'},
        {name:'Node Overview ', id:'NodeExplorer'},
        {name:'Pools', id:'Pools'},
        {name:'Dapps', id:'Dapps'},
        {name:'Validators+staking', id:'Validators'},
    ]
    const [view, setView] = useState("ModuleExplorer");
    return (
    <div className="items-center justify-center">
        <p className="text-3xl text-center">Explorer</p>
        <div className="flex flex-row items-center justify-center">
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

        <div className="flex flex-col  w-full items-center justify-start">
                <p>{account?.address}</p>
            {isConnected ? <p className="px-2 py-1 rounded-sm text-green1 outline-2 outline-green1 m-2">connected</p> : <p>not connected</p>}
            {view === "ModuleExplorer" ? <ModuleExplorer client={client} mod={modules}  />:null}
            {view === "UserExplorer" && userProps ? <UserExplorer userProps={userProps} client={client}/> :null}
            {view === "Pools" ? <Pools client={client} /> :null}
            {view === "Dapps" ? <DappsView /> :null}
            {view === "Validators" ? <Validators /> :null}
            <div>
                </div>
        </div>
    </div>
    );

}

export default Explorer;


