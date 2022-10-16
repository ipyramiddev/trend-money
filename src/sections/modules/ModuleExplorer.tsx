import {Types } from "aptos";
import { formatParam, TimeAgo } from "hooks/formatting";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import { loadModules, useClient } from "hooks/useAptos";
import FunctionInfo from "./functions/FunctionInfo";
import ModuleTypes from "./ModuleTypes";
import { dapps } from 'data/dapps/dapp_data';
import DappBadge from "components/DappBadge";
import TxnPreview from "./TxnPreview";
import { FaClipboard, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { textCopy } from "utils";
import TxnFilterView from "views/TxnFilterView";
import ResourceDetailView from "views/ResourceDetailView";
import ModuleOutline from "components/etc/ModuleOutline";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import SwitchView from "sections/SwitchView";

const ModuleExplorer = () => {
    let mod = useLoaderData() as Types.MoveModuleBytecode[];
    let { addr, name } = useParams();
    
    const client = useClient();
    const [selectedAddress, setSelectedAddress] = useState<string>(addr || '');
    const [selectedModule, setSelectedModule] = useState<Types.MoveModuleBytecode>(mod[0]);
    const [selectedFunction, setSelectedFunction] = useState<Types.MoveFunction | null>(null);
    const [modules, setModules] = useState<Types.MoveModuleBytecode[]>(mod);

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



    useEffect(() => {
        // switchAddress(selectedAddress);
    }
        , []);

    return (
        <div className="w-full items-center justify-center">
            <div className="flex flex-row w-full justify-center">
                <div className="w-1/3 seam-outline">
                    <div className="flex flex-row text-black gap gap-2">
                        <input className="w-1/2 py-2 px-4 outline outline-2 outline-white rounded-2xl" type="text" placeholder="Enter address" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} />
                        <Link to={`/explorer/modules/${selectedAddress}`}>
                            <button data-tip="load address" className="btn m-1 text-white"> <FaRegArrowAltCircleLeft /></button>
                        </Link>
                        <button data-tip="Copy Addr." className="btn m-1 text-white" onClick={() => textCopy(selectedAddress)}> <FaClipboard /></button>
                    </div>
                    <p className="text-center text-lg font-bold pt-2">or Select a Dapp</p>
                    <div className="flex flex-wrap py-2 items-center scrollbar scrollbar-thumb-blue gap gap-3 w-full">
                        {dapps.filter((dapp: any) => (dapp.address)).map((dapp: any) => (
                            <DappBadge dapp={dapp} isSelected={dapp.address ? (dapp.address === selectedAddress) : false} />
                        )
                        )}
                    </div>
                    <span className="flex justify-center items-center p-1 m-1">
                        <p className="text-2xl text-white">Selected address: </p>
                        <p className=" text-2xl account-outline">{formatParam(selectedAddress)}</p>
                        {/* <p className=" text-2xl account-outline">{network}</p> */}
                    </span>

                    <p className="text-xl text-center py-1">Account Modules</p>
                    <div className="flex flex-wrap scrollbar h-60 overflow-y-scroll scrollbar-thumb-blue scrollbar-track-black flex-row justify-start seam-outline p-2 gap gap-2">
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
                        <TxnPreview
                            address={selectedAddress}
                            module={selectedModule}
                            func={selectedFunction}
                            params={selectedFunction?.params}
                            generic_types={selectedFunction?.generic_type_params}
                            client={client}
                        />
                        : null}
                </div>
            </div>
            <SwitchView>

                <TxnFilterView address={selectedAddress} />
            <ModuleTypes module={selectedModule} />
                <ResourceDetailView address={selectedAddress} showDetails={true} />
            </SwitchView>
            <div className="flex flex-row gap gap-2 p-2 ">
            </div>
        </div>
    );
}

export default ModuleExplorer