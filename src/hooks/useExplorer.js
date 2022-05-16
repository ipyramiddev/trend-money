export const viewAddressLink = (contractAddress) => {
    return `https://explorer.celo.org/address/${contractAddress}/transactions`;
}

// const formatLink = (base_url,address) => {


const UNIV2_INFO_BASE_URL = 'https://v2.info.uniswap.org/#/';
// const 

export const uniV2PoolLink = (poolAddress) => {
    return `${UNIV2_INFO_BASE_URL}/pools/${poolAddress}`;
}

export const mobiPoolLink = (poolAddress) => {
    return viewAddressLink(poolAddress);
}

const UBE_INFO_BASE_URL = 'https://info.ubeswap.org';
export const ubePoolLink = (poolAddress) => {
    return `${UBE_INFO_BASE_URL}/pair/${poolAddress}`;
}