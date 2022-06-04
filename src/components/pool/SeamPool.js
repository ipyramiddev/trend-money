import { useState, useEffect } from 'react';
// import { loadUbeSubPools } from '../../hooks/useGraph';
import TokenStack from '../TokenStack.js';
import SubSeam from './SubSeam.js';
// import { UBE_LIST_QUERY } from "../../hooks/useGraph";
import { useQuery } from '@apollo/react-hooks';
// import {progress} from 'daisyui';                                


const sumPoolInfo = async (poolData) => {
    let all_apr = [];
    let all_total_supply = [];

    for (let i = 0; i < poolData.pairs.length; i++) {
        let pool = poolData.pairs[i];
        all_apr.push(pool.apr);
        all_total_supply.push(pool.total_supply);
    }
    let avg_apr_24h = all_apr.reduce((a, b) => a + b, 0) / all_apr.length;
    console.log(avg_apr_24h);
    return {
        avg_apr_24h: avg_apr_24h,
    }
}


function SeamPool(props) {

    // const { loading, error, data } = useQuery(UBE_LIST_QUERY,{
    //     variables: {
    //         $pairList: [props.pools[0].yp_address, props.pools[1].yp_address]
    //     }
    // });
    const [collapse, setCollapse] = useState("1");
    const [returns, setReturns] = useState([]);
    const [tokens, setTokens] = useState([]);
    const toggle = () => {
        if (collapse === "1") {
            setCollapse("0");
        } else {
            setCollapse("1");
        }
    }

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :( {error.toString()}</p>;

    return (
        <div key={props.i} className="">
            <div className="rounded-xl border-dashed border-white border-4 m-6" >
                <div className="collapse collapse-arrow rounded-box p-1 m-1">
                    <div className="collapse-title " >
                        <div className='flex flex-row justify-between' onClick={toggle}>
                            <div>
                                <h1 className="text-3xl">{props.name}</h1>
                                <TokenStack tokens={props.all_assets} i={props.i} />
                            </div>
                            <div className='flex flex-row justify-end gap gap-4'>
                                <div className="stat place-items-center">
                                    <div className="stat-value">{props.avg_apr_24h}</div>
                                    <div className="stat-title">apr 24h.</div>
                                </div>
                                <div className="stat place-items-center">
                                    <div className="stat-value">{props.avg_apr_7d}</div>
                                    <div className="stat-title">apr 7d.</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between'>

                            <p>TVL: </p>
                            <p>Combined Pool TVL: </p>
                            <div className="flex flex-row gap-10 justify-end">

                                <div className="text-xl font-bold">
                                    <button onClick={()=>props.toggleDepositModal()} className="px-3 py-1 button-2xl m-3 bg-black rounded-lg hover:bg-white hover:text-blac outline outline-dashed outline-2">Deposit</button>
                                    <button className="px-3 py-1 m-3 bg-black rounded-lg hover:bg-white hover:text-blac outline outline-dashed outline-2">Withdraw</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    {collapse === "1" ? (
                        <div className="flex flex-col gap-2">
                            {props.pools.map((yp, index) => {
                                return (<SubSeam key={index} i={index} setReturns={setReturns} yp={yp} />)
                            })}
                        </div>) : null}
                </div>

            </div>
        </div>);
}

export default SeamPool;