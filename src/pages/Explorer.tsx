import React, { useState, useEffect } from "react";
import {
  AptosClient,
  AptosAccount,
  FaucetClient,
  BCS,
  TxnBuilderTypes,
  HexString,
  Types,
} from "aptos";
import ModuleExplorer from "../sections/modules/ModuleExplorer";
import UserExplorer from "../sections/UserExplorer";
import Pools from "../sections/pools/Pools";
import DappsView from "sections/dapps/DappsView";
import { formatParam } from "hooks/formatting";
import { ExplorerTabView } from "views/ExplorerTabView";
import Coins from "./Coins";
import { Outlet } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

const Explorer = () => {
  const { account, connected, wallet: currentWallet } = useWallet();
  let { pathname } = useLocation();

  const tabs = [
    { name: "Modules + Dapps", id: "modules/mainnet/0x1" },
    // { name: 'Transactions', id: 'txns' },
    { name: "User Account ", id: "user" },
    { name: "Dapps", id: "dapps/home" },
    // { name: 'Stats', id: 'stats' },
    { name: "Validators", id: "validators" },
    { name: "IDE", id: "IDE" },
    // { name: 'Coins', id: 'coins' },
    { name: 'Seam Pass', id: 'seampass' }
  ];
  const view = pathname;
  return (
    <div className="flex flex-col min-h-screen p-3 m-2 items-center justify-start">
      <p className="text-5xl text-center">Explorer</p>
      <div className="flex flex-row items-start justify-start">
        <div className="flex flex-row items-start">
          {tabs.map((tab: any, index) => {
            return (
              <Link to={`${tab.id}`} key={index}>
                <div
                  className={`px-2 m-2 py-1 hover:opacity-100 rounded-xl ${
                    view.includes(tab.id)
                      ? "underline text-3xl font-bold"
                      : "opacity-60 text-2xl"
                  }`}
                >
                  <p className=" px-2 m-1 py-1 text-center justify-center">
                    {tab.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col h-full w-full items-center justify-start">
        <Outlet />
      </div>
    </div>
  );
};

export default Explorer;
