import { AptosClient } from "aptos"

const APTIN_V1="0xa529c1796eb7f6c959f2e6974395a231fe830b65f4583abb1a6a226de6af3ce7"


const FAUCET_MINT = "request"
const MODULE= "lend"
const BORROW = "borrow"
const SUPPLY = "supply"


const aptinSwap = () => {

}


export const aptinSupply=(client:AptosClient, symbol:string, q:number) =>{
    const payload = {
        type: "script_function_payload",
        function: `${APTIN_V1}::${MODULE}::${SUPPLY}`,
        type_arguments: [
        "0x1::aptos_coin::AptosCoin"],
        arguments: ["0xa529c1796eb7f6c959f2e6974395a231fe830b65f4583abb1a6a226de6af3ce7",10000]
    };
    console.log("aptin payload", payload);
    return payload;
}

export const aptinBorrow = (client: AptosClient,symbol:string,q:number) => {
    const payload = {
        type: "script_function_payload",
        function: `${APTIN_V1}::${MODULE}::${BORROW}`,
        type_arguments: [
        "0x1::aptos_coin::AptosCoin"],
        arguments: ["0xa529c1796eb7f6c959f2e6974395a231fe830b65f4583abb1a6a226de6af3ce7",q]
    };
    console.log("aptin payload", payload);
    return payload;
}
