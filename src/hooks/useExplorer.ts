
// const formatLink = (base_url,address) => {


const APTOS_EXPLORER = (network: string)=> `https://explorer.devnet.aptos.dev/?network=${network}`;
const APTOS_BASE_EXPLORER = `https://aptos-explorer.netlify.app/`;


const UNIV2_INFO_BASE_URL = 'https://v2.info.uniswap.org/#/';
const UBE_INFO_BASE_URL = 'https://info.ubeswap.org';

export const viewAddressLink = (contractAddress: string) => {
    return `https://explorer.celo.org/address/${contractAddress}/transactions`;
}

export const viewTxLink = (txHash: string) => {
    return `https://explorer.celo.org/tx/${txHash}`;
}

// export const viewAptosExplorer = (address,) => {

// }

export const aptosTxnLink = (txVersion: string) => {
    return APTOS_BASE_EXPLORER + `txn/${txVersion}`;
}



export const uniV2PoolLink = (poolAddress: string) => {
    return `${UNIV2_INFO_BASE_URL}/pools/${poolAddress}`;
}

export const mobiPoolLink = (poolAddress: string) => {
    return viewAddressLink(poolAddress);
}

export const ubePoolLink = (poolAddress: string) => {
    return `${UBE_INFO_BASE_URL}/pair/${poolAddress}`;
}