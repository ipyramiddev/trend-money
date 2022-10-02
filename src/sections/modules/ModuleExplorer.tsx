import { AptosAccount, AptosClient, Types } from "aptos";
import { formatParam, parsePayloadFunction, shortenAddress, TimeAgo } from "hooks/formatting";
import { aptosTxnLink } from "hooks/useExplorer";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import { loadModules, loadResources } from "hooks/useAptos";
import { divide } from "lodash";
import FunctionInfo from "./functions/FunctionInfo";
import ModuleTypes from "./ModuleTypes";
import { dapps } from 'data/dapps/dapp_data';
import { Dapp } from "components/dapps/types";
import DappBadge from "components/DappBadge";
import TxnPreview from "./TxnPreview";
import TransactionModal from "modals/TransactionModal";

import AccountResources from "sections/account/AccountResources";
import { FaClipboard, FaRegArrowAltCircleLeft, FaRegClipboard } from "react-icons/fa";
import { textCopy } from "utils";
import { loadTxs } from "hooks/useTransaction";
import { useWeb3 } from "@fewcha/web3-react";
import TxnFilterView from "views/TxnFilterView";
import ResourceDetailView from "views/ResourceDetailView";
import ModuleOutline from "components/etc/ModuleOutline";
interface ModExploreProps {
    client: AptosClient;
    mod: Types.MoveModuleBytecode[];
}

const ModuleExplorer = ({ client, mod }: ModExploreProps) => {
    const [selectedAddress, setSelectedAddress] = useState<string>("0x1");
    const [selectedModule, setSelectedModule] = useState<Types.MoveModuleBytecode>(mod[0]);
    const [selectedFunction, setSelectedFunction] = useState<Types.MoveFunction | null>(null);
    const [modules, setModules] = useState<Types.MoveModuleBytecode[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showTxnModal, setShowTxnModal] = useState<boolean>(false);
    const [typeArgs, setTypeArgs] = useState<string[]>(["0x1::aptos_coin::AptosCoin"]);
    const [tempArgs, setTempArg] = useState<string[]>([]);
    // const { account,isConnected } =useWeb3();

    const ModuleInfo = ({ module }: { module: Types.MoveModuleBytecode }) => {
        const { abi, } = module;

        return (
            <div className="px-2 flex flex-col rounded-xl">
                <div className="flex flex-row p-2 justify-center">
                    <p className="text-2xl p-1">Module:</p>
                    {abi?.name !== undefined ? <ModuleOutline module_name={abi.name} /> : <h1>No name</h1>}
                </div>

                {abi?.exposed_functions !== undefined ? <h2 className="text-center opacity-70">{abi.exposed_functions.length} exposed function(s)</h2> : <h2>No exposed functions</h2>}
                <div className="flex flex-row justify-between">
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
                {selectedFunction !== null ?
                    <FunctionInfo function={selectedFunction} />
                    : <div>No function selected</div>}
                <div>
                </div>
            </div>
        )
    }

    const switchDapp = async (d: Dapp) => {
        if (d.address) {
            switchAddress(d.address);
        }
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
        })
    }

    useEffect(() => {
        switchAddress(selectedAddress);
    }
        , []);



    return (
        <div className="w-full items-center justify-center">
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
            <div className="flex flex-row w-full justify-center">
                {/* <div> */}
                <div className="w-1/3 seam-outline">
                    <div className="flex flex-row text-black gap gap-2">
                        <input className="w-1/2 py-2 px-4 outline outline-2 outline-white rounded-2xl" type="text" placeholder="Enter address" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} />
                        <button data-tip="load address" className="btn m-1 text-white" onClick={() => switchAddress(selectedAddress)}> <FaRegArrowAltCircleLeft /></button>
                        <button data-tip="Copy Addr." className="btn m-1 text-white" onClick={() => textCopy(selectedAddress)}> <FaClipboard /></button>
                        <button data-tip="Aptos Token(NFT) Lib" className="seam-button" onClick={() => switchAddress('0x3')}>0x3</button>
                        
                    </div>
                    <p className="text-center text-lg font-bold pt-2">or Select a Dapp</p>
                    <div className="flex flex-wrap py-2 items-center scrollbar scrollbar-thumb-blue gap gap-3 w-full">
                        {dapps.filter((dapp: any) => (dapp.address)).map((dapp: any) => (
                            <DappBadge dapp={dapp} setSelectedDapp={switchDapp} isSelected={dapp.address ? (dapp.address === selectedAddress) : false} />
                        )
                        )}
                    </div>
                    <span className="flex justify-center items-center p-1 m-1">
                        <p className="text-2xl text-white">Selected address: </p>
                        <p className=" text-2xl account-outline">{formatParam(selectedAddress)}</p>
                    </span>
                    <p className="text-xl text-center py-1">Account Modules</p>
                    <div className=" flex flex-wrap scrollbar h-60 overflow-y-scroll scrollbar-thumb-blue scrollbar-track-black flex-row justify-start seam-outline p-2 gap gap-2">
                        {modules.map((mod: Types.MoveModuleBytecode, i: number) => {
                            return (<div key={i} className="items-center justify-center">
                                <button className=" module-outline" onClick={() => setSelectedModule(mod)}>{mod.abi?.name}</button>
                            </div>)
                        }
                        )}
                    </div>
                    <ReactTooltip place="top" textColor="white" />
                </div>
                {/* </div> */}


                <div className="flex flex-col">
                    {selectedModule !== undefined ?
                        <ModuleInfo module={selectedModule} />
                        : <div>No modules found</div>}
                    {selectedModule && selectedFunction ?
                        // null
                        <TxnPreview
                            address={selectedAddress}
                            // account={userAccount}
                            module={selectedModule}
                            func={selectedFunction}
                            params={selectedFunction?.params}
                            generic_types={selectedFunction?.generic_type_params}
                            setShowTxnModal={setShowTxnModal}
                            client={client}
                        />
                        : null}

                </div>
            </div>
            {selectedModule !== undefined ? <ModuleTypes module={selectedModule} /> : null}

            <div className="flex flex-row gap gap-2 p-2 ">
                <TxnFilterView address={selectedAddress} />
                <ResourceDetailView address={selectedAddress} showDetails={true} />
            </div>
        </div>
    );
}

export default ModuleExplorer