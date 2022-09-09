import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import useSubmitStake from "./useStake";

interface StakeInputs{
    amount: string;
    operatorAddr:string;
    voterAddr: string;

}

const useStakeForm = (callback:any) => {
    const {
        submitStake,
        transactionInProcess,
        transactionResponse,
      } = useSubmitStake(); 
    
    const [inputs, setInputs] = useState<StakeInputs>({amount:"",operatorAddr:"",voterAddr:""});
    const handleSubmit = async (event:any) => {
      if (event) {
        event.preventDefault();
        // const onSubmitClick = async () => {
            
              await submitStake(parseInt(inputs.amount), inputs.operatorAddr, inputs.voterAddr);
        //   };
      }
    }
    const handleInputChange = (event:any) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }
    return {
      handleSubmit,
      handleInputChange,
      inputs
    };
  }

const StakeForm = () => {
    // const [operatorAddr, setOperatorAddr] = useState<string>("");
    // const [voterAddr, setVoterAddr] = useState<string>("");
    // const [amount, setAmount] = useState<string>("");

    const submitStake = () => {}

    const {handleSubmit,handleInputChange,inputs} = useStakeForm(submitStake);
    
    return (
        <div  className="flex flex-col shadow shadow-xl shadow-orange gap-3 text-black p-2 ">
            <form onSubmit={handleSubmit}>
            <div>
                <input className="bg-opacity" type="number" name="amount" placeholder="# of APT to stake" onChange={(e) => handleInputChange(e)} />
            </div>
            <div>
                <button><FaArrowAltCircleUp/></button>
            </div>
            <div>
                <input type="text" name="voterAddr" placeholder="voter address" onChange={(e) =>handleInputChange(e)} />
            </div>
            </form>
        </div>
    )
}


export default StakeForm;