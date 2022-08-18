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
interface ModExploreProps {
    // isLoading: boolean;
    // txns: Types.OnChainTransaction[];
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
    // const [selectedFunction, setSelectedFunction] = useState<Types.MoveFunction | null>(null);

    const ModuleInfo = ({ module }: { module: Types.MoveModuleBytecode }) => {
        const { abi } = module;

        return (
            <div className="text-center w-full h-full" >
                <div className="flex  flex-row p-2">
                    <div className=" px-2 bg-lightPurple bg-opacity-30 rounded-xl">
                        <p className="text-2xl p-1">Module</p>
                        <div className="inline-block align-baseline">
                            <p className="text-sm">Module name: </p>
                            {abi?.name !== undefined ? <h1 className="module-outline">{abi.name}</h1> : <h1>No name</h1>}
                        </div>
                        {abi?.exposed_functions !== undefined ? <h2 className="text-center opacity-70">{abi.exposed_functions.length} exposed function(s)</h2> : <h2>No exposed functions</h2>}
                        {/* <div> */}
                        <div className="modScroller outline-dashed rounded-xl outline-white p-1">
                            {abi?.exposed_functions.map((func: Types.MoveFunction) => {
                                return (
                                    <div className="flex cc px-4">
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
            // setSelectedFunction(modules[0].functions[0]);
        }).catch((err: any) => {
            console.log(err);
            setError(err);
        }
        )

    }
    const setUserAccount = async () => {
        try {
            if (await window.martian.isConnected()) {
                const res = await (window as any).martian.connect();
                setSelectedAddress(res.address);
            }

        } catch (err) {
            console.log("not authed")
        }
    }

    useEffect(() => {
        switchAddress(selectedAddress);
    }
        , [selectedAddress]);

    return (
        <div className="flex flex-col w-full items-center justify-center">
            {selectedModule && selectedFunction && showTxnModal ? <TransactionModal sender={"0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270"} client={client} address={selectedAddress} setIsOpen={setShowTxnModal} module={selectedModule} isOpen={showTxnModal} func={selectedFunction} /> : null}
            <p className="text-2xl ">Module Overview</p>

            <div className="flex flex-col w-1/2 seam-outline">
                <div className="flex flex-row ">
                    {/* create an input for account address and update the state on change */}
                    <input className="w-full p-2 outline outline-2 outline-white bg-black border-2xl" type="text" placeholder="Enter address" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} />
                </div>
                <div className="bg-white bg-opacity-30 p-2 m-2">
                    <p>Select An account</p>
                    <div className="flex row w-1/2 outline justify-between text-black outline-white rounded-lg bg-white bg-opacity-80">
                        <select className="addr-dropdown   px-4  " onChange={(event) => switchAddress(event.target.value)}>
                            {addressList.map((addr) => (
                                <option value={addr}>
                                    <p className="">{addr}</p>
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => setUserAccount()}
                        className="seam-button">
                        Your Account
                    </button>
                </div>
                <p>or Select a Dapp</p>
                <div className="flex flex-row items-center  scrollbar scrollbar-thumb-blue  gap gap-4 dappScroll">
                    {dapps.map((dapp: Dapp) => (
                        <DappBadge dapp={dapp} setSelectedAddress={switchAddress} isSelected={dapp.address ? (dapp.address === selectedAddress) : false} />
                    )
                    )}
                </div>
                <span className="flex justify-center items-center p-1 m-1">
                    <p className="text-2xl text-white">Selected address: </p>
                    <p className=" text-2xl account-outline">{formatParam(selectedAddress)}</p>
                </span>
            </div>

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
            <div className="flex flex-row items-start justify-center gap-4">
                <div className="rounded-xl p-4 items-start justify-start">
                    <p className="text-2xl text-center p-2">Account Modules</p>
                    <div className="fnScroller justify-start seam-outline p-2">
                        {modules.map((mod: Types.MoveModuleBytecode) => {
                            return (<div className="items-center justify-center">
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
            <div className="flex w-1/2 dappScroller justify-center items-center gap gap-3">
                {selectedModule !== undefined ? <ModuleTypes module={selectedModule} /> : null}
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