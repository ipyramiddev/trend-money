import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import { BigNumber } from 'ethers';
import MobiIcon from './MobiIcon';
import Stat from './Stat';
import Token from './Token';
import TokenStack from './TokenStack';
import { effective_cap_ratio,fees24hour } from '../hooks/fin';
import { UBE_OVERVIEW_QUERY } from '../hooks/queries/ubeQueries';
// import { UBE_TO

function TokenPriceList(){
    // const { open, setOpen } = useState(true);

    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 2)
    const time = yesterday.toLocaleDateString();

    const { loading, error, data } = useQuery(UBE_OVERVIEW_QUERY,
        { variables: { $day: time, $topN: 10 } });
        if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;

    const pairs = data.pairDayDatas;
    localStorage.setItem('ube_pairs', JSON.stringify(pairs));
    return data.pairDayDatas.slice(0,10).map((pairDayData,i) => {
        return (<div key={i} className="flex flex-row justify-between h-15 outline outline-dashed outline-2 my-2 mx-1 rounded-lg p-1 m-1">
            <div className="flex flex-row justify-start gap-2">
                <div className='pl-3 pr-1 '>
                    <TokenStack tokens = {[pairDayData.token0.symbol,pairDayData.token1.symbol]} />
                </div>
            </div>

                    <Stat key={i} color="lightPurple" format={true} value={pairDayData.dailyVolumeUSD} name="Vol 24h. USD"  />
                    <Stat key={i} color="green" format={true} value={pairDayData.reserveUSD} name="liq. (usd)"  />
                    <Stat key={i+i} format={true} value={pairDayData.dailyTxns} name="daily txs." color="yellow" />
                    <Stat key={i+i+i} format={true} unit="%"value={effective_cap_ratio(pairDayData.dailyVolumeUSD,pairDayData.reserveUSD)*100} name="24h cap." color="purple" />
                    <Stat key={i+i+i+i} format={true} value={fees24hour(pairDayData.dailyVolumeUSD,pairDayData.reserveUSD).usd_24h_return} name="24h fees." color="green" />
                    <ViewPair pairAddress={pairDayData.pairAddress}/>
                </div>
                )
    })
}

function ViewPair(props){
    const pairLink = `https://info.ubeswap.org/pair/${props.pairAddress}`
    return(
        <div>
        <a href={pairLink}>
            <p className='font-underlined font-xs'>view-pair</p>
        </a>
        </div>
    );
}

export default function UbeTokenPrices(props) {
   
    return(
        <div className='flex flex-col max-w-2xl'>
            <p className='text-3xl text-center p-3 '>Ube Pairs Overview</p>
            <TokenPriceList />
        </div>
    )

}