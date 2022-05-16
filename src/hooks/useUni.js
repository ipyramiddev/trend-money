import { Pool, Position } from '@uniswap/v3-sdk'
import { BigNumber, ethers } from 'ethers'
// 'function factory() external view returns (address)',
const poolImmutablesAbi = [
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  // 'function fee() external view returns (uint24)',
  'function totalSupply() external view returns (uint)',
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
    'function price0CumulativeLast() external view returns (uint)',
    'function price1CumulativeLast() external view returns (uint)',
  
]

export const poolAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc'
export const cUSD_UST_pool= '0x19260b9b573569dDB105780176547875fE9fedA3'
// export const poolAddress = '0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c';
export const UNIV2_USDC_ETH_pool = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8'


const tokenSymbols = {
  '0x765de816845861e75a25fca122bb6898b8b1282a': 'cUSD',
  '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73': 'cEUR',
  '0x471EcE3750Da237f93B8E339c536989b8978a438': 'CELO',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'USDC',
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': 'WETH',
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI',
}


// const async = require('async');

export const getPool = async (provider,pool_address) => {
  const poolContract = new ethers.Contract(poolAddress, poolImmutablesAbi, provider);
  const PoolImmutables = {
    // factory: await poolContract.factory(),
    token0: await poolContract.token0(),
    price0CumulativeLast: await poolContract.price0CumulativeLast(),
    price1CumulativeLast: await poolContract.price1CumulativeLast(),
    
    totalSupply: await poolContract.totalSupply(),
    // fee: await poolContract.fee(),

    token1: await poolContract.token1(),

    // price0CumulativeLast: await poolContract.price0CumulativeLast(),
    // fee: await poolContract.fee(),
   
  }

  const temp = {...PoolImmutables,
    pool_address: poolAddress,
    totalSupply: ethers.utils.formatEther(PoolImmutables.totalSupply),
    price0CumulativeLast: ethers.utils.formatEther(PoolImmutables.price0CumulativeLast),
    price1CumulativeLast: ethers.utils.formatEther(PoolImmutables.price1CumulativeLast),
    token0_name: tokenSymbols[PoolImmutables.token0],
    token1_name: tokenSymbols[PoolImmutables.token1]};
    
    console.log("pool immutables", temp);
  return temp
}

export const tokenName = async (tokenAddress) => {
  const tokenContract = new ethers.Contract(tokenAddress, ['function name() external view returns (string)']);
  const tokenName = await tokenContract.name();
  console.log("token name: ", tokenName);
  return tokenName
};





