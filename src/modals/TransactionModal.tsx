import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { AptosAccount, AptosClient, BCS, TxnBuilderTypes, Types } from "aptos";
import TxnHeader from "components/txn/TxnHeader";
import {useRef, useState } from "react";
import { generic_serialize } from "util/aptosUtils";
import ModalWrapper from "./ModalWrapper";

interface txnModalProps {
    client: AptosClient;
    address: string,
    // sender: string,
    func: Types.MoveFunction;
    module: Types.MoveModuleBytecode;
    type_arguments: string[],
    args: any[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

}

const TransactionModal = ({isOpen,client, address,module, type_arguments, args, setIsOpen, func}: txnModalProps) =>{
    const [open, setOpen] = useState(isOpen);
    const [argList, setArgList] = useState<any[]>([]);
    const cancelButtonRef = useRef(null);
    const { account, connected, network,wallet:currentWallet } = useWallet()

    const params = func.params as Types.MoveType[]
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
        arguments: argList,
      };
      console.log("Payload",payload);
      const transactionRequest = await window.martian.generateTransaction(account?.address, payload);
      const txnHash = await window.martian.signTransaction(transactionRequest);
      const txnsubmit = await window.martian.submitTransactions(txnHash);
      

    }

    return (
      <ModalWrapper open={isOpen} setOpen={setIsOpen} cancelButtonRef={cancelButtonRef} title="tets">
        <p className="pt-0 text-3xl pb-2"> Create Txn</p>
        <TxnHeader func_name={func.name} module_name={module_name||"err"} address={address}/>
        {params.map((param:Types.MoveType, index:number) => {
            return (
              <span key={index} className="flex flex-row items-center justify-center px-2 py-3 m-3 rounded-xl text-white">
                <p className="text-sm text-bold text-right">{param}</p>
                <input className="px-3 py-2 rounded-xl text-black outline outline-2" type="text" placeholder={args[index]} value={args[index]} onChange={(event)=>updateArg(index,event.target.value)}/>
              </span>
            )
        } )}

        <button className="seam-button" onClick={()=>sendTxn()}>Send Txn</button>
      </ModalWrapper>
    );
  }
  export default TransactionModal;
