import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { useQuery } from '@apollo/react-hooks';
import { format_large_number } from './formatting';
import { fees24hour, yearlyReturnm, effective_cap_ratio } from './fin';


// const mobi_client = new ApolloClient({
//     uri: MOBI_SUBGRAPH,
//     cache: new InMemoryCache(),
//   })
  

// export const UBE_LIST_QUERY = (pairList) => {
//     return gql`
// query GetUbePools($pairList) {
//     pairs(where: {id: {_in: [$pairList}) {
//             reserve0
//             reserve1
//             reserveUSD
//             token0Price
//             token1Price
//             volumeUSD
//             reserveCELO

//             token0 {
//                 id
//                 name
//                 symbol
//                 decimals
//                 derivedCUSD
//             }
//             token1 {
//                 id
//                 name
//                 symbol
//                 decimals
//                 derivedCUSD
//             }
//         }
//         pairDayDatas(orderBy: date, orderDirection: desc, first: 2
//             where: {
//               pairAddress: {_in: $pairList},
//             }) {
//         id
//         date
//         dailyVolumeUSD
//         token0 {
//             id
//             name
//             symbol
//         }
//     }
// }
// `};

// export const loadUbeSubPools = async (pairList) => {
//     const q = await client
//         .query({
//           query: UBE_LIST_QUERY,
//             variables: {
//                 $pairList: pairList
//             }

//         })
        
//         .catch((err) => {
//           console.log('Error fetching data: ', err)
//         })
//         console.log('Subgraph data: ', q.data)
//         // return
//         return q.data.pairs;
    
// }
