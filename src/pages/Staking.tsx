import Validators from "sections/staking/Validators";
import pool_data from "pool_data";
import { StakingPool } from "./StakingPool";
const Staking = () => {
    return (
        <div className="w-full h-screen items-start">
            <p>Staking</p>
            <Validators />
            {pool_data.seamPools.map((pool: any) => {
                return(<StakingPool pool={pool} />)
            })}
        </div>
    )

}


export default Staking; 