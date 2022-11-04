import { AptosClient } from "aptos"

import { SDK } from '@animeswap.org/v1-sdk';

// const sdk = new SDK({
//   nodeUrl: 'https://fullnode.devnet.aptoslabs.com', // Node URL
//   networkOptions: {
//     nativeCoin: '0x1::aptos_coin::AptosCoin', // Type of Native network token
//     modules: {
//       Scripts: '0xe73ee18380b91e37906a728540d2c8ac7848231a26b99ee5631351b3543d7cf2::AnimeSwapPoolV1', // This module is used for Swap
//       CoinInfo: '0x1::coin::CoinInfo', // Type of base CoinInfo module
//       CoinStore: '0x1::coin::CoinStore', // Type of base CoinStore module
//       DeployerAddress: '0xe73ee18380b91e37906a728540d2c8ac7848231a26b99ee5631351b3543d7cf2',  // Swap deployer address
//       ResourceAccountAddress: '0xe73ee18380b91e37906a728540d2c8ac7848231a26b99ee5631351b3543d7cf2', // Swap resource account address
//     },
//   }
// })

const ANIME_V1="0xe73ee18380b91e37906a728540d2c8ac7848231a26b99ee5631351b3543d7cf2"
// "0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c" old?

const FAUCET_MODULE = "FaucetV1"
const FAUCET_MINT = "request"
const ANIME_COINS_MODULE= "DemoTestCoinsV1"
const animeDeposit = () => {

}

// function animeSwapPayload(){

//     const txPayload = sdk.swap.addLiquidityPayload({
//         coinX: CoinsMapping.APTOS,
//         coinY: CoinsMapping.BTC,
//         amountX: amountIn,
//         amountY: output.amount,
//         slippage: 0.05, // 5%
//         deadline: 20,   // 20 minutes
//       })
//     return txPayload
// }


export async function aSwap(from_token:string,to_token:string,from_quantity:number){

    const APTOS = '0x1::aptos_coin::AptosCoin'
    const BTC = '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::BTC'
    const aptosAmount = 1e6
  
    // const output = await sdk.swap.swapRates({
    //   fromCoin: APTOS,
    //   toCoin: BTC,
    //   amount: aptosAmount,
    //   fixedCoin: 'from',  // fixed input coin
    //   slippage: 0.05,     // 5%
    // });
    // console.log("output:",output);
    // return output
    // const txPayload = sdk.swap.swapPayload({
    //     fromCoin: from_token,
    //     toCoin: to_token,
    //     fromAmount: from_quantity,
    //     toAmount: output.amount,
    //     fixedCoin: 'from',  // fixed input coin
    //     toAddress: '0xA11ce', // receive `toCoin` address. In the most case, should be the same as sender address
    //     slippage: 0.05,     // 5%
    //     deadline: 20,       // 20 minutes
    //   })
    //   return txPayload;
  

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


