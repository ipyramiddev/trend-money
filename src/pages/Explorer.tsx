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
import { AccountContextProvider } from 'contexts/AccountContext';
// devnet is used here for testing
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

const temp_context = {
    client: client,
    connected: false,
    account: null

}

interface Props {
    isLoading: boolean;
    isConnected: boolean;
    // setConnected: (connected: boolean) => void;
}

const Explorer = () => {
    const [txs, setTxs] = React.useState<Types.Transaction[]>([]);
    const [userProps, setUserProps] = useState<UserProps | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    
    const [userAccount, setUserAccount] = useState<Types.AccountData | null>(null);
    const createAccount = async () => {
        // const acct = 
        const res = await (window as any).martian.connect();
        console.log("RES", res);
        const act = (await client.getAccount(res.address)) as Types.AccountData;

        const address = res.address;

        const txs = await client.getTransactions();
        const balance = await loadCoins(address);
        const nfts = await loadNfts(address);
        const resources = (await window.martian.getAccountResources(address)) as Types.MoveResource[];
        console.log("RESOURCES", resources);
        // const nfts = resources.find(r => r.type === "0x3::token::TokenStore") as Types.AccountResource;
        // const coins = await loadCoinStore();

        console.log(txs);
        const user_txs = [];
        for (const tx of txs) {
            if (tx.type === "user_transaction") {
                // console.log(tx);
                try {
                    user_txs.push(tx as Types.Transaction);
                }
                catch (e) {
                    console.log(e);
                }

            }
        }
        setTxs(user_txs);
        // setUserAccount(act)
        setUserProps({
            connected: true,
            user: {
                address: address,
                nfts: nfts,
                coins: {
                    balance: balance,
                },
                // balance: balance,
                txns: user_txs
            }
        });

    }
    useEffect(() => {
        if (!connected) {
            console.log(" wallet not connected");
            window.martian.connect().then(() => {
                console.log("connected");
                setConnected(true);

            });
            return;
        }

        createAccount();
    }, []);

    const [modules, setModules] = React.useState<Types.MoveModuleBytecode[]>([]);


    const connect = () => {
        window.martian.connect().then((res: any) => {
            console.log("connected");
            setConnected(true);
        }).catch((err: any) => {
            console.log(err);
            setConnected(false);
        })
    }


    const loadTxs = (address: string) => {
        client.getAccountTransactions(address).then((txs: Types.Transaction[]) => {

            setTxs(txs.reverse());
            console.log(txs);
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => {
            console.log("done");
        })
    }

    const tabs = [
        {name:'Modules + Dapps',id:'ModuleExplorer'},
        {name:'User Account ', id:'UserExplorer'},
        {name:'Node Overview ', id:'NodeExplorer'}
    ]

    const [view, setView] = useState("ModuleExplorer");

    const switchTab = (tab:string) => {
        if (tab!==view) {
            setView(tab);
        }
    }
    

    return (
    <AccountContextProvider value={temp_context}>
    <div className="items-center justify-center">
        <p className="text-3xl text-center">Explorer</p>

        <div className="flex flex-row items-center justify-center">
            <div className="flex tabs flex-row seam-outline bg-white bg-opacity-80">
                {tabs.map((tab:any, index) => {
                    return (
                        <div 
                        onClick={() => setView(tab.id)}
                        className={`tab px-2  m-2 py-1 rounded-xl ${view === tab.id ? 'bg-white text-black' : 'outline outline-2 outline-white text-white'}`}>
                        <p className="text-2xl">{tab.name}</p>
                        </div>)
                })
                }
            </div>

        </div>

        <div className="flex flex-col  w-full items-center justify-start">
            {connected ? <p className="px-2 py-1 rounded-sm text-green1 outline-2 outline-green1 m-2">connected</p> : <p>not connected</p>}
            {!connected && !!userProps ? <button className="seam-button m-3" onClick={connect}>Connect</button>
                :
                null}
            {view === "ModuleExplorer" ? <ModuleExplorer client={client} mod={modules}  />:null}
            {view === "UserExplorer" && userProps ? <UserExplorer userProps={userProps} /> :null}
            <div>
                    <button className="seam-button m-3" onClick={() => loadTxs(userProps?.user.address ||'0x1')}>Load user Txs</button>
                </div>
        </div>
    </div>
    </AccountContextProvider>
    );

}

export default Explorer;


