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
        <div className="p-2 m-2 outline-dotted rounded-lg">
            <div className="font-bold">{yp.name}</div>
            <div className="text-xl text-bold">{String(yp.apr * 100).slice(0, 4)}%
                {/* {pool.name} */}
                {/* <p>{pool.name}</p> */}
                {/* <p>token0_address: {pool.token0}</p> */}
                {/* <p>token1_address: {pool.token1}</p> */}
                {/* <p>{pool.token0_name}</p> */}
                {/* <p>{pool.token1_name}</p> */}
                {/* {pool.reserves ? (  <p>Reserves:</p>) : null} */}

                {/* <Token token={pool.token0_name} /> */}
            </div>
            <div>
                <div className=""><TokenStack tokens={yp.assets} /></div>
            </div>
            <div>
                {yp.platform==='mobius'? (
                    <MobiIcon address={yp.yp_address}/>
                ):null}
                {yp.platform === "uniswap" ? (
                    <UniIcon />) : null}
                    {yp.platform === "ubeswap" ? (
                        <div>

                    <UbeIcon address={yp.yp_address}/>
                    </div>) : null}

            </div>
        </div>

    )
}

export default SubSeam;