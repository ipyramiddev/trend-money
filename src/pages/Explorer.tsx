// Create Explorer page to view tokens and their supply, unique wallets, and transactions
import React, { useState, useEffect } from 'react';

// const fullNodes = [
import { AptosClient, AptosAccount, FaucetClient, BCS, TxnBuilderTypes } from "aptos";
import { dapps } from "../dapp_data";
import BubbleSection from '../sections/BubbleSection';
import UserOverview from '../sections/UserOverview';
import { loadCoins, loadNfts, loadCoinStore, useFaucet, sendTransaction } from '../hooks/useAptos';
// devnet is used here for testing
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);


const Explorer = () => {
    const [txs, setTxs] = useState<any>([]);
    const [userProps, setUserProps] = useState<UserProps | null>(null);
    
    // const updateUserProps =  () => {

    const createAccount = async () => {
        const txs = await client.getTransactions({ address: "0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270" }, { limit: 10 });
        const balance = await loadCoins("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270");
        const nfts = await loadNfts("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270");
        const coins = await loadCoinStore();
        console.log(txs);
        const user_txs = [];
        for (const tx of txs) {
            if (tx.type === "user_transaction") {
                console.log(tx);
                user_txs.push(tx);
            }
        }
        setTxs(user_txs);
        setUserProps({
            connected: true,
            user: {
                address: "0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270",
                balance: balance,
                nfts: {
                    collection_count: nfts.collection_count,
                    minted_count : nfts.minted_count,
                    collections: [],
                    nfts : [],
                },
                coins: coins
            }


    });

}
    useEffect(() => {
        // createAccount();
    }, []);



    return (<div>
        <p className="text-5xl text-center">Explorer</p>
        <div>
            {userProps && <UserOverview {...userProps} />}
            
            {/* <UserOverview connected={true} user={userProps} /> */}
            <button className="seam-button m-3" onClick={createAccount}>Create Account</button>
            <button className="seam-button m-3" onClick={loadCoins}>load coins</button>
            <button className="seam-button m-3" onClick={loadNfts}>load Nfts</button>
            <button className="seam-button m-3" onClick={sendTransaction}>load Nfts</button>
            <h2>Tokens</h2>
            {txs.map(tx => {
                return (<div className="seam-outline">
                    <p>{tx.type}</p>
                    <p> Gas Used: {tx.gas_used}</p>
                    <p>{tx.payload.function}</p>
                </div>)
            }
            )}
            {/* Render all tokens */}

            <div className="flex flex-row justify-between">
                <input type="text" placeholder="address"/>
            </div>
            {/* <BubbleSection dapps={dapps}/> */}
        </div>
    </div>
    );

}

export default Explorer;


