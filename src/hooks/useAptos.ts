import { AptosClient, AptosAccount, FaucetClient, BCS, Types, TxnBuilderTypes, HexString, TokenClient } from "aptos";
import { MoveModule, MoveModuleBytecode, MoveResource } from "aptos/dist/generated";

import { BaseContract } from "ethers";
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




export const mintWagmi = async (account: AptosAccount) => {
    const payload = {
        type: "script_function_payload",
        function: `${WAGGY_ADDY}`,
    }
}


export const sendTransaction= async (toAddr:string,sender:string) =>{
// Generate a transaction
// const response = await window.martian.connect();
// const sender = response.address;
const payload = {
    type: "script_function_payload",
    function: "0x1::coin::transfer",
    type_arguments: ["0x1::aptos_coin::AptosCoin"],
    arguments: [toAddr, "500"]
};
const transactionRequest = await window.martian.generateTransaction(sender, payload);
const txnHash = await window.martian.signAndSubmitTransaction(transactionRequest);
// console.log(transactionRequest);
};



export const stringToHex= (text: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("");
  }

export const loadModules = async (address: string) => {
    const modules = await client.getAccountModules(address) as MoveModuleBytecode[];
    return modules;

}
