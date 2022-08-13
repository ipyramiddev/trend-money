import { AptosClient, AptosAccount, FaucetClient, BCS, Types, TxnBuilderTypes, HexString, TokenClient } from "aptos";
// import { AccountResource } from "aptos/dist/api/data-contracts";
import { BaseContract } from "ethers";
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
const tokenClient = new TokenClient(client);


export const useFaucet = async (account: AptosAccount) => {
    console.log("Fauceting account...");
    // const re = await faucetClient.

}


export const loadCoins = async (account:string) => {
    const resources  = await client.getAccountResources(new HexString(account));
    const accountResource = resources.find((r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
    // const coins = accountResource.coins;
    // const coins = (accountResource?.data as any)
    const balance = parseInt((accountResource?.data as any).coin.value);
    console.log(`Balance: ${balance}`);
    return balance;
}

export const loadCoinStore = async () => {
    const resources  = await client.getAccountResources(new HexString("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270"));

    
    // const coinEvents = resources[1] as Types.AccountResource;
    const aptCoin = resources[0] as Types.AccountResource;
    const coinEvents = resources.find((r) => (r.type as string)==="0x1::coin::CoinEvents") as Types.AccountResource;

    const coin_txs_count = ((coinEvents.data as any).register_events as any).counter as number;

    const deposit_count =0// ((aptCoin.data as any).deposit_events as any).counter as number;
    const withdraw_count =0// ((aptCoin.data?.withdraw_events as any).counter as number;
    const balance = (resources[0].data as any).coin.value;
    const coins = {
        coins: [],
        deposit_count,
        withdraw_count,
        balance,
        coin_txs_count,
        coin_txs:[]
    }
    console.log("COINS",coins);
    return coins
}


export const loadNfts = async (address:string) => {
    
    const resources = await client.getAccountResources(address) as Types.AccountResource[];
    console.log("NFT Resources: ", resources);
    try{
    const collections = resources.find(r => r.type === "0x3::token::TokenStore") as Types.AccountResource
    const data = collections.data as any;
    console.log("Collections: ", collections);
    const minted_count = (data.deposit_events as any).counter as number;
    const deposit_count = ((collections.data as any).deposit_events as any).counter as number;
    const sent_count = ((collections.data as any).withdraw_events as any).counter as number;
    const collection_data = (collections.data as any).collections as any[];
    
    return  {
        collections: collection_data,
        collection_count: 0,
        sent_count: sent_count,
        minted_count: minted_count,
        received_count: deposit_count,
        nfts: []
}
    }catch(e){
        console.log(e);
        return  {
            collections: [],
            collection_count: 0,
            minted_count: 0,
            received_count: 0,
            nfts: []
    }
    }

}


// export const mintWagmi = async (account: AptosAccount) => {
//     const payload = {
//         type: "script_function_payload",
//         function: `${WAGGY_ADDY},
//     }


export const sendTransaction= async (toAddr:string) =>{
// Generate a transaction
// const response = await window.martian.connect();
// const sender = response.address;
const payload = {
    type: "script_function_payload",
    function: "0x1::coin::transfer",
    type_arguments: ["0x1::aptos_coin::AptosCoin"],
    arguments: [toAddr, "5000"]
};
const transactionRequest = await window.martian.generateTransaction("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270", payload);
const txnHash = await window.martian.signAndSubmitTransaction(transactionRequest);
console.log(transactionRequest);
};

export const stringToHex= (text: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("");
  }

export const loadModules = async (address: string) => {
    const modules = await client.getAccountModules(address) as Types.MoveModule[];
    return modules;

}



// export const hexToString= (hex: string) => {
//     const decoder = new TextDecoder();
//     const bytes = hex.match(/.{2}/g).map((h) => parseInt(h, 16));
//     return decoder.decode(new Uint8Array(bytes));
//   }