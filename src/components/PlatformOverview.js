import { useQuery } from '@apollo/react-hooks';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import Stat from './Stat.js';
import { BigNumber } from 'ethers';
import UbeIcon from './UbeIcon';
import MobiIcon from './MobiIcon.js';
import { MOBI_TOKEN,MOBI_INFO, MOBI_PAIR } from '../fragments/mobius.js';
import Token from '../components/Token'
import UniIcon from './UniIcon';
// // import {UBE_SUBGRAPH} from utils;
import { format_large_number, format_date,format_tvl } from '../hooks/formatting';

const UBE_OVERVIEW_QUERY = gql`
        query GetubeOverview {
        ubeswapDayDatas(orderBy: date, orderDirection: desc, first:2 where:{id_gt: "18690"} ) {
            id
            date
            dailyVolumeUSD
            totalLiquidityUSD
    }
    }
`;

const mobiClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/d-mooers/mobius",
    cache: new InMemoryCache(),
})

const ubeClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap",
    cache: new InMemoryCache(),
})

const MOBI_OVERVIEW_QUERY = gql`
    ${MOBI_TOKEN}
    ${MOBI_INFO}
    ${MOBI_PAIR}
    
    query GetMobiOverview {
        systemInfos(first: 5) {
            ...MobiInfo
        }
        swaps(first: 5) {
            ...MobiPair
        }

        
        tokens(first:5) {
            ...MobiToken
        }



    }
`

function PlatStat(props) {
    return (
        <div className="text-left pr-2 text-white">
            <p className="text-2xl">{props.val}</p>
            <p className="opacity-40 text-sm">{props.title}</p>
        </div>
    )
}

function MobiOverview() {
    const { loading, error, data } = useQuery(MOBI_OVERVIEW_QUERY, { "client": mobiClient });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;
    const systemInfo = data.systemInfos[0];
    const tokens = data.tokens
    console.log(systemInfo)
    return (
        <div className="bg-opacity-90 bg-pink rounded-lg p-2 m-2" key={"mobi"}>
            <div className="flex flex-cols gap-4 justify-between px-4 m-2">
                <div>
                <div className="flex flex-row gap gap-2 pb-3 justify-between">
                    <div>
                    <MobiIcon /><p className='text-3xl p-2'> Mobius </p>
                    </div>
                </div>
                {/* <p> {systemInfo.i}</p> */}
                <PlatStat title="swaps" val={systemInfo.swapCount} />
                <PlatStat title=" # Tokens" val={systemInfo.tokenCount} />
                </div>
                <SupportedAssets tokens={tokens}/>
            </div>

        </div>
    )

}


function IntegrationHeader(props){
    return (
        <div className="flex flex-row h-16 rounded-t-xl bg-opacity-100">
            {/* <props.logo/> */}
            <p className="text-xl">{props.name}</p>
        </div>
    );
}

function Integration(props){
    const { loading, error, data } = useQuery(props.query, {"client":props.client});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;

    return (
        <div className={`${props.color}  bg-opacity-80`}>
            
            <IntegrationHeader {...props} />
        </div>
    )
}

function SupportedAssets(props) {
    const tokens = props.tokens;
    return (
        
        <div>
            <p className="text-2xl">Supported Assets</p>
            <div className="flex flex-row gap-2">
                {tokens.map((token, i) => (<div>
                    {token.symbol}
                    <Token token={token.symbol} />
                </div>))}
            </div>

    </div>
    )
}

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


const integrations = [
    {
        name:"Ubeswap",
        client:ubeClient,
        query : UBE_OVERVIEW_QUERY,
        color: "light-purple",
        stats: [
            {val:"dailyVolumeUSD", title:"Vol 24h"},
            // {val:}
         ],
        // tvl :

    },
    // {
    //     name:"Mobius",
    //     client: mobiClient,
    //     query : MOBI_OVERVIEW_QUERY,
    //     color: "pink",
    //     // stats: [{val:"dailyVolumeUSD", title:"" }]
        
    // }
]


function PlatformOverview() {


    return (
        <div className=''>
            <p className='text-3xl'> Platform Overviews</p>
            {integrations.map((platform, i) => (
            <Integration name={platform.name} query={platform.query}/>
            ))}
            <UbeOverview />
            <MobiOverview />

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