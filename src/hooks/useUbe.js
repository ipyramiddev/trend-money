import { BigNumber, ethers } from 'ethers'
import {ube_pool_data } from '../pool_data';
// 'function factory() external view returns (address)',
const UbeFactoryAbi = [
  'function allPairs(uint256) external view returns (address pair)',
  // 'getPair(address tokenA, address tokenB) external view returns (address pair)',
  'function allPairsLength() external view returns (uint)'
]

const ubePoolAbi_view = [
  'function name() external pure returns (string memory)',
  'function symbol() external pure returns (string memory)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function price0CumulativeLast() external view returns (uint256)',
  'function price1CumulativeLast() external view returns (uint256)',
  'function kLast() external view returns (uint256)'

]

// const 

export const poolAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc'
export const cUSD_UST_pool= '0x19260b9b573569dDB105780176547875fE9fedA3'
export const ube_celo_pool = '0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c'
// export const poolAddress = '0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c';
export const UNIV2_USDC_ETH_pool = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8'


export const getUbeInfo = async (provider) => {
  const factoryContract = new ethers.Contract(ube_pool_data.factory, UbeFactoryAbi, provider);
  const factoryData = {
    // factory: await poolContract.factory(),
    pairs: await factoryContract.allPairs(2),
    pair_count: (await factoryContract.allPairsLength()).toNumber(),
    pool_address: ube_pool_data.pool_address,
    
  }
    console.log("factoryInfo(UBE)", factoryData);
  return factoryData
}

export const getUbePoolInfo = async (provider,pool_address) => {
  const poolContract = new ethers.Contract(ube_celo_pool, ubePoolAbi_view, provider);
  const PoolImmutables = {
    token0: await poolContract.token0(),
    token1: await poolContract.token1(),
    name: await poolContract.name(),
    symbol: await poolContract.symbol(),
    pool_address: pool_address,
    // pool_tvl: (await poolContract.getReserves())[0].toString(),
    // weekly_volume: (await poolContract.price0CumulativeLast()),

  }
  console.log("poolInfo(UBE)", PoolImmutables);
  return PoolImmutables
}

// export const getUbeTokenInfo
