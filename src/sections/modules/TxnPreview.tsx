import { AptosAccount, AptosClient } from "aptos";
import { MoveFunction, MoveFunctionGenericTypeParam, MoveModuleBytecode, MoveType } from "aptos/dist/generated";
import ModuleOutline from "components/etc/ModuleOutline";
import { formatParam } from "hooks/formatting";
import { sendTransaction } from "hooks/useAptos";
import TransactionModal from "modals/TransactionModal";
import { useState } from "react";

interface TxnPreviewProps {
    address: string;
    module: MoveModuleBytecode;
    func: MoveFunction;
    params: any[];
    setShowTxnModal: React.Dispatch<React.SetStateAction<boolean>>;
    client: AptosClient;
}

const TxnPreview = ({address, module, func, params,setShowTxnModal,client } : TxnPreviewProps) => {
    const [argList, setArgList] = useState<any[]>([]);

    const updateArg = (index: number, value: string) => {
        const newArgs = [...argList];
        newArgs[index] = value;
        setArgList(newArgs);
    }

    // const payloa

    return (
        <div className="shadow">
            <p className="text-3xl p-2 " >Use Module</p>
        <div className=" items-start seam-outline">
            
                <div className="flex flex-row items-center gap gap-3">
                    <p className="account-outline text-2xl">{formatParam(address)}</p>
                    <p className="text-3xl">::</p>

                    {module !== undefined && module.abi? <ModuleOutline module_name={module.abi?.name}/> : <p className="text-2xl"></p>}
                    <p className="text-3xl">::</p>
                    <p className="function-outline text-2xl">{func?.name}</p>
                    
                </div>
                <div>
                {params.map((param:MoveType, index:number) => {
            return (
              <div key={index} className="flex flex-row items-baseline justify-start px-2 py-3 m-3 rounded-xl text-white">
                <p className="p-1 text-bold text-right">{param}</p>
                <input className="px-3 text-black py-2 rounded-xl outline outline-2" type="text" placeholder={""} value={argList[index]} onChange={(event)=>updateArg(index,event.target.value)}/>
              </div>
            )
        } )}
                </div>
                <button onClick={()=>sendTransaction("","")} className="seam-button ">send Txn</button>
            </div>
                {/* <button onClick={()=>setShowTxnModal(true)} className="seam-button ">Create Txn</button> */}
        </div>
    )
}

export default TxnPreview;