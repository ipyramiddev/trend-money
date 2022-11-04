import { useWeb3 } from "@fewcha/web3-react";
import { AptosAccount, AptosClient } from "aptos";
import { Types } from "aptos";
import ModuleOutline from "components/etc/ModuleOutline";
import { formatParam } from "hooks/formatting";
import { sendTransaction } from "hooks/useAptos";
import { useState } from "react";

interface TxnPreviewProps {
    address: string;
    module: Types.MoveModuleBytecode;
    func: Types.MoveFunction;
    params: any[];
    generic_types: any[];
    client: AptosClient;
}

const TxnPreview = ({ address, module, func, params, generic_types, client }: TxnPreviewProps) => {
    const [argList, setArgList] = useState<any[]>([]);
    const [gList, setgList] = useState<any[]>([]);
    const { account, balance, isConnected, network, currentWallet } = useWeb3();

    const updateArg = (index: number, value: string) => {
        const newArgs = [...argList];
        newArgs[index] = value;
        setArgList(newArgs);
    }

    const updateG = (index: number, g: string) => {
        const newArgs = [...argList];
        newArgs[index] = g;
        setArgList(newArgs);
    }

    const checkTxn = (toAddr: string,
        sender: string,
        mod: string,
        func: string,
        generic_type_params: string[],
        args: any[]) => {

        const arg_ls = args.filter((a: Types.MoveType) => a != "signer");
        sendTransaction(toAddr, sender, mod, func, generic_type_params, arg_ls)

    };

    // const payload

    return (
        <div className="shadow items-center  p-3">
            <p className="text-3xl p-2 text-center" >Use Module</p>
            <div className=" items-center seam-outline">

                <div className="flex flex-row items-center gap gap-3">
                    <p className="account-outline text-2xl">{formatParam(address)}</p>
                    <p className="text-3xl">::</p>

                    {module !== undefined && module.abi ? <ModuleOutline module_name={module.abi?.name} /> : <p className="text-2xl"></p>}
                    <p className="text-2xl">::</p>
                    <p className="function-outline text-3xl">{func.name}</p>

                </div>
                <div className="flex flex-row gap-2 ">
                    <div>
                        { params.length!=0 && params[0] === "&signer" ? <p className="text-2xl">signer</p> : <p className="text-2xl">signer,</p>}
                        {params.filter(param => param!=="&signer").map((param: Types.MoveType, index: number) => {
                            return (
                                <div key={index} className="flex flex-row items-baseline justify-start px-2 py-3 m-3 rounded-xl text-white">
                                    { }
                                    <p className="p-1 text-bold text-right">{param}</p>
                                    <input className="px-3 text-black py-2 rounded-xl outline outline-2" type="text" placeholder={""} value={argList[index]} onChange={(event) => updateArg(index, event.target.value)} />
                                </div>
                            )
                        })}
                    </div>

                    <div>
                        {generic_types.map((g: Types.MoveFunctionGenericTypeParam, index: number) => {
                            return (
                                <div key={index} className="flex flex-row items-baseline justify-start px-2 py-3 m-3 rounded-xl text-white">
                                    { }
                                    <p className="p-1 text-bold text-right">{"<g>"}</p>
                                    <input
                                        className="px-2 text-black py-2 rounded-xl outline outline-2"
                                        type="text" placeholder={""}
                                        value={gList[index]}
                                        onChange={(event) => updateG(index, event.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button onClick={() => checkTxn(address, account.address.toString(), module.abi?.name || "", func.name, func.generic_type_params as any[], argList)} className="seam-button ">send Txn</button>
            </div>
            {/* <button onClick={()=>setShowTxnModal(true)} className="seam-button ">Create Txn</button> */}
        </div>
    )
}

export default TxnPreview;