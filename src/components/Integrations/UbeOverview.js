import {UBE_OVERVIEW_QUERY} from '../../hooks/queries/ubeQueries.js';
import { format_tvl, format_large_number, format_date } from '../../hooks/formatting';
import UbeIcon from '../UbeIcon.js';
import { useQuery } from '@apollo/react-hooks';
function UbeOverview() {
    const { loading, error, data } = useQuery(UBE_OVERVIEW_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;

    return data.ubeswapDayDatas.slice(0, 1).map((ubeSwapDayData, i) => {
        return (
            <div className="bg-opacity-90 bg-lightPurple rounded-lg p-2 m-2" key={i}>
                <div className="flex flex-row gap gap-2 pb-5"><UbeIcon /><p className='text-3xl p-2'> UBE </p></div>
                <div>
                <p className="text-3xl" >TVL: {" "}{format_tvl(ubeSwapDayData.totalLiquidityUSD)}</p>
                </div>
                <div className="flex flex-row items-center xs:flex-col gap-2 text-sm inline opacity-80">
                    <div>
                        <p className='text-2xl'>${format_large_number(ubeSwapDayData.dailyVolumeUSD)}</p>
                        <p className='opacity-80 text-sm'>vol 24h.</p>
                    </div>
                    <div>
                        <p>{format_date(ubeSwapDayData.date)}</p>
                        <p className='text-sm opacity-80'>date</p>
                    </div>
                </div>
            </div>
        )
    })

}

export default UbeOverview;
