import { AptosClient, Types } from "aptos";
import { MoveFunction, MoveModule, UserTransaction } from "aptos/dist/api/data-contracts";
import { formatParam, parsePayloadFunction, shortenAddress, TimeAgo } from "hooks/formatting";
import { aptosTxnLink } from "hooks/useExplorer";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import { loadModules } from "hooks/useAptos";
import { divide } from "lodash";
import FunctionInfo from "./FunctionInfo";
import ModuleTypes from "./ModuleTypes";
import { dapps } from "dapp_data";
import { Dapp } from "components/dapps/types";
import DappBadge from "components/DappBadge";
interface ModExploreProps {
    // isLoading: boolean;
    // txns: Types.OnChainTransaction[];
    client: AptosClient;
    mod: Types.MoveModule[];

}

const ModuleExplorer = ({ client }: ModExploreProps) => {
    const [selectedAddress, setSelectedAddress] = useState<string>("0x1");
    const [selectedModule, setSelectedModule] = useState<Types.MoveModule>();
    const [selectedFunction, setSelectedFunction] = useState<Types.MoveFunction | null>(null);
    const [modules, setModules] = useState<Types.MoveModule[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [addressList, setAddressList] = useState<string[]>(["0x1", "0xb1d4c0de8bc24468608637dfdbff975a0888f8935aa63338a44078eec5c7b6c7", "0xa0df1c4ce26953ad991ac5be3c93bfed002920d8da02ec8292799c720db1d021"]);
    // const [selectedFunction, setSelectedFunction] = useState<Types.MoveFunction | null>(null);

    const ModuleInfo = ({ module }: { module: Types.MoveModule }) => {
        const { abi } = module;

        return (
            <div className="text-center" >
                <div className="flex flex-row p-2">
                    <div className=" px-2 bg-lightPurple bg-opacity-30 rounded-xl">
                        <p className="text-2xl p-1">Module</p>
                        <div className="inline-block align-baseline">
                            <p className="text-sm">Module name: </p>
                            {abi?.name !== undefined ? <h1 className="module-outline">{abi.name}</h1> : <h1>No name</h1>}
                        </div>
                        {abi?.exposed_functions !== undefined ? <h2 className="text-center">{abi.exposed_functions.length} exposed functions</h2> : <h2>No exposed functions</h2>}
                        {/* <div> */}
                        <div className="modScroller outline outline-2 rounded-xl outline-white p-1">
                            {abi?.exposed_functions.map((func: Types.MoveFunction) => {
                                return (
                                    <div className="flex flex-col px-4">
                                        <button className="function-outline" onClick={() => setSelectedFunction(func)}>{func.name}</button>
                                    </div>
                                )
                            })
                            }
                            {/* </div> */}
                        </div>
                    </div>
                    {selectedFunction !== null ?
                        <FunctionInfo function={selectedFunction} />
                        : <div>No function selected</div>}
                    <ModuleTypes module={module} />
                </div>
                

            </div>
        )
    }


    const switchAddress = async (address: string) => {
        loadModules(address).then((modules: Types.MoveModule[]) => {
            setModules(modules);
            setSelectedAddress(address);

            setSelectedModule(modules[0]);
            // setSelectedFunction(modules[0].functions[0]);
        }).catch((err: any) => {
            console.log(err);
            setError(err);
        }
        )

    }
    // const loadModules = async (address: string) => {

    useEffect(() => {
        // switchAddress(selectedAddress);
    }
        , [selectedAddress]);

    return (
        <div className="h-full">
            <p className="text-2xl">Module Overview</p>
            <div className="flex flex-row justify-start gap-2">
                <div className="flex flex-row seam-outline">
                    <div className="">
                    <p>Select An account</p>
                    <select className="addr-dropdown px-4 text-green bg-white bg-opacity-30 " onChange={(event) => switchAddress(event.target.value)}>
                        {addressList.map((addr) => (
                            <option value={addr}>
                                <div className="flex flex-row justify-between p-2 p-1">
                                    <p>{addr}</p>
                                    <p></p>
                                </div>
                            </option>
                        ))}
                    </select>
                <div className="flex flex-col w-full">
                    <p>Dapps</p>
                    <div className="flex dappScroll gap-2 p-2 p-1">
                        {dapps.map((dapp:Dapp) => (
                            <DappBadge dapp={dapp} setSelectedAddress={switchAddress}/>
                        )
                        )}
                    </div>
                    <span className="flex">
                    <p className="">Selected address: </p>
                    <p className="address">{formatParam(selectedAddress)}</p>
                    </span>
                </div>
                    
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
                <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <p className="text-2xl text-center p-2">Account Modules</p>
                    <div className="fnScroller seam-outline p-2">
                        {modules.map((mod: Types.MoveModule) => {
                            return (<div className="flex flex-col px-4">
                                <button className=" module-outline" onClick={() => setSelectedModule(mod)}>{mod.abi?.name}</button>
                            </div>)
                        }
                        )}
                    </div>
                    
                </div>
                <div>
                    {selectedModule !== undefined ?
                        <ModuleInfo module={selectedModule} />
                        : <div>No modules found</div>}
                </div>
            </div>
            <div>
            <div className="flex flex-row gap gap-3">
                    {/* <p className="text-2xl">UseTransaction(</p> */}
                    <p className="account-outline text-2xl">{formatParam(selectedAddress)}</p>
                    <p className="text-3xl">::</p>

                    {selectedModule !== undefined ? <p className="text-2xl module-outline"> {selectedModule.abi?.name}</p> : <p className="text-2xl"></p>}
                    <p className="text-3xl">::</p>
                    <p className="function-outline text-2xl">{selectedFunction?.name}</p>
                    {/* <p className="text-2xl"></p> */}
                </div>
                <button className="text-2xl">Send</button>
                </div>
        </div>
    );
}






const Module = (mod: Types.MoveModule) => {
    return (
        <div>
            <p className="font-bold">{mod.abi?.name}</p>
            <div className="seam-outline fnScroller">
                {mod.abi?.exposed_functions.map((func: MoveFunction) => (
                    <div className="flex flex-row justify-between p-2 p-1 bg-blue2 bg-opacity-40">
                        <p className="function-outline">{func.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default ModuleExplorer;