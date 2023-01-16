
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { AptosAccount, AptosClient, BCS, HexString, TxnBuilderTypes } from "aptos";
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

const {
    AccountAddress,
    TypeTagStruct,
    EntryFunction,
    StructTag,
    TransactionPayloadEntryFunction,
    RawTransaction,
    ChainId,
  } = TxnBuilderTypes;

const type_parsers = {
    "u64":(x:number)=>BCS.bcsSerializeUint64(x),
    "str":(x:string)=>BCS.bcsSerializeStr(x),
    "address":(x:string)=>BCS.bcsToBytes(AccountAddress.fromHex(new HexString(x))),
    "0x1::string:String":(x:string)=>BCS.bcsToBytes(AccountAddress.fromHex(new HexString(x)))
}

const TxnPreview = ({ address, module, func, params, generic_types, client }: TxnPreviewProps) => {
    const [argList, setArgList] = useState<any[]>([]);
    const [gList, setgList] = useState<any[]>([]);
    const { account, connected,} = useWallet();

    const updateArg = (index: number, value: string,type:any) => {
        const newArgs = [...argList];
        newArgs[index] = {value:value,type:type};
        setArgList(newArgs);
    }

    const updateG = (index: number, g: string) => {
        const newArgs = [...gList];
        newArgs[index] = g;
        setgList(newArgs);
    }

    const checkTxn = (toAddr: string,
        sender: string,
        mod: string,
        func: string,
        generic_type_params: string[],
        args: any[]) => {

        // const arg_ls = args.filter((a: Types.MoveType) => a !== "signer");
        const arg_ls = args.map((arg:any)=>{
            const type = arg.type as String;
            if (type==="address"){
                return arg.value
                // return BCS.bcsToBytes(AccountAddress.fromHex(new HexString(arg.value)));
            }
            else if(type==="u64"){
                return arg.value
                // return BCS.bcsSerializeUint64(arg.value);
            }
            else if(type==="0x1::string::String"){
                return arg.value
                // return {value:BCS.bcsSerializeStr(arg.value)};
            }
            else{
                console.log("Unknown type", type);
            }
        });
            


        // const parsed_args = arg_ls.map((arg:Types.MoveType)=>{
        //     const type = arg.type as String;
        //     const parser = type_parsers.get(arg);
        //     if (parser){
        //         return parser(arg.value);
        //     }
        //     return arg.value;

        sendTransaction(toAddr, sender, mod, func, generic_type_params, arg_ls)

    };

    // const payload

    return (
        <div className="items-center m-4 p-4">
            <p className="text-3xl p-2 text-center" >Use Module</p>
            <div className=" items-center seam-outline shadow-pastelBlue shadow-2xl">

                <div className="flex flex-wrap items-center gap gap-3">
                    <p className="account-outline text-2xl">{formatParam(address)}</p>
                    <p className="text-3xl">::</p>

                    {module !== undefined && module.abi ? <ModuleOutline module_name={module.abi?.name} /> : <p className="text-2xl"></p>}
                    <p className="text-2xl">::</p>
                    <p className="function-outline text-3xl">{func.name}</p>

                </div>
                <div className="flex flex-row gap-2 ">
                    <div>
                        { params.length!==0 && params[0] === "&signer" ? <p className="text-2xl">signer</p> : <p className="text-2xl">signer,</p>}
                        {params.filter(param => param!=="&signer").map((param: Types.MoveType, index: number) => {
                            return (
                                <div key={index} className="flex flex-row items-baseline justify-start px-2 py-3 m-3 rounded-xl text-white">
                                    { }
                                    <p className="p-1 text-bold text-right">{param}</p>
                                    <input className="px-3 text-black py-2 rounded-xl outline outline-2" type="text" placeholder={""} value={argList[index]?.value} onChange={(event) => updateArg(index, event.target.value,param)} />
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
                {argList.length !== 0 && <p className="text-2xl">args: {argList.map((arg: any) => arg.value).join(", ")}</p>}

                {gList.length !== 0 && <p className="text-2xl">args: {gList.map((arg: any) => arg).join(", ")}</p>}
                        
                <button onClick={() => checkTxn(address, account?.address?.toString()||"", module.abi?.name || "", func.name, gList as string[], argList)} className="seam-button ">send Txn</button>
            </div>
            {/* <button onClick={()=>setShowTxnModal(true)} className="seam-button ">Create Txn</button> */}
        </div>
    )
}

export default TxnPreview;