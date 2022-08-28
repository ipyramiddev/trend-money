import { AptosAccount, AptosClient, BCS, TxnBuilderTypes } from "aptos";
import { MoveFunction, MoveFunctionGenericTypeParam, MoveModule, MoveModuleBytecode, MoveType, MoveValue, TransactionPayload } from "aptos/dist/generated";
// import { MoveFunction, MoveModuleABI, MoveTypeId, AccountResource } from "aptos/dist/api/data-contracts";
import { TransactionPayloadScript } from "aptos/dist/transaction_builder/aptos_types";
import TxnHeader from "components/txn/TxnHeader";
import { useEffect, useRef, useState } from "react";
import { generic_serialize } from "util/aptosUtils";
import ModalWrapper from "./ModalWrapper";
import Web3 from "@fewcha/web3";
import { useWeb3 } from "@fewcha/web3-react";
// import { MoveResource } from "aptos/dist/generated";

const web3 = new Web3();
interface txnModalProps {
    client: AptosClient;
    address: string,
    // sender: string,
    func: MoveFunction;
    module: MoveModuleBytecode;
    type_arguments: string[],
    
    args: any[];
    // arg_types?: string[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

}



const TransactionModal = ({isOpen,client, address,module, type_arguments, args, setIsOpen, func}: txnModalProps) =>{
    const [open, setOpen] = useState(isOpen);
    const [argList, setArgList] = useState<any[]>([]);
    const cancelButtonRef = useRef(null);
    const { account, balance, isConnected, network,currentWallet } = useWeb3()

    const params = func.params as MoveType[]
    const module_name = module.abi?.name;
    

    const updateArg = (index: number, value: string) => {
        const newArgs = [...argList];
        newArgs[index] = value;
        setArgList(newArgs);
    }

    const verifyArgs = () => {
      console.log(argList);
    }

    const sendTxn = async () => {
        
      const payload = {
        type: "entry_function_payload",
        function: address+'::'+module_name+"::"+func.name,
        type_arguments: type_arguments,
        arguments: args,
      };
      console.log("Payload",payload);
      // const req = await web3.action.generateTransaction(payload)
      // const tx = await web3.action.signTransaction(req.data)
      const act = await window.martian.account()
      const transactionRequest = await window.martian.generateTransaction(act.address, payload);
const txnHash = await window.martian.signAndSubmitTransaction(transactionRequest);
console.log(transactionRequest);
      
        // console.log("txnHash", txnHash);

    }

    return (
      <ModalWrapper open={isOpen} setOpen={setIsOpen} cancelButtonRef={cancelButtonRef} title="tets">
  

        {/* show input for each of the params and store them in argList */}
        <p className="pt-0 text-3xl pb-2"> Create Txn</p>
        <TxnHeader func_name={func.name} module_name={module_name||"err"} address={address}/>
        {params.map((param:MoveType, index:number) => {
            return (
              <span key={index} className="flex flex-row items-center justify-center px-2 py-3 m-3 bg-white bg-opacity-40 rounded-xl text-white">
                <p className="items-ce">{param}</p>
                <input className="bg-transparent px-3 py-2 rounded-xl outline outline-2" type="text" placeholder={args[index]} value={args[index]} onChange={(event)=>updateArg(index,event.target.value)}/>
              </span>
            )
        } )}
        <button className="seam-button" onClick={()=>verifyArgs()}>verify params</button>

  
        {/* APPROVE SPEND Button */}
  
        {/* DEPOSIT button */}
        <button className="seam-button" onClick={()=>sendTxn()}>Send Txn</button>
      </ModalWrapper>
    );
  }
  export default TransactionModal;
