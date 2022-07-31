import { useQuery } from '@apollo/react-hooks';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import Stat from './Stat.js';
import { BigNumber } from 'ethers';
import UbeIcon from './UbeIcon';
import MobiIcon from './MobiIcon.js';
import SupportedAssets from './Integrations/SupportedAssets.js';
import UbeOverview from './Integrations/UbeOverview.js';
import Token from '../components/Token'
import UniIcon from './UniIcon';
// // import {UBE_SUBGRAPH} from utils;
import { format_large_number, format_date,format_tvl } from '../hooks/formatting';
import { MOBI_OVERVIEW_QUERY } from '../hooks/queries/mobiQ';
import { UBE_OVERVIEW_QUERY } from '../hooks/queries/ubeQueries';



const mobiClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/d-mooers/mobius",
    cache: new InMemoryCache(),
})

const ubeClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap",
    cache: new InMemoryCache(),
})

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


function IntegrationStats(props){

    return (
        <div className="flex flex-cols gap-4 justify-between px-4 m-2">
            {props.stats.map((stats,i) => (<PlatStat key={i} title={stats.title} val={stats[stats.val]} />))}
        </div>
    )
}

function Integration(props){
    const { loading, error, data } = useQuery(props.query, {"client":props.client});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;

    return (
        <div className={`${props.color}  bg-opacity-80`}>
            
            <IntegrationHeader {...props} />
            <IntegrationStats {...props} data={data} />
        </div>
    )
}






const integrations = [
    {
        name:"Ubeswap",
        client:ubeClient,
        query : UBE_OVERVIEW_QUERY,
        color: "light-purple",
        stats: [
            {val:"dailyVolumeUSD", title:"Vol 24h", color:"light-purple"},
            {val:"pairCount", title:"pairCount", color:"light-purple"},
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
            <Integration {...platform}/>
            ))}
            <UbeOverview />
            {/* <MobiOverview /> */}

            <div>
                

            </div>
        </div>
    )



}

export default PlatformOverview;