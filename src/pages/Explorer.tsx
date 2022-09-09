// Create Explorer page to view tokens and their supply, unique wallets, and transactions
import React, { useState, useEffect } from 'react';
import '../index.css';
// const fullNodes = [
import { AptosClient, AptosAccount, FaucetClient, BCS, TxnBuilderTypes, HexString, Types } from "aptos";
import ModuleExplorer from '../sections/modules/ModuleExplorer';
import UserExplorer from '../sections/UserExplorer';
// import { AccountContextProvider } from 'context/AccountContext';
import Pools from '../sections/pools/Pools';
import DappsView from 'sections/dapps/DappsView';
import { useWeb3 } from '@fewcha/web3-react';
import { formatParam } from 'hooks/formatting';
import { ExplorerTabView } from 'views/ExplorerTabView';
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
    const { account, balance, isConnected, network, currentWallet } = useWeb3();
    useEffect(() => {
    }, [account, isConnected]);
    const [modules, setModules] = React.useState<Types.MoveModuleBytecode[]>([]);
    const tabs = [
        { name: 'Modules + Dapps', id: 'ModuleExplorer' },
        { name: 'User Account ', id: 'UserExplorer' },
        { name: 'Dapps', id: 'Dapps' },
    ]
    const [view, setView] = useState("ModuleExplorer");
    return (
        <div className="flex flex-col w-full p-3 m-2 items-start justify-start">
            <p className="text-3xl text-center">Explorer</p>
            {/* <ExplorerTabView/> */}
            <div className="flex flex-row items-start justify-start start">
                <div className="flex flex-row items-start">
                    {tabs.map((tab: any, index) => {
                        return (
                            <div
                                onClick={() => setView(tab.id)}
                                className={`px-2 m-2 py-1 hover:opacity-100 rounded-xl ${view === tab.id ? 'underline font-bold' : 'opacity-70'}`}>
                                <p className="text-2xl underline px-2 m-1 py-1 text-center font- justify-center">{tab.name}</p>
                            </div>)
                    })
                    }
                </div>
            </div>
            <div className="flex flex-col w-full items-center justify-start">
                <p className="account-outline">{formatParam(account?.address || '')}</p>
                {isConnected ? <p className="px-2 py-1 rounded-sm text-green1 outline-2 outline-green1 m-2">connected</p> : <p>not connected</p>}
                {view === "ModuleExplorer" ? <ModuleExplorer client={client} mod={modules} /> : null}
                {view === "UserExplorer" && isConnected ? <UserExplorer account={account} client={client} /> : null}
                {view === "Pools" ? <Pools client={client} /> : null}
                {view === "Dapps" ? <DappsView /> : null}
            </div>
        </div>
    );

}

export default Explorer;

