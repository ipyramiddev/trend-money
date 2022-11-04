import { SDK } from '@pontem/liquidswap-sdk';

const sdk = new SDK({
  nodeUrl: 'https://fullnode.devnet.aptoslabs.com', // Node URL
  networkOptions: {
    nativeToken: '0x1::aptos_coin::AptosCoin', // Type of Native network token
    modules: {
      Scripts:
        '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::scripts', // This module is used for Swap
      CoinInfo: '0x1::coin::CoinInfo', // Type of base CoinInfo module
      CoinStore: '0x1::coin::CoinStore', // Type of base CoinStore module
    },
  }
})




export const swap = () =>{return}

