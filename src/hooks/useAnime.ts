import { AptosClient } from "aptos"

const ANIME_V1="0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c"

const FAUCET_MODULE = "FaucetV1"
const FAUCET_MINT = "request"
const ANIME_COINS_MODULE= "DemoTestCoinsV1"
const animeDeposit = () => {

}

const animeSwap = () => {

}

export const animeFaucet = (client: AptosClient) => {
    const payload = {
        type: "script_function_payload",
        function: `${ANIME_V1}::${FAUCET_MODULE}::${FAUCET_MINT}`,
        type_arguments: [
        `${ANIME_V1}::${ANIME_COINS_MODULE}::USDT`],
        // arguments: [toAddr, "500"]
    };

}
