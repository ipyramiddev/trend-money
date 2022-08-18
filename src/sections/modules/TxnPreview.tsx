import { AptosAccount, AptosClient } from "aptos";
import { MoveFunction, MoveModuleBytecode } from "aptos/dist/generated";
import { formatParam } from "hooks/formatting";
import TransactionModal from "modals/TransactionModal";

interface TxnPreviewProps {
    address: string;
    module: MoveModuleBytecode;
    func: MoveFunction;
    params: any[];
    setShowTxnModal: React.Dispatch<React.SetStateAction<boolean>>;
    client: AptosClient;
}

const TxnPreview = ({address, module, func, params,setShowTxnModal,client } : TxnPreviewProps) => {
    return (
        <div className="flex items-center opacity-50 seam-outline">
            
                <p className="text-3xl p-2 " >Use Module</p>
                <div className="flex flex-row items-center gap gap-3">
                    <p className="account-outline text-2xl">{formatParam(address)}</p>
                    <p className="text-3xl">::</p>

                    {module !== undefined ? <p className="text-2xl module-outline"> {module.abi?.name}</p> : <p className="text-2xl"></p>}
                    <p className="text-3xl">::</p>
                    <p className="function-outline text-2xl">{func?.name}</p>
                </div>
                <button onClick={()=>setShowTxnModal(true)} className="seam-button ">Create Txn</button>
            </div>
    )
}

export default TxnPreview;