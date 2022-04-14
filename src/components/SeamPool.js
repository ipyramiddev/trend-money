import { useState, useEffect } from 'react';
import TokenStack from '../components/TokenStack.js';


function SeamPool(props) {

    const [collapse, setCollapse] = useState("1");
    return (
        <div>
            {props.YETF.map((yp, index) => {
                return (<div className="bg-white bg-opacity-30  p-2 m-3 rounded-xl">
                    <div className="flex flex-row justify-items-between">
                        <p className="font-bold p-2 text-2xl">{yp.name}</p>
                        <TokenStack tokens={yp.assets} />
                    </div>

                    <div className="flex flex-row justify-items-between w-fit gap-5">
                        <div>
                            <p className=" font-light opacity-80">Apr</p>
                            <p className="text-xl font-bold">{String(yp.apr * 100).slice(0, 4)}%</p>
                        </div>

                        <div>
                            <p className=" font-light opacity-80">Pool</p>
                            <p className="text-xl font-bold">{String(yp.apr * 100).slice(0, 4)}%</p>
                        </div>
                        <div>
                            <p className=" font-light opacity-80">Y-TVL</p>
                            <p className="text-xl font-bold">{String(yp.y_tvl * 100).slice(0, 4)}%</p>
                        </div>
                        <div>
                            <p className=" font-light opacity-80">pool TVL</p>
                            <p className="text-xl font-bold">{String(yp.pool_tvl * 100).slice(0, 4)}%</p>
                        </div>
                    </div>

                </div>)
            })}
            <div className="flex flex-row gap-10 justify-between">
                <div>
                    <p>Your deposits:</p>
                    <p className="text-right">{props.user.depositsBalance}$</p>
                </div>
                <div>
                    <p>Your Interest</p>
                    <p className="text-right">{props.user.interestEarned}$</p>
                </div>
                <div className="">
                    <button className="px-3 py-1 m-3 bg-black rounded-sm hover:bg-white hover:text-blac outline outline-dashed outline-2">Deposit</button>
                    <button className="px-3 py-1 m-3 bg-black rounded-sm hover:bg-white hover:text-blac outline outline-dashed outline-2">Withdraw</button>
                </div>

            </div>

        </div>);
}

export default SeamPool;