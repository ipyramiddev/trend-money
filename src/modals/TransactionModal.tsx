import { AptosAccount, AptosClient, BCS, TxnBuilderTypes } from "aptos";
import { MoveFunction, MoveModule, MoveModuleBytecode, MoveType, MoveValue, TransactionPayload } from "aptos/dist/generated";
// import { MoveFunction, MoveModuleABI, MoveTypeId, AccountResource } from "aptos/dist/api/data-contracts";
import { TransactionPayloadScriptFunction } from "aptos/dist/transaction_builder/aptos_types";
import TxnHeader from "components/txn/TxnHeader";
import { useEffect, useRef, useState } from "react";
import { generic_serialize } from "util/aptosUtils";
import ModalWrapper from "./ModalWrapper";

interface txnModalProps {
    client: AptosClient;
    address: string,
    sender: string,
    func: MoveFunction;
    module: MoveModuleBytecode;
    // module_name: string;
    
    // args?: any[];
    // arg_types?: string[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

}



const createPayload = (address:string, client: AptosClient, module: MoveModuleBytecode, func: MoveFunction, params: any[], args: any[], arg_types: string[]) => {
    const serializedArgs = args.map((param:MoveType, index) => {
        const arg = args[index];
        const serializedArgs = generic_serialize(arg)
        console.log("serializedArgs", serializedArgs)

        return serializedArgs
        // {}
    }) as any[]

    const scriptFunctionPayload =  new TxnBuilderTypes.TransactionPayloadScriptFunction(
      TxnBuilderTypes.ScriptFunction.natural(
        address+'::'+module.abi?.name,
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


const TransactionModal = ({isOpen,sender,client, address,module,setIsOpen, func}: txnModalProps) =>{
    const [open, setOpen] = useState(isOpen);
    const [argList, setArgList] = useState<any[]>([]);
    const cancelButtonRef = useRef(null);
    
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
        // const payload = createPayload(address, client, module, func, params, argList, []);
        const payload = {
          type: "script_function_payload",
          function: (address+'::'+module.abi?.name+'::'+func.name) as string,
          // type_arguments: ["0x1:string:String"],
          arguments: [generic_serialize("d")] as any[]
      } as TransactionPayload;
      console.log("Payload",payload);
        const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
          client.getAccount("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270"),
          client.getChainId(),
        ]);
      
        // const rawTxn = new TxnBuilderTypes.RawTransaction(
        //   TxnBuilderTypes.AccountAddress.fromHex("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270"),
        //   BigInt(sequenceNumber),
        //   payload,
        //   BigInt(1000),
        //   BigInt(1),
        //   BigInt(Math.floor(Date.now() / 1000) + 10),
        //   new TxnBuilderTypes.ChainId(chainId),
        // );
        const transactionRequest = await window.martian.generateTransaction("0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270", payload);
const txnHash = await window.martian.signAndSubmitTransaction(transactionRequest);
      
        // const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);
        // const pendingTxn = await client.submitSignedBCSTransaction(bcsTxn);
        // await client.waitForTransaction(pendingTxn.hash);

    }

    return (
      <ModalWrapper open={isOpen} setOpen={setIsOpen} cancelButtonRef={cancelButtonRef} title="tets">
  

        {/* show input for each of the params and store them in argList */}
        <TxnHeader func_name={func.name} module_name={module_name||"err"} address={address}/>
        {params.map((param:MoveType, index) => {
            return (
              <span key={index} className="flex flex-row px-2 py-1 m-1 outline outline-2 bg-white bg-opacity-40">
                <p>{param}</p>
                <input className="" type="text" onChange={(event)=>updateArg(index,event.target.value)}/>
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
