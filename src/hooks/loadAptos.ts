import { AptosClient, HexString, Types } from "aptos"
import { loadTxs } from "./useTransaction";

export const loadAccount = async (account:string,client:AptosClient) => {
    const act = (await client.getAccountResources(new HexString(account))) as Types.MoveResource[];

    const txs = (await loadTxs(account,client));
    console.log("Act",act)
    return;
    // const coin = 

}