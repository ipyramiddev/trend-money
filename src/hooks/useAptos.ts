import { AptosClient, AptosAccount, FaucetClient, BCS, Types, TxnBuilderTypes, HexString, TokenClient } from "aptos";

import { BaseContract } from "ethers";
import { type } from "os";
import { aSwap } from "./useAnime";
import { aptinSupplyPayload } from "./useAptin";
const DEV_NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const TEST_NODE_URL = "https://fullnode.testnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";



const tClient = new AptosClient(TEST_NODE_URL);
const dClient = new AptosClient(DEV_NODE_URL);
// const faucetClient = new FaucetClient(DEV_NODE_URL, FAUCET_URL);
// const tokenClient = new TokenClient(client);

export const useFaucet = async (account: AptosAccount) => {
    console.log("Fauceting account...");
    // const re = await faucetClient.
}

export const useClient = (nodeUrl:string=TEST_NODE_URL)=>{
    if(nodeUrl==TEST_NODE_URL){
        return tClient;
    }
    if(nodeUrl==DEV_NODE_URL){
        return dClient;
    }
    return tClient;
}

export const useTokenClient =(client:AptosClient=tClient)=>{

}



export const loadValidators =async (client=tClient) => {
    const validatorInfo = (await client.getAccountResource(new HexString("0x1"),"0x1::stake::ValidatorPerformance"))
    const validatorSet = (await client.getAccountResource(new HexString("0x1"),"0x1::stake::ValidatorSet"))
    const defaultConfig = (await client.getAccountResource(new HexString("0x1"), "0x1::staking_config::StakingConfig"))
    return {validatorInfo,validatorSet,defaultConfig}
}
export const loadCoin = async (coin:any,client=tClient) => {
    // const coinType = coin.address + "::" + coin.module + "::" + coin.types[0];
    const coinType = "0x1::aptos_coin::AptosCoin";
    const coin_info_type = "0x1::coin::CoinStore<" + coin.address + "::" + coin.module + "::" + coin.types[0] + ">"; 
    console.log("Loading coin: ", coinType)
    const coinInfo = (await client.getAccountResource(new HexString(coin.address), coin_info_type)) as Types.MoveResource
    console.log(coinInfo)
    return coinInfo
}

export const loadCoinList = async (coin_list:any[]) => {
    let coin_list_data = [];
    for (let i = 0; i < coin_list.length; i++) {
        const coin = coin_list[i];
        const coin_data = await loadCoin(coin);
        coin_list_data.push(coin_data)
    }
    return coin_list_data
    
}


// export const loadValidatorVotes = async (addr:string, vIndex:number) => {
//     const v = (await client.getAccountResource(new HexString(addr))
// }

export const mintCollection = async () => {}


// export const mintWagmi = async (account: AptosAccount) => {
//     const payload = {
//         type: "script_function_payload",
//         function: `${WAGGY_ADDY}`,
//     }
// }

export const loadPool = (pool:any) =>{
    if(pool.platform==="liquidSwap"){
        console.log("Start Loading pontem");
        // const pont =
    }

    if(pool.platform==="Anime.swap"){
        console.log("Start Loading anime");
        // const a = aSwap( 
        // const animePool = 

    }

    // for deployments of econia orderbooks
    if(pool.platform==="Econia"){
        console.log("Start Loading econia");
    }

    if(pool.platform==="Aptin"){
        console.log("Start Loading Aptin");
    }

    if(pool.platform==="Hippo"){
        console.log("Start Loading Hippo");
    }
}


export const sendTransaction = async (
    toAddr:string,
    sender:string,
    mod:string,
    func:string,
    generic_type_params: string[],
    args: any[]
    ) =>{
// Generate a transaction
const account = await window.martian.connect();
const f = `${toAddr}::${mod}::${func}`
// const func = 
// const sender = response.address;
const payload = {
    type: "entry_function_payload",
    function: f,
    type_arguments: generic_type_params,
    arguments: args
};

const default_options = {
    sender: sender,
    sequence_number: account.sequence_number,
    max_gas_amount: "6000",
    // gas_unit_price: "1",
    // gas_currency_code: "XUS",
    // Unix timestamp, in seconds + 10 seconds
    expiration_timestamp_secs: (Math.floor(Date.now() / 1000) + 10).toString(),
  }

console.log("OPTIONS",default_options);

const transactionRequest = await window.martian.generateTransaction(sender, payload,default_options);
const txnHash = await window.martian.signAndSubmitTransaction(transactionRequest);
// console.log(transactionRequest);
};



export const stringToHex= (text: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("");
  }

export const loadModules = async (address: string,client=tClient) => {
    const modules = await client.getAccountModules(address) as Types.MoveModuleBytecode[];
    return modules;
}

export const loadResources = async (address: string,client=tClient) => {
    const modules = await client.getAccountResources(new HexString(address)) as Types.MoveResource[];
    return modules;

}
