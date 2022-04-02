import pool_data from '../pool_data';
import user_data from '../user_data';
import PoolBox from '../components/PoolBox';
import Tvl from '../components/Tvl';

const dpool = {
    pools: [{
        "name": "UST (Allbridge)",
        
        "apr": "24.6% APR",
        "pair": ["cUSD",  "UST"],
        "volume": "up to 39.5% w/ boost",
        "portion": "25%"
    },
    {
        "name": "USDC (Optics V2)",
        "apr": "19.9% APR",
        "pair": ["cUSD" ,"cUSDC"],
        "volume": "up to 32.4% w/ boost",
        "portion": "25%"
    },
    {
        "name": "DAI (Optics V2)",
        "apr": "19.7% APR",
        "pair": ["cUSD" ,"DAI"],
        "volume": "up to 25.5% w/ boost",
        "portion": "25%"
    },
    {
        "name": "WETH (Optics V2)",
        "apr": "6.0% APR",
        "pair": ["cETH","wETH"],
        "volume": "up to 15.0% w/ boost",
        "portion": "25%"
    },
    ],
    avg_apy: '12.34 apr',
    tvl_dpool :"12,344",
    tvl_pool_sum : "1.3m"
    



}


export default function PoolPage(props) {

    return (
        <div className="m-6">

        <Dpool/>

        </Dpool>
        <Tvl {...pool_data} user={user_data}/>
        {/* LIST OF POOLS TO DEPOSIT INTO */ }

    <div className="">
        {pool_data.pools.map((pool, i) => {
            return (<PoolBox key={i} {...pool} />);
        })}
    </div>

    {/* YOUR ASSETS */ }
        </div >
    );
}