import { useState, useEffect } from 'react';
import TokenStack from '../TokenStack.js';
import SubSeam from './SubSeam.js';


function SeamPool(props) {

    const [collapse, setCollapse] = useState("1");
    return (
        <div className="">
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="text-white text-3xl">YETF Pool</h1>
                    <div>
                        <p className="opacity-70">Total deposits: </p>
                    </div>
                </div>
                <div>
                    <p className="text-white text-xl">{props.apy}</p>
                    <p>apy</p>
                </div>

            </div>

            {props.YETF.map((yp, index) => {
                return (<SubSeam {...yp} />)

            })}
            <div className="flex flex-row gap-10 justify-between">
                {/* <div>
                    <p>Your deposits:</p>
                    <p className="text-right">{props.user.depositsBalance}$</p>
                </div>
                <div>
                    <p>Your Interest</p>
                    <p className="text-right">{props.user.interestEarned}$</p>
                </div> */}
                <div className="">
                    <button className="px-3 py-1 button-2xl m-3 bg-black rounded-sm hover:bg-white hover:text-blac outline outline-dashed outline-2">Deposit</button>
                    <button className="px-3 py-1 m-3 bg-black rounded-sm hover:bg-white hover:text-blac outline outline-dashed outline-2">Withdraw</button>
                </div>
            </div>

        </div>);
}

export default SeamPool;