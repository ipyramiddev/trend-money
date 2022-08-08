
// const formatLink = (base_url,address) => {


const APTOS_EXPLORER = (network)=> `https://explorer.devnet.aptos.dev/?network=${network}`;
const APTOS_BASE_EXPLORER = `https://aptos-explorer.netlify.app/`;


const UNIV2_INFO_BASE_URL = 'https://v2.info.uniswap.org/#/';
const UBE_INFO_BASE_URL = 'https://info.ubeswap.org';

export const viewAddressLink = (contractAddress) => {
    return `https://explorer.celo.org/address/${contractAddress}/transactions`;
}

export const viewTxLink = (txHash) => {
    return `https://explorer.celo.org/tx/${txHash}`;
}

// export const viewAptosExplorer = (address,) => {

// }

export const aptosTxnLink = (txVersion) => {
    return APTOS_BASE_EXPLORER + `txn/${txVersion}`;
}



export const uniV2PoolLink = (poolAddress) => {
    return `${UNIV2_INFO_BASE_URL}/pools/${poolAddress}`;
}

export const mobiPoolLink = (poolAddress) => {
    return viewAddressLink(poolAddress);
}

export const ubePoolLink = (poolAddress) => {
    return `${UBE_INFO_BASE_URL}/pair/${poolAddress}`;
}