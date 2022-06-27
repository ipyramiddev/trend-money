import { gql } from '@apollo/client';

//token traded on dex
export const MOBI_TOKEN = gql`
    fragment MobiToken on Token {
        id
        name
        symbol
    }
`;

export const MOBI_SWAP = gql`
    fragment MobiPair on Swap {
        id
        
    }
`;

export const MOBI_INFO = gql`
    fragment MobiInfo on SystemInfo {
        id
        exchangeCount
        tokenCount
        updated
    }
`;


export const MOBI_HOURLY_VOLUME = gql`
    fragment MobiHourlyVolume on HourlyVolume {
        id
        swap
        timestamp
        volume
    }
`;

export const MOBI_PAIR = gql`
${MOBI_HOURLY_VOLUME}
    fragment MobiPair on Swap {
        id
    }
    `