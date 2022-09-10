import { MoveResource } from "aptos/dist/generated";
import StakeForm from "hooks/StakeInputs";
import useStakeInputs from "hooks/StakeInputs";
import { loadValidators } from "hooks/useAptos";
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

const ValidatorsOverView = ()=>{

}

const Validators = () => {
  useEffect(()=>{
    loadValidators().then(({validatorInfo,validatorSet,defaultConfig}:{validatorInfo:MoveResource,validatorSet:MoveResource,defaultConfig:MoveResource})=>{
      const vSet = (validatorSet.data as any)
      console.log("VALIDATOR COUNT",vSet.active_validators.length)
      const validator_samples = vSet.active_validators.splice(0,10).map((v:any)=>{
        return (
          {address: v.validator_address, node_count: v.validator_address.node_addresses.length}
        )
      })
    })
  },[])
  
  // return (<div>
  
  // </div>)
    return (
        <div>
            <h1>Deploy stake to validators</h1>
            {/* <ValidatorsOverView/> */}


            <StakePage />

        </div>
    )
}

export default Validators;