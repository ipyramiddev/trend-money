import { gql } from '@apollo/client';
import { MOBI_TOKEN, MOBI_INFO, MOBI_PAIR } from '../../fragments/mobiFragments.js';

export const MOBI_OVERVIEW_QUERY = gql`
    ${MOBI_INFO}
    query GetMobiOverview {
        systemInfos(first: 2) {
            ...MobiInfo
        }
      
    }
`;


// export const MOBI_TOP_TOKENS_QUERY = gql`
//     ${MOBI_TOKEN}
//     query GetMobiTopTokens {
//         tokens (first: 5,
//     }        
// `;
