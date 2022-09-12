import { MoveResource } from "aptos/dist/generated";
import { format_large_number, shortenAddress } from "hooks/formatting";
import StakeForm from "hooks/StakeInputs";
import useStakeInputs from "hooks/StakeInputs";
import { loadValidators } from "hooks/useAptos";
import React, {useEffect, useState} from "react";
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
  const [validatorData, setVData] = useState<any>();

  useEffect(()=>{
    loadValidators().then(({validatorInfo,validatorSet,defaultConfig}:{validatorInfo:MoveResource,validatorSet:MoveResource,defaultConfig:MoveResource})=>{
      const vSet = (validatorSet.data as any)
      console.log("VALIDATOR COUNT",vSet.active_validators)
      const validator_samples = vSet.active_validators.splice(0,10).map((v:any)=>{
        return (
          {address: v.addr, validator_index:v.config.validator_index, voting_power:v.voting_power, node_count: v.config.fullnode_addresses.length}
        )
      })
      setVData(
        {validator_samples: validator_samples})
    })
  },[])
  
  // return (<div>
  
  // </div>)
    return (
        <div>
            {/* <ValidatorsOverView/> */}
            {/* <p>{validatorData?.validator_samples?.length}</p> */}
            {/* <p>{JSON.stringify(validatorData)}</p> */}
            {/* <p>{JSON.stringify(validatorData.validator_samples)}</p> */}

            {(validatorData!=null) ?
            (<div>
            <h1>Stake APT on validators</h1>
              {validatorData.validator_samples.map((v:any)=>{
                return(
                  <div className="flex flex-row seam-outline py-2 px-3">
                    {/* <p>{JSON.stringify(v)}</p> */}
                    <p className="text-lg text-bold account-outline text-center items-center justify-center">{shortenAddress(v.address)}</p>

                    <div>
                    <p className="text-md pt-1">{v.node_count}</p>
                    <p className="text-sm opacity-60"> # nodes</p>
                    </div>

                    <div>
                    <p className="text-md p-1">{format_large_number(v.voting_power)}</p>
                    <p className="text-sm opacity-60"> # nodes</p>
                    </div>

                    <button className="seam-button"> Stake</button>

                  </div>
                )
              })}
            </div>):null}

            <StakePage />

        </div>
    )
}

export default Validators;