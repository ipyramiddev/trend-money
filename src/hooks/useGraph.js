import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import { format_large_number } from './formatting';
import { fees24hour,yearlyReturnm, effective_cap_ratio } from './hooks/fin';


const ube_QUERY = (pairList) => {
    return gql`
query GetUbePool {
    pairs(where: {id: {_in: ${pairList}}) {
            reserve0
            reserve1
            reserveUSD
            token0Price
            token1Price
            volumeUSD
            reserveCELO

            token0 {
                id
                name
                symbol
                decimals
                derivedCUSD
            }
            token1 {
                id
                name
                symbol
                decimals
                derivedCUSD
            }
        }
        pairDayDatas(orderBy: date, orderDirection: desc, first: 2
            where: {
              pairAddress: {_in: ${pairList}},
            }) {
        id
        date
        dailyVolumeUSD
        token0{
            id
            name
            symbol
        }
    }
    }
`};
