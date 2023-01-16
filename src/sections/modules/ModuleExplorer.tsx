import { Types } from "aptos";
import { formatParam, TimeAgo } from "hooks/formatting";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import { getClient, loadModules, useClient } from "hooks/useAptos";
import FunctionInfo from "./functions/FunctionInfo";
import ModuleTypes from "./ModuleTypes";
import { dapps } from "data/dapps/dapp_data";
import DappBadge from "components/DappBadge";
import TxnPreview from "./TxnPreview";
import { FaClipboard, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { textCopy } from "utils";
import TxnFilterView from "views/TxnFilterView";
import ResourceDetailView from "views/ResourceDetailView";
import ModuleOutline from "components/etc/ModuleOutline";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import SwitchView from "sections/SwitchView";
import AddDappModal from "modals/AddDappModal";

const ModuleExplorer = () => {
  let mod = useLoaderData() as Types.MoveModuleBytecode[];
  let { addr, name, network } = useParams();

  const client = useClient();
  const [selectedAddress, setSelectedAddress] = useState<string>(addr || "");
  const [selectedModule, setSelectedModule] =
    useState<Types.MoveModuleBytecode>(mod[0]);
  const [selectedFunction, setSelectedFunction] =
    useState<Types.MoveFunction | null>(null);
  const [modules, setModules] = useState<Types.MoveModuleBytecode[]>(mod);
  const [addModal, setAddModal] = useState<boolean>(false);
  const updateView = async (addr: string) => {
    setSelectedAddress(addr);
    const client = getClient("Mainnet");

    console.log("running module loader");
    const mods = await loadModules(addr, client);
    const func_name = mods[0].abi?.exposed_functions.filter(
      (m) => m.name === name
    )[0];
    setModules(mods);
    setSelectedModule(mods[0]);
    setSelectedFunction(func_name || null);
  };

  const ModuleInfo = ({ module }: { module: Types.MoveModuleBytecode }) => {
    const { abi } = module;

    return (
      <div className="px-2 flex flex-col  rounded-xl">
        <div className="flex flex-row p-2 justify-center">
          <p className="text-2xl p-1 align-text-bottom">Module:</p>
          {abi?.name !== undefined ? (
            <ModuleOutline module_name={abi.name} />
          ) : (
            <h1>No name</h1>
          )}
        </div>
        
        <div className="flex flex-row justify-between">
          <div className="modScroller seam-outline rounded-xl outline-white p-1">
            {abi?.exposed_functions.map((func: Types.MoveFunction) => {
              return (
                <div className="flex cc px-4">
                  <button
                    className="function-outline hover:bg-orange bg-opacity-20"
                    onClick={() => setSelectedFunction(func)}
                  >
                    {func.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="w-full items-center justify-center">
      <div className="flex flex-col w-full justify-center">
        {addModal ? <AddDappModal /> : null}

        <div className="seam-outline">
          <div className="flex flex-row text-black gap gap-2">
            <input
              className="w-1/2 py-2 px-4 outline outline-2 outline-white rounded-2xl"
              type="text"
              placeholder="Enter address"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            />
            <Link to={`/explorer/modules/${network}/${selectedAddress}`}>
              <button data-tip="load address" className="btn m-1 text-white">
                {" "}
                <FaRegArrowAltCircleLeft />
              </button>
            </Link>
            <button
              data-tip={`${selectedAddress} \n Copy Addr.`}
              className="btn m-1 text-white"
              onClick={() => textCopy(selectedAddress)}
            >
              {" "}
              <FaClipboard />
            </button>
            <button
            className="seam-button m-1 w-30"
            onClick={() => setAddModal(true)}
          >
            Add Dapp
          </button>
          </div>
          <p className="text-center text-lg font-bold pt-2">or Select a Dapp</p>
          <div className="flex flex-wrap py-2 items-center scrollbar scrollbar-thumb-blue gap gap-3 w-full">
            {dapps
              .filter((dapp: any) => dapp.address)
              .map((dapp: any) => (
                <Link to={`/explorer/modules/${network}/${dapp.address}`}>
                  <button
                    onClick={(event) => {
                      updateView(dapp.address);
                      window.history.pushState(
                        {},
                        "",
                        `/explorer/modules/${network}/${dapp.address}`
                      );
                      setSelectedAddress(dapp.address);
                    }}
                  >
                    <DappBadge
                      dapp={dapp}
                      isSelected={
                        dapp.address ? dapp.address === selectedAddress : false
                      }
                    />
                  </button>
                </Link>
              ))}
          </div>
          
          <span className="flex justify-center items-center p-1 m-1">
            <p className="text-2xl text-white">Selected address: </p>
            <p className=" text-2xl account-outline">
              {formatParam(selectedAddress)}
            </p>
            {/* <p className=" text-2xl account-outline">{network}</p> */}
          </span>
          <div className="flex flex-row">
            <div>
              <p className="text-xl text-center py-1">Account Modules</p>
              <div className="flex flex-wrap scrollbar h-60 overflow-y-scroll scrollbar-thumb-blue scrollbar-track-black flex-row justify-start seam-outline p-2 gap gap-2">
                {modules.map((mod: Types.MoveModuleBytecode, i: number) => {
                  return (
                    <div key={i} className="items-center justify-center">
                      <button
                        className=" module-outline hover:bg-blue"
                        onClick={() => setSelectedModule(mod)}
                      >
                        {mod.abi?.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {selectedModule !== undefined ? (
              <ModuleInfo module={selectedModule} />
            ) : (
              <div>Please Select an Address with deployed modules</div>
            )}
            <ReactTooltip place="top" textColor="white" />
          </div>
        </div>

        <div className="flex flex-col mx-7 p-4">
          <div className="">
            {selectedModule && selectedFunction ? (
              <TxnPreview
                address={selectedAddress}
                module={selectedModule}
                func={selectedFunction}
                params={selectedFunction?.params}
                generic_types={selectedFunction?.generic_type_params}
                client={client}
              />
            ) : null}
          </div>
          <SwitchView>
            <TxnFilterView address={selectedAddress} />
            <ModuleTypes module={selectedModule} />
            <ResourceDetailView
              address={selectedAddress}
              showDetails={true}
              showUnder={true}
            />
          </SwitchView>
        </div>
      </div>
    </div>
  );
};

export default ModuleExplorer;
