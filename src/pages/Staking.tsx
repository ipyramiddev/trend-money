import Validators from "sections/staking/Validators";
import pool_data from "pool_data";
import { StakingPool } from "./StakingPool";
import { useState } from "react";
const Staking = () => {
    const [depositModal, setDepositModal ] = useState(false);

    const showDepositModal = () => {
        return (
        <div>

        </div>)
    }

    return (
        <div className="w-full h-screen items-start m-3 px-7">
            <p className="text-center  text-3xl">Strats</p>
            {pool_data.seamPools.map((pool: any) => {
                return(<StakingPool pool={pool} setDeposit={showDepositModal}/>)
            })}
            {/* <Validators /> */}
        </div>
    )

}


export default Staking; 