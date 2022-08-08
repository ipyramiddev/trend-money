import { AptosClient, Types } from "aptos";
import { MoveFunction, MoveModule, UserTransaction } from "aptos/dist/api/data-contracts";
import { formatParam, parsePayloadFunction, shortenAddress, TimeAgo } from "hooks/formatting";
import { aptosTxnLink } from "hooks/useExplorer";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import { loadModules } from "hooks/useAptos";
import { divide } from "lodash";
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
        // if (abi === undefined) {
        //     return <div>No module found</div>;
        // }
        return (
            <div className="">
                <div className="flex flex-row p-2 p-1">
                    <div className="flex flex-col px-2">
                        {abi?.name !== undefined ? <h1>{abi.name}</h1> : <h1>No name</h1>}
                        {abi?.exposed_functions !== undefined ? <h2>{abi.exposed_functions.length} exposed functions</h2> : <h2>No exposed functions</h2>}
                        <div className="fnScroller">
                            {abi?.exposed_functions.map((func: Types.MoveFunction) => {
                                return (
                                    <div className="flex flex-col px-4">
                                        <button className="function-outline" onClick={() => setSelectedFunction(func)}>{func.name}</button>
                                    </div>
                                )
                            })
                            }
                        </div>
                        <ModuleTypes module={module} />
                    </div>
                    {selectedFunction !== null ?
                        <FunctionInfo function={selectedFunction} />
                        : <div>No function selected</div>}
                </div>
                <div className="flex flex-row">
                    <p className="text-2xl">UseTransaction(</p>
                    <p className="address-outline text-2xl">{selectedAddress}</p>
                    {selectedModule !== undefined ? <p className="text-2xl module-outline"> {selectedModule.abi?.name})</p> : <p className="text-2xl">)</p>}
                    {/* <p className="module-outline">{selectedModule?.name}</p> */}
                    <p className="function-outline text-2xl">{selectedFunction?.name}</p>
                    <p className="text-2xl">)</p>
                </div>
                <button className="text-2xl">Send</button>

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
            <h1>Modules for {selectedAddress}</h1>
            <select className="addr-dropdown" onChange={(event) => switchAddress(event.target.value)}>

                {/* <option value={chains[0]} onChange={(event)=>connect(event.target.value.id){</select>}>Select a chain</option> */}
                {addressList.map((addr) => (
                    <option value={addr}>
                        <div className="flex flex-row justify-between p-2 p-1">
                            <p>{addr}</p>
                        </div>
                    </option>
                ))}
            </select>
            <div className="flex flex-row gap-4">
                <div>
                    <div className="fnScroller seam-outline">
                        {modules.map((mod: Types.MoveModule) => {
                            return (<div className="px-2 hover:outline-1">
                                <button className="btn btn-primary module-outline" onClick={() => setSelectedModule(mod)}>{mod.abi?.name}</button>
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
        </div>
    );
}


// const CreateTran


const ModuleTypes = ({ module }: { module: Types.MoveModule }) => {
    const { abi } = module;
    return (
        <div className="fnScroller">
            <p>Module Types</p>
            {abi?.structs.map((struct: Types.MoveStruct) => {
                return (
                    <div className="bg-white bg-opacity-20 rounded-xl p-2 m-3">
                        <h3 className="text-2xl">{struct.name}</h3>
                        <div>
                            <p></p>{struct.fields.map((field: any) => {
                                return (
                                    <div className="flex flex-row gap-1 justify-end">
                                        <p>{field.name}:</p>
                                        <p>{field.type}</p>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                )
            })}

        </div>
    );
}


const FunctionInfo = ({ function: func }: { function: Types.MoveFunction }) => {
    // const FunctionInfo = (function: Types.MoveFunction) => {
    return (
        <div className="flex flex-col ">
            <h1 className="text-">{func.name}</h1>
            {func.params.map((param: string) => {
                return (
                    <div className="flex flex-row gap-1 justify-end">
                        <p className="param-outline">{param}:</p>
                    </div>)
            }
            )}
            {/* <p>{func.returns}</p> */}

        </div>
    )
}


const AccountModules = ({ modules }: { modules: Types.MoveModule[] }) => {
    if (modules.length === 0) {
        return <div>No modules found</div>
    }
    return (
        <div className="">
            <div className="flex flex-row justify-between p-2 p-1 w">
                <p>{modules.length}</p>
                {modules.map((module: MoveModule) => (
                    <div className="">
                        <Module {...module} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const Module = (mod: Types.MoveModule) => {
    return (
        <div>
            <p className="font-bold">{mod.abi?.name}</p>
            <div className="seam-outline">
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