// Create Explorer page to view tokens and their supply, unique wallets, and transactions
import React, { useState, useEffect } from 'react';

// const fullNodes = [
    import { AptosClient, AptosAccount, FaucetClient, BCS, TxnBuilderTypes } from "aptos";

// devnet is used here for testing
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);


const Explorer = () => {
    const [account, setAccount] = useState(null);
    const createAccount = async () => {
        const txs = await client.getTransactions({limit: 10});
        console.log(txs[0]);
        // const account = await client.createAccount();
        setAccount(txs);

    }

    return (<div>
        <h1>Explorer</h1>
        <div>
            <h2>Tokens</h2>
            
            {/* Render all tokens */}
            <button onClick={createAccount}>Create Account</button>
            {account && <div>
                <h3>Account</h3>
                <p>{toString(account)}</p>
                {/* <p>{account.balance}</p> */}
            </div>}
        </div>
    </div>
        );

        }

export default Explorer;


