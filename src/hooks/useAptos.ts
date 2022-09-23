import { AptosClient, AptosAccount, FaucetClient, BCS, Types, TxnBuilderTypes, HexString, TokenClient } from "aptos";

import { BaseContract } from "ethers";
import { aSwap } from "./useAnime";
import { aptinSupplyPayload } from "./useAptin";
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";



const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
const tokenClient = new TokenClient(client);
const WAGGY_ADDY = '0x84BCEA0377544E7B6ACB57CE120A74EF0D72C2F312138A99D42E46D2A4656F86';

export const useFaucet = async (account: AptosAccount) => {
    console.log("Fauceting account...");
    // const re = await faucetClient.
}

export const loadValidators =async () => {
    const validatorInfo = (await client.getAccountResource(new HexString("0x1"),"0x1::stake::ValidatorPerformance"))
    const validatorSet = (await client.getAccountResource(new HexString("0x1"),"0x1::stake::ValidatorSet"))
    const defaultConfig = (await client.getAccountResource(new HexString("0x1"), "0x1::staking_config::StakingConfig"))
    return {validatorInfo,validatorSet,defaultConfig}
}

// export const loadValidatorVotes = async (addr:string, vIndex:number) => {
//     const v = (await client.getAccountResource(new HexString(addr))
// }

export const mintCollection = async () => {}


export const mintWagmi = async (account: AptosAccount) => {
    const payload = {
        type: "script_function_payload",
        function: `${WAGGY_ADDY}`,
    }
}

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
    generic_type_params: any[],
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
    sender: account.address.hex(),
    // sequence_number: account.sequence_number,
    max_gas_amount: "60000",
    gas_unit_price: "1",
    gas_currency_code: "XUS",
    // Unix timestamp, in seconds + 10 seconds
    expiration_timestamp_secs: (Math.floor(Date.now() / 1000) + 10).toString(),
  }

console.log("OPTIONS",default_options);

// const payload = aptinSupplyPayload("APT",5444)
// const payload = aSwap("0x1::
const transactionRequest = await window.martian.generateTransaction(sender, payload,default_options);
const txnHash = await window.martian.signAndSubmitTransaction(transactionRequest);
// console.log(transactionRequest);
};



export const stringToHex= (text: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("");
  }

export const loadModules = async (address: string) => {
    const modules = await client.getAccountModules(address) as Types.MoveModuleBytecode[];
    return modules;
}

export const loadResources = async (address: string) => {
    const modules = await client.getAccountResources(new HexString(address)) as Types.MoveResource[];
    return modules;

}
