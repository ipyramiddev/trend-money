import StakeForm from "hooks/StakeInputs";
import useStakeInputs from "hooks/StakeInputs";
import React, {useEffect} from "react";
import useSubmitStake from "../../hooks/useStake";
import {validator_addresses} from './validator_data';

export function StakePage() {

  return (
    <>
      
      <div>
        <div className="flex flex-row justify-between gap gap-2 p-2">
          
          <div className="">
            <p className="text-2xl">Manual Staking</p>
          <StakeForm/>
          </div>
          <div>
            
          </div>
        </div>
      </div>             
    </>
  );
}

const Validators = () => {
    return (
        <div>
            <h1>Deploy stake to validators</h1>
            <StakePage />

        </div>
    )
}

export default Validators;