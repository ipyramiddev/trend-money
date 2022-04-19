import { useState } from 'react';
import TokenStack from '../components/TokenStack.js';
function SubSeam(ss) {

    const [collapse, setCollapse] = useState("0");

    const toggle = () => {
        if (collapse === "1") {
            setCollapse("0");
        } else {
            setCollapse("1");
        }
    }

    return (
        <div>
            <div class="collapse collapse-arrow rounded-box p-2 m-2">
                <div class="collapse-title text-xl font-medium" onClick={toggle}>
                <div className="flex flex-row gap-2">
                        <p className="font-bold p-2 text-2xl">{ss.name}</p>
                        <TokenStack tokens={ss.assets} />
                    </div>
                </div>
                {collapse === "1" ? (
                        <div className="flex flex-row px-7 w-fit gap-5">
                        <div>
                            <p className=" font-light opacity-80">Apr</p>
                            <p className="text-xl font-bold">{String(ss.apr * 100).slice(0, 4)}%</p>
                        </div>

                        <div>
                            <p className=" font-light opacity-80">Pool</p>
                            <p className="text-xl font-bold">{String(ss.apr * 100).slice(0, 4)}%</p>
                        </div>
                        <div>
                            <p className=" font-light opacity-80">Y-TVL</p>
                            <p className="text-xl font-bold">{String(ss.y_tvl * 100).slice(0, 4)}%</p>
                        </div>
                        <div>
                            <p className=" font-light opacity-80">pool TVL</p>
                            <p className="text-xl font-bold">{String(ss.pool_tvl * 100).slice(0, 4)}%</p>
                        </div>
                    </div>) : null}
            </div>
        </div>
    )
}

export default SubSeam;