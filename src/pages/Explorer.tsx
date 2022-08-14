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
    const [txs, setTxs] = React.useState<Types.Transaction[]>([]);
    const [userProps, setUserProps] = useState<UserProps | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const [userAccount, setUserAccount] = useState<Types.AccountData | null>(null);
    const createAccount = async () => {
        // const acct = 
        const res = await (window as any).martian.connect();  
        console.log("RES",res);
        const act =  (await client.getAccount(res.address)) as Types.AccountData;

        const address = res.address;

        const txs = await client.getTransactions();
        const balance = await loadCoins(address);
        const nfts = await loadNfts(address);
        const resources =  (await window.martian.getAccountResources(address)) as Types.MoveResource[];
        console.log("RESOURCES",resources);
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
        if(!window.martian.isConnected()){
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
    
    
    const connect =  () => {
        window.martian.connect().then((res:any) => {
            console.log("connected");
            setConnected(true);
        }).catch((err:any) => {
            console.log(err);
            setConnected(false);
        })
    }



    const loadTxs = (address:string) => {
        client.getAccountTransactions(address).then((txs: Types.Transaction[]) => {
            
            setTxs(txs.reverse());
            console.log(txs);
        }).catch((err:any) => {
            console.log(err);
        }).finally(() => {
            console.log("done");
        })
    }



    return (<div className="items-center w-full justify-center">
        <p className="text-3xl text-center">Explorer</p>
        <div className="flex flex-col items-center justify-center">
            {connected ? <p className="px-2 py-1 rounded-sm text-green1 outline-2 outline-green1 m-2">connected</p> : <p>not connected</p>}

            {userProps ? 
            
            <UserExplorer userProps={userProps}/>:null}
            {!connected ?<button className="seam-button m-3" onClick={connect}>Connect</button>
            :
            <div>
                <button className="seam-button m-3" onClick={()=>loadTxs("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270")}>Load user Txs</button>
            </div>}
      
            {/* <BubbleSection dapps={dapps}/> */}

        </div>
            <div className='module-container '>
                {userProps!=null ?
            <ModuleExplorer client={client} mod={modules}/>
            :null}
            </div>
    </div>
    );

}

export default Explorer;


