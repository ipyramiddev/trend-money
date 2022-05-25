import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import { BigNumber } from 'ethers';
import UbeIcon from './UbeIcon';
import UniIcon from './UniIcon';
// // import {UBE_SUBGRAPH} from utils;
import {format_large_number,format_date} from '../hooks/formatting';

const UBE_OVERVIEW_QUERY = gql`
    query GetubeOverview {
        ubeswapDayDatas(first:1 where:{id_gt: "18690"} ) {
            id
            date
            dailyVolumeUSD
          }
    }
`;

// // const


function UbeOverview(){
    const { loading, error, data } = useQuery(UBE_OVERVIEW_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;

    return data.ubeswapDayDatas.map((ubeSwapDayData,i) => {
        return (
            <div className="bg-opacity-90 bg-lightPurple rounded-lg p-2 m-2" key={i}>
                <p className='text-3xl p-2'> UBE </p>
                <div>
                <p className='text-2xl'>${format_large_number(ubeSwapDayData.dailyVolumeUSD)}</p>
                <p className='opacity-80 text-sm'>vol 24h.</p>
                </div>
                <div>
                <p>{format_date(ubeSwapDayData.date)}</p>
                <p className='text-sm opacity-80'>date</p>
                </div>
            </div>
        )
    })

}




function PlatformOverview() {
    
    
            return (
                <div className=''>
                    
                        <UbeOverview />

                    <div>
                        {/* <p className='text-2xl p-2'> Mobius </p>
                        <p>{ubeSwapDayData.id}</p>
                        <p>{ubeSwapDayData.dailyVolumeUSD}</p> */}
                        {/* <p>{info.daily}</p> */}
                        {/* <p>{info.exchangeCount}</p> */}
                        {/* <p>{info.tokenCount}</p> */}
                        {/* <p>{info.updatedAtBlock}</p> */}
                        {/* <p>{info.totalLiquidityUSD}</p> */}

                    </div>
                </div>
            )
        
    

}

export default PlatformOverview;