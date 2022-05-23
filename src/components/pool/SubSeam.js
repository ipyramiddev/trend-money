import { useState } from 'react';
import TokenStack from '../TokenStack.js';
import UniIcon from '../UniIcon.js';
import UbeIcon from '../UbeIcon.js';
import MobiIcon from '../MobiIcon.js';
import { useQuery } from '@apollo/react-hooks';
import { format_large_number } from '../../hooks/formatting';
import { gql } from '@apollo/client';
import { BigNumber } from 'ethers';

const ube_QUERY = (pairAddress) => {
    return gql`
query GetUbePool {
    pairs(where: {id: "${pairAddress}" }) {
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
    }
    
`};
const ube_fee = 0.0025 // 0.0025% fee that liquidity providers earn
const fees24hour = (vol24hUSD, totalLiquidity) => {

    return {
        "usd_24h_fee": (vol24hUSD / totalLiquidity * ube_fee).toFixed(2),
        "fee_percent": (ube_fee * 100).toFixed(2)
    }

}
// return vol24hUSD * price * ube_fee

const NumStyle = (color) => {
    return `text-xl font-bold text-center text-${color} px-2 pb-1`
}
const labelStyle = 
    `text-xs opacity-90 px-2 pb-1`;

const outlineStyle = (color) => {
    return `outline outline-2 outline-${color} rounded-lg items-center justify-center text-center h-14 w-auto`
}

function SubSeam(props) {
    const yp = props.yp;
    const q = ube_QUERY(yp.yp_address)
    const { loading, error, data } = useQuery(q);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.toString()}</p>;


    // const [collapse, setCollapse] = useState("0");
    // const pool = props.pool;
    // const assets = [pool.token0_name, pool.token1_name];


    return data.pairs.map((pool, i) => {

        return (

            <div key={i} className="flex flex-col gap-2 m-2 p-2 outline-dotted rounded-lg text-white ">
                <div className='flex flex-row gap-2 p-1 justify-between'>
                    <div className='flex flex-col'>
                    <p className="text-xl  ">{yp.name}</p>
                    <TokenStack tokens={[pool.token0.symbol, pool.token1.symbol]} />
                    </div>
                <div className='flex flex-row gap-4 p-1'>
                <div className="outline outline-2 outline-yellow rounded-lg items-center justify-center text-center h-14 w-auto">
                    <p className="text-xl font-bold text-yellow">{format_large_number(pool.reserveCELO)}</p>
                    <p className={labelStyle}> Celo reserves</p>
                </div>
                <div className="outline outline-2 outline-green rounded-lg items-center justify-center text-center h-14 w-auto">
                    <p className={NumStyle('green')}>${format_large_number(pool.volumeUSD)}</p>
                    <p className={labelStyle}> vol. USD (alltime) </p>
                </div>
                <div className="outline outline-2 outline-blue rounded-lg items-center justify-center text-center h-14 w-auto">
                <p className={NumStyle('blue')}>{format_large_number(pool.reserveUSD)}</p>
                <p className={labelStyle}> tot. liquidity (USD)</p>
                </div>
                </div>
                </div>
                <div className='flex flex-row gap-2 p-1 justify-between'>
                <p className='text-right inline-block text-align-bottom'> fees 24h: ~$ {fees24hour(pool.volumeUSD, pool.reserveUSD).usd_24h_fee}</p>
                {yp.platform === 'mobius' ? (
                        <div>
                            <MobiIcon address={yp.yp_address} />
                        </div>
                    ) : null}
                    {yp.platform === "uniswap" ? (
                        <UniIcon />) : null}
                    {yp.platform === "ubeswap" ? (
                        <div>
                            <UbeIcon address={yp.yp_address} />
                        </div>) : null}
                        </div>
                
            </div>
        )
    }
    );
}

export default SubSeam;