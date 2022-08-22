import React, {useEffect} from "react";
import useSubmitStake from "../../hooks/useStake";


export function StakePage() {
//   const {isConnected: isWalletConnected} = useWalletContext();
    const [operatorAddr, setOperatorAddr] = React.useState<string>("");
    const [voterAddr, setVoterAddr] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");

  const {
    submitStake,
    transactionInProcess,
    transactionResponse,
  } = useSubmitStake();

  const onSubmitClick = async () => {
      await submitStake(parseInt(amount), operatorAddr, voterAddr);
  };

  useEffect(() => {
    if (transactionResponse?.transactionSubmitted) {
      console.log(" tx submitted");
    }
  }, [transactionResponse]);

  const submitButton = (
    <span>
      <button
        className="seam-button"
        onClick={onSubmitClick}
      >
        Submit
      </button>
    </span>
  );

  return (
    <>
      
      <div>
        <div>
          <div>
            <input type="text" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
          </div>
          <div>
            <input type="text" value={operatorAddr} onChange={(e)=>setOperatorAddr(e.target.value)}/>
          </div>
          <div>
            <input type="text" value={voterAddr} onChange={(e)=>setVoterAddr(e.target.value)}/>
          </div>
          <div>
            <form>
              {submitButton}
            </form>
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