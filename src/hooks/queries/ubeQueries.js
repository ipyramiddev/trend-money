import { gql } from '@apollo/client';

export const UBE_OVERVIEW_QUERY = gql`
        query GetubeOverview {
        ubeswapDayDatas(orderBy: date, orderDirection: desc, first:2 where:{id_gt: "18690"} ) {
            date

            id
            dailyVolumeUSD
            totalLiquidityUSD
    }
    }
`;


export const UBE_TOKENS_QUERY = gql`
        query GetUbeTokens {
        tokens(first:20) {
            id
            dailyVolumeUSD
            totalLiquidityUSD
        }
    }
`;