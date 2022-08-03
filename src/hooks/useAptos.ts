import { AptosClient, AptosAccount, FaucetClient, BCS, Types, TxnBuilderTypes,HexString } from "aptos";
import { AccountResource } from "aptos/dist/api/data-contracts";
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
// const tempAccount = new AptosAccount({address: "0x0000000000000000000000000000000000000000", privateKey: "0x0000000000000000000000000000000000000000000000000000000000000000"});

// export const connectWallet = async () => {
//     console.log("Connecting wallet...");
// }

// const resourceMap = {



export const useFaucet = async (account: AptosAccount) => {
    console.log("Fauceting account...");
    // const re = await faucetClient.

}



export const loadCoins = async () => {
    const resources  = await client.getAccountResources(new HexString("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270"));
    const accountResource = resources.find((r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
    // const coins = accountResource.coins;
    // const coins = (accountResource?.data as any)
    const balance = parseInt((accountResource?.data as any).coin.value);
    console.log(`Balance: ${balance}`);
    return balance;
}

export const loadCoinStore = async () => {
    const resources  = await client.getAccountResources(new HexString("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270"));
    const coinStore = resources[0] as AccountResource;
    const coinEvents = resources[1] as AccountResource;
    const coin_txs_count = (coinEvents?.data as any).register_events as {counter: number};
    // console.log(coinStore.data.coin.value);
    const deposit_count = ((coinStore?.data as any).deposit_events as any).counter as number;
    const withdraw_count = ((coinStore?.data as any).withdraw_events as any).counter as number;
    const balance = (resources[0].data as any).coin.value;
    const coins = {
        coins: [],
        deposit_count,
        withdraw_count,
        balance,
        coin_txs_count,
        coin_txs:[]
    }
    console.log(coins);
    return coins
}


export const loadNfts = async (address:string) => {
    const collections =[] as any[];
    const resources = await client.getAccountResources("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270");
    console.log(resources);
    const collection_resources = resources[4].data as any;
    const collection_count = (collection_resources.create_collection_events as any).counter as number;
    const minted_count = (collection_resources.create_token_events as any).counter as number;
    console.log(`Collection count: ${collection_count}`);
    console.log(collection_resources);
    return  {
        collections: [],
        collection_count: collection_count,
        minted_count: minted_count,
        received_count: 0,
        nfts: []
}
}

export const sendTransaction= async () =>{
// Generate a transaction
const response = await window.martian.connect();
const sender = response.address;
const payload = {
    type: "script_function_payload",
    function: "0x1::coin::transfer",
    type_arguments: ["0x1::aptos_coin::AptosCoin"],
    arguments: ["0x96da8990a7230a82250e85d943ca95e2e9319e5558b0f544f2d7a6aad327e46f", "50"]
};
const transactionRequest = await window.aptos.generateTransaction(sender, payload);
console.log(transactionRequest);
};

export const stringToHex= (text: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("");
  }

// export const hexToString= (hex: string) => {
//     const decoder = new TextDecoder();
//     const bytes = hex.match(/.{2}/g).map((h) => parseInt(h, 16));
//     return decoder.decode(new Uint8Array(bytes));
//   }