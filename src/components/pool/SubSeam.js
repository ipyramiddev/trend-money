import { useState } from 'react';
import TokenStack from '../TokenStack.js';
import UniIcon from '../UniIcon.js';
import UbeIcon from '../UbeIcon.js';
import MobiIcon from '../MobiIcon.js';
function SubSeam(props) {

    const [collapse, setCollapse] = useState("0");
    // const pool = props.pool;
    // const assets = [pool.token0_name, pool.token1_name];
    const yp = props.yp;

    return (
        <div className="flex flex-cols gap-2 m-2 py-2 outline-dotted rounded-lg justify-between ">
            <p className="text-xl  ">{yp.name}</p>
            <p className="text-xl text-bold opacity-70">{String(yp.apr * 100).slice(0, 4)}%</p>
                <TokenStack tokens={yp.assets} />
            <div>
                {yp.platform==='mobius'? (
                    <div>
                        <MobiIcon address={yp.yp_address}/>
                    </div>
                ):null}
                {yp.platform === "uniswap" ? (
                    <UniIcon />) : null}
                    {yp.platform === "ubeswap" ? (
                        <div>

                    <UbeIcon address={yp.yp_address}/>
                    <p className='text-center'>ubeswap</p>
                    </div>) : null}

            </div>
        </div>

    )
}

export default SubSeam;