import { useState, useEffect } from 'react';
import TokenStack from '../TokenStack.js';
import SubSeam from './SubSeam.js';
// import {progress} from 'daisyui';                                


function SeamPool(props) {

    const [collapse, setCollapse] = useState("1");

    const toggle = () => {
        if (collapse === "1") {
            setCollapse("0");
        } else {
            setCollapse("1");
        }
    }
    return (
        <div className="">
            <div className="rounded-xl border-dashed border-white border-4 m-6" >
                <div class="collapse collapse-arrow rounded-box p-1 m-1">
                    <div class="collapse-title " onClick={toggle}>
                        <div className='flex flex-row justify-between'>
                            <div>
                                <h1 className="text-3xl">{props.name}</h1>
                                <TokenStack tokens={props.all_assets} />
                            </div>
                            <div className='flex flex-row justify-end gap gap-4'>
                                <div class="stat place-items-center">
                                    <div class="stat-value">{props.avg_apr_24h}</div>
                                    <div class="stat-title">apr 24h.</div>
                                </div>
                                <div class="stat place-items-center">
                                    <div class="stat-value">{props.avg_apr_7d}</div>
                                    <div class="stat-title">apr 7d.</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            
                            <p>TVL: </p>
                        <div className="flex flex-row gap-10 justify-end">

                            <div className="text-xl font-bold">
                                <button className="px-3 py-1 button-2xl m-3 bg-black rounded-lg hover:bg-white hover:text-blac outline outline-dashed outline-2">Deposit</button>
                                <button className="px-3 py-1 m-3 bg-black rounded-lg hover:bg-white hover:text-blac outline outline-dashed outline-2">Withdraw</button>
                            </div>
                            </div>
                        </div>

                    </div>
                    {collapse === "1" ? (
                                <div className="flex flex-col gap-2">
                                    {props.pools.map((yp, index) => {
                                        return (<SubSeam yp={yp} />)
                                    })}
                        </div>) : null}
                </div>

            </div>

        </div>);
}

export default SeamPool;