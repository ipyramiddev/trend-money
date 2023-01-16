import { AptosClient, HexString, Types,TokenClient } from "aptos"
import { loadTxs } from "./useTransaction";

const unpackCoin = (coin:any) => {
    if (coin.type.includes("<")) {
        const t = coin.type.split("<")[1].split(">")[0];
        const inner = inners(t);
        return {address:inner.address,mod:inner.mod,name:inner.name
            ,n:coin.data.value
        
        }
    }
    const address = coin.type.split("::")[0];
    const mod = coin.type.split("::")[0];   

}

const unpackToken = (coin:any) => {
    console.log("Coin",coin)

}

const inners = (coin:any) => {
    const address = coin.split("::")[0];
    const mod = coin.split("::")[1];
    const name = coin.split("::")[2];
    return {address,mod,name}
}
export const loadAccount = async (account:string,client:AptosClient) => {
    const act = (await client.getAccountResources(new HexString(account))) as Types.MoveResource[];
 
    // const txs = (await loadTxs(account,client));
    console.log("Act",act)
    let coin_balances = [];
    let token_balances = [];
    const coin_stores = act.filter((r) => r.type.includes("CoinStore"));
    const token_stores = act.filter((r) => r.type.includes("TokenStore"));
    for (const coin_store of coin_stores) {
        const new_coin = unpackCoin(coin_store);
        coin_balances.push(new_coin);

    }
    for (const token_store of token_stores) {
        const new_token = unpackToken(token_store);
        token_balances.push(new_token);
        
    }
    console.log("Coin Balances",coin_balances);
    console.log("Token Balances",token_balances);
    // const interesting_resources = [
    //     "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
    // ]
    // const resource_1 = (await client.getAccountResource(new HexString(account), new HexString("0x1"))) as Types.MoveResource;
    return;


}

