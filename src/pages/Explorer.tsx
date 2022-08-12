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
import ModuleExplorer from 'sections/ModuleExplorer';
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
    const [txs, setTxs] = React.useState<Types.OnChainTransaction[]>([]);
    const [userProps, setUserProps] = useState<UserProps | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    
    const createAccount = async () => {
        // const acct = 
        // const res = await (window as any).martian.connect();  
        // const txs = await client.getTransactions();
        const balance = await loadCoins("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270");
        const nfts = await loadNfts("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270");
        // const coins = await loadCoinStore();
        
        console.log(txs);
        const user_txs = [];
        for (const tx of txs) {
            if (tx.type === "user_transaction") {
                console.log(tx);
                try {
                    user_txs.push(tx as Types.OnChainTransaction);
                }
                catch (e) {
                    console.log(e);
                }

            }
        }
        setTxs(user_txs);
        setUserProps({
            connected: true,
            user: {
                address: "0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270",
                nfts: {
                    collection_count: nfts.collection_count,
                    minted_count : nfts.minted_count,
                    collections:nfts.collections,
                    nfts : [],
                },
                coins: {
                    balance: balance,
                },
                // balance: balance,
                txns: user_txs
            }
    });

}
    useEffect(() => {
        if(!window.martian.isConnected())
        console.log(" wallet not connected");
        window.martian.connect().then(() => {
            console.log("connected");
            setConnected(true);
        });
        
        createAccount();
    }, []);

    const [modules, setModules] = React.useState<Types.MoveModule[]>([]);
    
    
    const connect =  () => {
        window.martian.connect().then(() => {
            console.log("connected");
            setConnected(true);
        }).catch((err:any) => {
            console.log(err);
            setConnected(false);
        })
    }



    const loadTxs = (address:string) => {
        client.getAccountTransactions(address).then((txs: Types.OnChainTransaction[]) => {
            
            setTxs(txs.reverse());
            console.log(txs);
        }).catch((err:any) => {
            console.log(err);
        }).finally(() => {
            console.log("done");
        })
    }



    // const loadTokenRegistry = () => {
    return (<div className="items-center justify-center">
        <p className="text-5xl text-center">Account Explorer</p>
        <div className="flex flex-col items-center justify-center">
            {connected ? <p className="px-2 py-1 rounded-sm bg-green1 bg-opacity-40 m-2">connected</p> : <p>not connected</p>}

            {userProps ? 
            <div className='flex flex-row items-center justify-center px-2'>
            <UserOverview {...userProps} />
            <TxnList txns={txs} address={"0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270"}/>
            </div>:null}
            {!connected ?<button className="seam-button m-3" onClick={connect}>Connect</button>
            :
            <div>
                <button className="seam-button m-3" onClick={()=>loadTxs("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270")}>Load user Txs</button>
            {/* <button className="seam-button m-3" onClick={()=>loadModules("0x1")}>Load Modules</button> */}
            </div>}
      
            <div className=''>
            <ModuleExplorer client={client} mod={modules}/>
            <BubbleSection dapps={dapps}/>
            </div>

        </div>
    </div>
    );

}

export default Explorer;


