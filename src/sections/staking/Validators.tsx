import StakeForm from "hooks/StakeInputs";
import useStakeInputs from "hooks/StakeInputs";
import React, {useEffect} from "react";
import useSubmitStake from "../../hooks/useStake";
import {validator_addresses} from './validator_data';


const validator = () => {
  return (
    <div>

    </div>
  )
}

export function StakePage() {
//   const {isConnected: isWalletConnected} = useWalletContext();

  // const {
  //   submitStake,
  //   transactionInProcess,
  //   transactionResponse,
  // } = useSubmitStake(); 


  // const onSubmitClick = async () => {
  //   const {amount,operatorAddr,voterAddr} = getInputs()
  //     await submitStake(parseInt(amount), operatorAddr, voterAddr);
  // };

  // useEffect(() => {
  //   if (transactionResponse?.transactionSubmitted) {
  //     console.log(" tx submitted");
  //   }
  // }, [transactionResponse]);

  // const submitButton = (
  //   <span>
  //     <button
  //       className="seam-button"
  //       onClick={()=>onSubmitClick()}
  //     >
  //       Submit
  //     </button>
  //   </span>
  // );

  return (
    <>
      
      <div>
        <div className="flex flex-col gap gap-2 p-2">
          <StakeForm/>
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
            <h1>Validators</h1>
            <StakePage />

        </div>
    )
}

export default Validators;