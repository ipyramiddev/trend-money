import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { BCS, HexString, TransactionBuilder, TxnBuilderTypes } from "aptos";
import { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { getClient, loadModules, useClient } from "hooks/useAptos";
import { BASE_TYPES } from "BaseStyles";
import { dapps } from "data/dapps/dapp_data";
import { shortenAddress } from "hooks/formatting";
const ParserServer = () => {
    // const a
    // const buil
    const [script_args, setScriptArgs] = useState<any[]>([]);
    const [addrModules, setAddrModules] = useState<any[]>([]);
    const [modFuncs, setModFuncs] = useState<any[]>([]);
    const {
        AccountAddress,
        TypeTagStruct,
        EntryFunction,
        StructTag,
        TransactionPayloadEntryFunction,
        RawTransaction,
        ChainId,
      } = TxnBuilderTypes;
      
    const client = useClient();
    const buildScript = (func_lock:string,func_name:string,type_tags:any[],signer:any,args:any[]) => {
        // const sgned_function = new Signi
        const parsed_args = args.map((arg:any) => {})

        const entryFunctionPayload = new TransactionPayloadEntryFunction(
            EntryFunction.natural(
              // Fully qualified module name, `AccountAddress::ModuleName`
              func_lock,
              // Module function
              func_name,
              // The coin type to transfer
              [...type_tags],
              // Arguments for function `transfer`: receiver account address and amount to transfer
              [BCS.bcsToBytes(AccountAddress.fromHex(signer.address())), BCS.bcsSerializeUint64(717)],
            ),
          );

        // const tx = build(func_name, arg_elems);
    }
    const valid_dapps = dapps.filter((dapp) => {
        return dapp.address != null
    })

    const loadMod = async (addr:string) => {
        setSendAddr(addr)
        const modules = await loadModules(addr, client)
        console.log("MODS", modules)
        const f_mods = modules.map((mod:any) => {
            return {name: mod.abi.name, value: mod.abi}
        })
        console.log("F_MODS", f_mods)
        setAddrModules(f_mods)
    }

    const selectMod = (mod:any) => {
        setSelectedModule(mod)
        const funcs = mod.value.exposed_functions.map((func:any) => {
        
            return {name: func.name, value: func}
        })
        const pub_funcs = funcs.filter((func:any) => {
            return func.value.visibility === "public"
        })
        setModFuncs(pub_funcs)
    }


    // const verify_arg =

    const add_arg = (arg_string:string,arg_type:string) => {
        setScriptArgs([...script_args, {arg_string,arg_type}])
    }

    const { account, connected } = useWallet();

    const [tempArg, setTempArg] = useState<any>({arg_string:"",arg_type:null});
    const [sendAddr, setSendAddr] = useState<string>("0x1");
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const [selectedFunction, setSelectedFunction] = useState<any>(null);
    // const [parsedArgs , setParsedArgs] = useState<any[]>([]);
    const updateValue = (value:any) => {
        setTempArg({...tempArg, arg_string: value});
    }

    const parseArg = (arg:any) => {
        const arg_type = arg.type;
        const parsed = arg_type(arg.value);
        return parsed;
    }

    return (
        <div className="w-3/4">
            <div className="flex flex-row justify-between items-center">
                <div>

            <CreatableSelect 
            isClearable
                className="seam-input w-80 text-black"
                onChange={(e:any) => {loadMod(e)}}
                options={valid_dapps.map((dapp:any) => {
                    return {value: dapp.address.toString(), label: dapp.name}
                })}
                />
                <div className="flex flex-row justify-start">
            <p className="address-outline">{shortenAddress(sendAddr||"0x1")}</p>
            <p className="address-outline">::</p>
            </div>
            <button className="seam-button"
                onClick={() => {loadMod(sendAddr||'0x1')}}
            > load modules</button>
            </div>
                
                {addrModules.length>0?
                <Select 
                className="seam-input w-30 text-black"
                onChange={(e:any) => {selectMod(e)}}
                options={addrModules.map((mod:any) => {
                    return {value: mod.value, label: mod.name}
                })}
                />
                :null}
                {selectedModule?
                <Select 
                className="seam-input text-black w-30"
                onChange={(e:any) => {setSelectedFunction(e)}}
                options={selectedModule.value.exposed_functions.map((func:any) => {
                    return {value: func, label: func.name}
                })}
                />:null}

            {/* <button className="seam-button"> Parse Script</button>
            <button className="seam-button"> Run Script</button> */}
            <div>
            {/* {args_input(script_args)} */}
            <div className="flex flex-row justify-between">
            {/* <input className=" text-black" type="text" placeholder="value" /> */}
            <Select 
                className="seam-input w-60 text-black"
                onChange={(e:any) => {updateValue(e)}}
                options={[
                    { value: (x:number)=>BCS.bcsSerializeUint64(x), label: 'u64' },
                    { value: (x:string)=>BCS.bcsSerializeStr(x), label: 'str' },
                    { value: (x:string)=>BCS.bcsToBytes(AccountAddress.fromHex(new HexString(x))), label: 'address' },
                ]}
            />
            <input className="bg-white text-black" type="text" placeholder="value" onChange={(e:any) => {updateValue(e.target.value)}}/>
            </div>
            <button className="seam-button" onClick={() => {add_arg(tempArg.arg_string, tempArg.arg_type)}}> Add Arg</button>

            {script_args.map((arg,index) => {
                return (
                    <div className="flex flex-row justify-between items-center">
                        <p>{arg.arg_string}</p>
                        <p>{arg.arg_type}</p>
                        </div>
                )
            })}

            </div>
            </div>
            {connected && account?.address!=null ? (<p>{account.address.toString()||"not connected"}</p>):null}
            
        </div>
    )

}

export default ParserServer;
