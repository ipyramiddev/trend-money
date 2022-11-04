import { Types } from "aptos";
import AccountOutline from "components/etc/AccountOutline";
import { format_large_number, shortenAddress } from "hooks/formatting";
import StakeForm from "hooks/StakeInputs";
import useStakeInputs from "hooks/StakeInputs";
import { loadValidators } from "hooks/useAptos";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useSubmitStake from "../../hooks/useStake";
import { validator_addresses } from './validator_data';

export function StakePage() {

  return (

    <div className="">

      <p className="text-2xl">Manual Staking</p>
      <StakeForm />
    </div>

  );
}

const ValidatorsOverView = () => {

}

const ValidatorPreview = (validatorSample: any) => {


  return (<div className="flex flex-col">
    <p className="text-2xl text-center"> Validator Overview</p>
    <p>completed:{validatorSample.successful_proposals}</p>
    <p>failed:{validatorSample.failed_proposals}</p>
  </div>)

}


const Validators = () => {
  // const [validatorData, setVData] = useState<any>();
  const validators = useLoaderData() as any;
  // const 


  return (
    <div className="flex flex-col gap gap-2">
        <h1 className="text-4xl">Active Validators</h1>
      <div className="flex flex-wrap items-start">
        {validators?.validatorInfo?.validators.map((v: any, i: number) => {
          // const v_history 


          return (
            <div className="flex flex-col seam-outline py-2 justify-between items-start px-3 m-3" key={i}>
              <div className="flex flex-row justify-between items-start gap gap-2">
                <p className="text-4xl opacity-70 text-right">#</p>
                <p className="text-6xl">{v.config.validator_index}</p>
              </div>
              
                <div>
                  <p className="text-4xl pt-1">{format_large_number(v.voting_power)}</p>
                  <p className="text-xl opacity-60"> Apt staked</p>
                </div>
              
              <div>
                <div>
                  <AccountOutline addr={v.addr} />
                  <p className="text-lg text-bold  text-center items-center justify-center">Validator addr.</p>
                </div>
                <div>
                  <AccountOutline addr={v.config.fullnode_addresses} />
                  <p className="text-lg text-bold text-center items-center justify-center">FullNodde addr.</p>
                </div>
              </div>

              <button className="seam-button opacity-40" data-tip="COMING SOON"> Stake</button>

            </div>
          )
        })}
      </div>

      <div>
      </div>
    </div>
  )
}

export default Validators;