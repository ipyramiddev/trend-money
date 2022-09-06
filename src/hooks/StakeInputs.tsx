import { useState } from "react";

const useStakeInputs = () => {
//     const {
//         StakeInputs()
// }


const [operatorAddr, setOperatorAddr] = useState<string>("");
const [voterAddr, setVoterAddr] = useState<string>("");
const [amount, setAmount] = useState<string>("");
const StakeInputs = () => {
    
    return (
        <div  className="flex flex-col gap gap-3 text-black p-2 ">
            <div>
                <input type="text" value={amount} placeholder="# of APT to stake" onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
                <input type="text" value={operatorAddr} placeholder="operator address" onChange={(e) => setOperatorAddr(e.target.value)} />
            </div>
            <div>
                <input type="text" value={voterAddr} placeholder="voter address" onChange={(e) => setVoterAddr(e.target.value)} />
            </div>
        </div>
    )
}
return {
    StakeInputs,
    getInputs
}
function getInputs() {
    return {operatorAddr,voterAddr,amount}
}
}

export default useStakeInputs;