import Validators from "sections/staking/Validators";
import pool_data from "pool_data";
import { StakingPool } from "./StakingPool";
const Staking = () => {
    return (
        <div className="w-full h-screen items-start m-3 px-7">
            <p className="text-center  text-3xl">Staking</p>
            {pool_data.seamPools.map((pool: any) => {
                return(<StakingPool pool={pool} />)
            })}
            <Validators />
        </div>
    )

}


export default Staking; 