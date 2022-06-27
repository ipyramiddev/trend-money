
import { gql } from '@apollo/client';

//token traded on dex
export const UBE_TOKEN = gql`
    fragment UBEToken on Token {
        id
        name
        symbol
    }
`;

export const UBE_PAIR = gql`
    ${UBE_TOKEN}
    fragment UBEPair on Swap {
        id
        date
        reserve0
        reserve1
        reserveUSD
        volumeUSD
    }
`;

export const UBE_INFO = gql`
    fragment UBEInfo on SystemInfo {
        id
        exchangeCount
        tokenCount
        updated
    }
`;


export const UBE_PAIR_HOURLY_VOLUME = gql`
    fragment UBEPairHourlyVolume on PairHourData {
        id
        swap
        timestamp
        volume
    }
`;

