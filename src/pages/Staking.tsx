import Validators from "sections/staking/Validators";
import pool_data from "pool_data";
import { StakingPool } from "./StakingPool";
import { useState } from "react";
const Staking = () => {
  const [depositModal, setDepositModal] = useState(false);

  return (
    <div className="w-full h-screen items-start m-3 px-7">
      <p className="text-center  text-3xl">TVL</p>
      <p className="text-center  text-xl">$0</p>
      {pool_data.seamPools.map((pool: any, index: number) => {
        return <StakingPool pool={pool} key={index} />;
      })}
      {/* <Validators /> */}
    </div>
  );
};

export default Staking;
