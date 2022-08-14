import { AptosAccount, BCS, TxnBuilderTypes } from "aptos";
import { MoveFunction, MoveModuleABI, MoveTypeId } from "aptos/dist/api/data-contracts";
import { TransactionPayloadScriptFunction } from "aptos/dist/transaction_builder/aptos_types";
import { useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface txnModalProps {
    sender: string;
    client: AptosAccount;
    address: string
    func: MoveFunction;
    module: MoveModuleABI;
    params: any[];
    args: any[];
    arg_types: string[];
    isOpen: boolean;

}



const createPayload = (sender: string, address:string, client: AptosAccount, module: MoveModuleABI, func: MoveFunction, params: any[], args: any[], arg_types: string[]) => {
    const serializedArgs = args.map((param:MoveTypeId, index) => {
        // return generic_serialize(param, arg_types, args[index]);
        {}
    }) as any[]

    const scriptFunctionPayload =  new TxnBuilderTypes.TransactionPayloadScriptFunction(
      TxnBuilderTypes.ScriptFunction.natural(
        module.name,
        func.name,
        [],
        [
          // B(name),
          // BCS.bcsSerializeStCS.bcsSerializeStrr(description),
          // BCS.bcsSerializeStr(uri),
          // BCS64.bcsSerializeUint(NUMBER_MAX),
          // serializeVectorBool([false, false, false]),
        ],
      ),
    );
    return scriptFunctionPayload;
  }


const TransactionModal = ({isOpen,sender,client, address, func, params,args,arg_types}: txnModalProps) =>{
    const [open, setOpen] = useState(isOpen);
    const cancelButtonRef = useRef(null);
    const [payload, setPayload] = useState<TransactionPayloadScriptFunction | undefined>();
    // const [
    // useEffect(() => {
    //     if (open) {
    //         // setPayload(createPayload(sender, address, client, func, params, args, arg_types));
    //     }
    // } , [open]);

    return (
      <ModalWrapper open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} title="tets">
  
        {/* show seam pool name */}
        {/* DEPOSIT COIN(S) DEPOSIT AMOUNTs */}
  
        {/* small boxes each sub-pool  */}
        <p>content</p>
  
        {/* APPROVE SPEND Button */}
        
  
        {/* DEPOSIT button */}
  
      </ModalWrapper>
    );
  }
  export default TransactionModal;
  