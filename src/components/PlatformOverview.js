import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import { BigNumber } from 'ethers';
import UbeIcon from './UbeIcon';
import UniIcon from './UniIcon';
// // import {UBE_SUBGRAPH} from utils;

const mobius_OVERVIEW_QUERY = gql`
    query GetUniv2Overview {
        systemInfos(){
            id
            exchangeCount
              tokenCount
              updatedAtBlock
              updated
          updatedAtTransaction
          }

    }
`;

const UBE_OVERVIEW_QUERY = gql`
    query GetubeOverview {
        ubeSwapDayDatas(first: 1, orderBy: updatedAtTransaction_DESC) {
            id
            dailyVolumeCELO
            daulyVolumeUSD
            totalLiquidityUSD
              tokenCount
              updatedAtBlock
              updated
          }

    }
`;

// // const






function PlatformOverview() {
    const { loading, error, data } = useQuery(UBE_OVERVIEW_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;
    
        data.ubeSwapDayDatas.map((ubeSwapDayData, i) => {
            return (
                <div className='bg-opacity-20 bg-white rounded-lg p-2 m-2'>
                    <div className='absolute top-0 right-0 p-2'>
                        <UbeIcon />
                    </div>

                    <div>
                        <p className='text-2xl p-2'> Mobius </p>
                        <p>{ubeSwapDayData.id}</p>
                        {/* <p>{info.daily}</p> */}
                        {/* <p>{info.exchangeCount}</p> */}
                        {/* <p>{info.tokenCount}</p> */}
                        {/* <p>{info.updatedAtBlock}</p> */}
                        {/* <p>{info.totalLiquidityUSD}</p> */}

                    </div>
                </div>
            )
        })
    
    

}

export default PlatformOverview;