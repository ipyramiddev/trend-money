import { useState } from 'react';
import TokenStack from '../TokenStack.js';
import UniIcon from '../UniIcon.js';
import UbeIcon from '../UbeIcon.js';
import MobiIcon from '../MobiIcon.js';
import AssetPrice from '../AssetPrice.js';
import { useQuery } from '@apollo/react-hooks';
import { format_large_number } from '../../hooks/formatting';
import { fees24hour,yearlyReturnm, effective_cap_ratio } from '../../hooks/fin';
import { gql } from '@apollo/client';
// import { Bytes } from '@apollo/client/utilities';
import { BigNumber } from 'ethers';
import { formatBytes32String } from 'ethers/lib/utils';
import Stat from '../Stat.js';

// const nByte = (n) => {
//     return Bytes.fromHexString(n);
const ube_QUERY = (pairAddress) => {
    return gql`
query GetUbePool {
    pairs(where: {id: "${pairAddress}"}) {
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
        pairDayDatas(orderBy: date, orderDirection: desc, first: 5,
            where: {
              pairAddress: "${pairAddress}",
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


// const to_1y
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
    // const assets = [pool.token0_name, pool.token1_name];\\

    const pairData = data.pairDayDatas?.[0];
    const pairDatas = data.pairDayDatas;

    console.log(pairData)

    return data.pairs.map((pool, i) => {
        const vol24hUSD = pairData.dailyVolumeUSD;
        const volDiff = pairDatas[0].dailyVolumeUSD - pairDatas[1].dailyVolumeUSD;
        const volDiff_ratio = (volDiff / pairDatas[1].dailyVolumeUSD) * 100;
        const token0Price = pool.token0Price;
        const liq = pool.reserveUSD;
        const assets = [
            {'symbol':pool.token0.symbol, 'name':pool.token0.name, 'reserve':pool.reserve0, 'price':pool.token0Price, 'decimals':pool.token0.decimals, 'derivedCUSD':pool.token0.derivedCUSD},
            {'symbol':pool.token1.symbol, 'name':pool.token1.name, 'reserve':pool.reserve1,     'price':pool.token1Price, 'decimals':pool.token1.decimals, 'derivedCUSD':pool.token1.derivedCUSD}
    ];
        
        return (

            <div key={i} className="flex flex-col gap-2 m-2 p-2 outline-dotted rounded-lg text-white ">
                <div className='flex flex-row gap-2 p-1 justify-between'>
                    <div className='flex flex-cols'>
                        <div>
                            <p className="text-xl  ">{yp.name}</p>
                            <TokenStack tokens={[pool.token0.symbol, pool.token1.symbol]} i={i} />
                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <div className='flex flex-row gap-4 p-1'>
                            {assets.map((asset, i) => {
                            return (<div className="outline outline-2 outline-yellow rounded-lg items-center justify-center text-center h-16 w-auto">
                                <p className="text-xl font-bold text-yellow">{format_large_number(asset.reserve)}</p>
                                <p className={labelStyle}> {asset.symbol} reserves</p>
                            </div>)})}
                            <div className="outline outline-2 outline-green rounded-lg items-center justify-center text-center h-16 w-auto">
                                <p className={NumStyle('green')}>${format_large_number(pool.volumeUSD)}</p>
                                <p className={labelStyle}> vol. USD (alltime) </p>
                            </div>
                            <div className="outline outline-2 outline-green rounded-lg items-center justify-center text-center h-20 w-auto">
                                <p className={NumStyle('green')}>${format_large_number(vol24hUSD)}</p>
                                <p className={labelStyle}> vol 24h. USD</p>
                                {/* <p className='text-xs '>{format_large_number(volDiff)}</p> */}
                                
                                <p className={`text-xs ${volDiff_ratio > 0 ? "text-green": "text-red"}`}> {volDiff_ratio > 0 ? "+": ""} {volDiff_ratio.toFixed(2)}%</p>
                            </div>
                            <div className="outline outline-2 outline-blue rounded-lg items-center justify-center text-center h-16 w-auto">
                                <p className={NumStyle('blue')}>{format_large_number(pool.reserveUSD)}</p>
                                <p className={labelStyle}> tot. liquidity (USD)</p>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 p-1'>
                            {assets.map((asset, i) => {
                                return (<AssetPrice key={i} token={asset.symbol} price={asset.derivedCUSD} />)
                            })}
                            <Stat name="24h fee" unit={'$'} format={true} value={fees24hour(vol24hUSD, pool.reserveUSD).usd_24h_return} />
                            <Stat name="24h fee" unit={'$'} format={true} value={fees24hour(vol24hUSD, pool.reserveUSD).usd_24h_return} />
                            <Stat key={i+i+i} format={true} unit="%"value={effective_cap_ratio(vol24hUSD,pool.reserveUSD)*100} name="24h cap." color="red" />
                        <div className='flex flex-row justify-end p-2'>
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
                    </div>
                </div>
            </div>
        )
    }
    );
}

export default SubSeam;

