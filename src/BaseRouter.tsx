import { Types } from "aptos";
import {
  aptStats,
  getClient,
  loadCoins,
  loadModules,
  loadValidators,
} from "hooks/useAptos";
import { loadTxs } from "hooks/useTransaction";
import AptosStats from "pages/AptosStats";
import Coins from "pages/Coins";
import Dao from "pages/DAO";
import DappInfo from "pages/DappInfo";
import ErrorPage from "pages/ErrorPage";
import Explorer from "pages/Explorer";
import DetailPage from "pages/DetailPage";
import IDE from "pages/IDE";
import SeamPass from "pages/SeamPass";
import NodePage from "pages/NodePage";
import Home from "pages/Home";
import Login from "pages/Login";
import { AuthProvider } from "components/Auth";
import { Trade } from "pages/Trade";
import { Dashboard } from 'pages/Dashboard';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import DappFrame from "sections/dapps/DappFrame";
import DappsView from "sections/dapps/DappsView";
import SplashFrame from "sections/dapps/SplashFrame";
import ModuleExplorer from "sections/modules/ModuleExplorer";
import Validators from "sections/staking/Validators";
import UserExplorer from "sections/UserExplorer";
import { dappByName, dappsByAddress, isDapp } from "util/dappUtils";
import Wrapper from './Wrapper';
import React, { useState } from "react";

export const BaseRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/trade" element={<Trade />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="powersets" element={<Trade />} />
        <Route element={<Dao />} path="dao" />

        <Route
          element={<AptosStats />}
          path="stats/:network/"
          loader={async ({
            request,
            params,
          }: {
            request: any;
            params: any;
          }) => {
            const client = getClient(params.network || "Mainnet");
            // const coinInfo = await client.getCoinInfo();
            console.log("running  stat loader");
            return aptStats(client);
          }}
        />
        <Route path="detail" element={<DetailPage />} />
        <Route path="staking" element={<NodePage />} />
        <Route
          path="explorer"
          element={<Explorer />}
          errorElement={<ErrorPage />}
        >
          <Route
            element={<ModuleExplorer />}
            path="modules/:network/:addr"
            // loading={<div>loading</div>}
            loader={async ({
              request,
              params,
            }: {
              request: any;
              params: any;
            }) => {
              const client = getClient(params.network || "Mainnet");

              console.log("running module loader");
              return loadModules(params.addr || "0x1", client);
            }}
          />
          {/* <Route
            element={<Coins />}
            path="coins"
            // loading={<div>loading</div>}
            loader={async ({
              request,
              params,
            }: {
              request: any;
              params: any;
            }) => {
              const client = getClient(params.network || "Mainnet");

              console.log("running module loader");
              return loadCoins(client);
            }}
          /> */}
          <Route
            element={<Validators />}
            path="validators/"
            loader={async ({
              request,
              params,
            }: {
              request: any;
              params: any;
            }) => {
              console.log("running validator loader");
              const { validatorInfo, validatorSet, defaultConfig } =
                await loadValidators();
              const vSet = (validatorSet.data as any).active_validators;
              const info = (validatorInfo.data as any).validators;

              const vSetData = {
                validators: vSet,
                // count: vSet.active_validators.length(),
              };

              console.log("V INfo", info);
              return {
                validatorHistory: info,
                validatorInfo: vSetData,
                defaultConfig,
              };
            }}
          ></Route>

          <Route element={<UserExplorer />} path="user"></Route>

          <Route element={<IDE />} path="ide"></Route>

          <Route element={<SeamPass />} path="seampass"></Route>

          <Route element={<DappsView />} path="dapps/:dappName"></Route>
          <Route
            path="info/:dapp/"
            element={<DappInfo />}
            loader={async ({
              request,
              params,
            }: {
              request: any;
              params: any;
            }) => {
              console.log("params are:", params);
              const dapp = dappByName(params.dapp || "");
              return { ...dapp, txs: loadTxs(dapp?.address || "0x1") };
            }}
          />
        </Route>

        {/* Auth assignment for CSC424 ----------------------------- */}

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
          <Route element={<Home />} path="home"/> 
          <Route element={<Login id={""} name={""} />} path="login"/> 

      </Route>
    )
  );

  return router;
};
