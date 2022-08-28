import { AptosAccount, AptosClient, Types } from "aptos";
// import { MoveFunction, MoveModule, UserTransaction } from "aptos/dist/api/data-contracts";
import { formatParam, parsePayloadFunction, shortenAddress, TimeAgo } from "hooks/formatting";
import { aptosTxnLink } from "hooks/useExplorer";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import { loadModules } from "hooks/useAptos";
import { divide } from "lodash";
import FunctionInfo from "./functions/FunctionInfo";
import ModuleTypes from "./ModuleTypes";
import { dapps } from "dapp_data";
import { Dapp } from "components/dapps/types";
import DappBadge from "components/DappBadge";
import { MoveFunction } from "aptos/dist/generated";
import TxnPreview from "./TxnPreview";
import TransactionModal from "modals/TransactionModal";
import TxnList from "sections/TxnList";
import AccountResources from "sections/account/AccountResources";
import { FaClipboard, FaRegClipboard } from "react-icons/fa";
import { textCopy } from "utils";
interface ModExploreProps {
    client: AptosClient;
    mod: Types.MoveModuleBytecode[];
}

const ModuleExplorer = ({ client, mod }: ModExploreProps) => {
    const [selectedAddress, setSelectedAddress] = useState<string>("0x1");
    const [appSelected, setAppSelected] = useState<boolean>(false)
    const [selectedModule, setSelectedModule] = useState<Types.MoveModuleBytecode>(mod[0]);
    const [selectedFunction, setSelectedFunction] = useState<Types.MoveFunction | null>(null);
    const [modules, setModules] = useState<Types.MoveModuleBytecode[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showTxnModal, setShowTxnModal] = useState<boolean>(false);
    const [addressList, setAddressList] = useState<string[]>(["0x1", "0x3",]);
    const [typeArgs, setTypeArgs] = useState<string[]>(["0x1::aptos_coin::AptosCoin"]);
    const [tempArgs, setTempArg] = useState<string[]>([]);

    const ModuleInfo = ({ module }: { module: Types.MoveModuleBytecode }) => {
        const { abi } = module;


        return (
            <div className="flex flex-row">
            <div className=" px-2 rounded-xl">
                    <div className="flex flex-row p-2">
                    <p className="text-2xl p-1">Module</p>
                        {abi?.name !== undefined ? <h1 className="module-outline">{abi.name}</h1> : <h1>No name</h1>}
                    </div>
                    
                    {abi?.exposed_functions !== undefined ? <h2 className="text-center opacity-70">{abi.exposed_functions.length} exposed function(s)</h2> : <h2>No exposed functions</h2>}
                    <div className="modScroller outline-dashed rounded-xl outline-white p-1">
                        {abi?.exposed_functions.map((func: Types.MoveFunction) => {
                            return (
                                <div className="flex cc px-4">
                                    <button className="function-outline" onClick={() => setSelectedFunction(func)}>{func.name}</button>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div>
                    {selectedFunction !== null ?
                        <FunctionInfo function={selectedFunction} />
                        : <div>No function selected</div>}
                </div>
            </div>

        )
    }


    const switchAddress = async (address: string) => {
        loadModules(address).then((modules: Types.MoveModuleBytecode[]) => {
            setModules(modules);
            setSelectedFunction(modules[0].abi?.exposed_functions[0] || null);
            setSelectedAddress(address);
            setSelectedModule(modules[0]);
        }).catch((err: any) => {
            console.log(err);
            setError(err);
        }
        )
    }

    useEffect(() => {
        switchAddress(selectedAddress);
    }
        , [selectedAddress]);

    return (
        <div className="flex flex-col w-full items-center justify-center">
            {selectedModule && selectedFunction && showTxnModal ?
                <TransactionModal
                    // sender={account?.address} 
                    client={client}
                    address={selectedAddress}
                    setIsOpen={setShowTxnModal}
                    module={selectedModule}
                    type_arguments={typeArgs}
                    args={tempArgs}
                    isOpen={showTxnModal}
                    func={selectedFunction} />
                : null}
            <div className="flex flex-row">

                <div className="flex flex-col w-3/4 seam-outline">
                    <div className="flex flex-row text-black gap gap-2">
                        <input className="w-full py-2 px-4 outline outline-2 outline-white rounded-2xl" type="text" placeholder="Enter address" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} />
                        <button className="btn m-1 text-white" onClick={() => textCopy(selectedAddress)}> <FaClipboard /></button>
                    </div>
                    <div className="bg-white bg-opacity-30 p-2 m-2">
                        <p>load system account</p>
                        <div className="flex row w-1/2 outline justify-between text-black outline-white rounded-lg bg-white bg-opacity-80">
                            <select className="addr-dropdown px-4 " placeholder={"enter an address"} onChange={(event) => switchAddress(event.target.value)}>
                                {addressList.map((addr) => (
                                    <option value={addr}>
                                        <p className="">{addr}</p>
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <p>or Select a Dapp</p>
                    <div className="flex flex-row items-center scrollbar scrollbar-thumb-blue  gap gap-4 dappScroll">
                        {dapps.filter((dapp: any) => (dapp.address)).map((dapp: any) => (
                            <DappBadge dapp={dapp} setSelectedAddress={switchAddress} isSelected={dapp.address ? (dapp.address === selectedAddress) : false} />
                        )
                        )}
                    </div>
                    <span className="flex justify-center items-center p-1 m-1">
                        <p className="text-2xl text-white">Selected address: </p>
                        <p className=" text-2xl account-outline">{formatParam(selectedAddress)}</p>
                    </span>
                </div>
                <div>
                    {selectedModule && selectedFunction ?

                        <TxnPreview
                            address={selectedAddress}
                            // account={userAccount}
                            module={selectedModule}
                            func={selectedFunction}
                            params={selectedFunction?.params}
                            setShowTxnModal={setShowTxnModal}
                            client={client}
                        />
                        : null}
                </div>
            </div>
            <div className="flex flex-row w-full items-start justify-center gap-4">
                <div className="rounded-xl p-2 items-start justify-start">
                    <p className="text-2xl text-center p-2">Account Modules</p>
                    <div className="fnScroller justify-start seam-outline p-2">
                        {modules.map((mod: Types.MoveModuleBytecode) => {
                            return (<div className="items-center justify-center">
                                <button className=" module-outline" onClick={() => setSelectedModule(mod)}>{mod.abi?.name}</button>
                            </div>)
                        }
                        )}
                    </div>
                    <div>
                    {selectedModule !== undefined ? <ModuleTypes module={selectedModule} /> : null}
                    </div>
                </div>
                <div>
                    {selectedModule !== undefined ?
                        <ModuleInfo module={selectedModule} />
                        : <div>No modules found</div>}
                </div>
            </div>
            <div className="flex flex-row w-1/2 items-center justify-center gap gap-4">
                {/* <AccountResources address={selectedAddress}/> */}
                
                {/* <TxnList /> */}
            </div>
        </div>
    );
}


const Module = (mod: Types.MoveModuleBytecode) => {
    return (
        <div>
            <p className="font-bold">{mod.abi?.name}</p>
            <div className="seam-outline fnScroller">
                {mod.abi?.exposed_functions.map((func: MoveFunction) => (
                    <div className="flex flex-row justify-between p-2 bg-blue2 bg-opacity-40">
                        <p className="function-outline">{func.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default ModuleExplorer;