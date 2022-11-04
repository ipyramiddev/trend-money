import { AptosClient, HexString, Types } from "aptos"
import { loadTxs } from "./useTransaction";

export const loadAccount = async (account:string,client:AptosClient) => {
    const act = (await client.getAccountResources(new HexString(account))) as Types.MoveResource[];

    const txs = (await loadTxs(account,client));
    console.log("Act",act)
    return;


}



// LOAD COIN AGGREATOR 0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca