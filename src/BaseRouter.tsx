import App from "App";
import { Types } from "aptos";
import { aptStats, getClient, loadModules, loadValidators } from "hooks/useAptos";
import { loadTxs } from "hooks/useTransaction";
import AptosStats from "pages/AptosStats";
import  Dao from "pages/DAO";
import DappInfo from "pages/DappInfo";
import ErrorPage from "pages/ErrorPage";
import Explorer from "pages/Explorer";
import IDE from "pages/IDE";
import NodePage from "pages/NodePage";
import { Trade } from "pages/Trade";
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


export const BaseRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Trade />} />
        <Route path="powersets" element={<Trade/>} />
        <Route
            element={<Dao />}
            path="dao"
          >
          </Route>

        <Route
          element={<AptosStats />}
          path="stats/:network/"
          loader={async ({ request, params }) => {
            const client = getClient(params.network||"Mainnet");
            // const coinInfo = await client.getCoinInfo();
            console.log("running  stat loader");
            return aptStats(client)
          }}
          >
          </Route>

        <Route path="staking" element={<NodePage />} />
        <Route path="explorer" element={<Explorer />} 
          errorElement={<ErrorPage/>}
        >
          <Route
            element={<ModuleExplorer />}
            path="modules/:network/:addr"
            // loading={<div>loading</div>}
            loader={async ({ request, params }) => {
              const client = getClient(params.network||"Mainnet");

              console.log("running module loader");
              return loadModules(params.addr || "0x1", client)
            }}
          />

          <Route
            element={<Validators/>}
            path="validators/"
            loader={async ({ request, params }) => {
              console.log("running validator loader")
              const { validatorInfo, validatorSet, defaultConfig } = await loadValidators()
              const vSet = (validatorSet.data as any).active_validators
              const info = (validatorInfo.data as any).validators

              const vSetData = {
                validators: vSet,
                // count: vSet.active_validators.length(),
              }

              console.log("V INfo", info)
              return { validatorHistory: info, validatorInfo: vSetData, defaultConfig }
            }}
            >
              
            </Route>

         

          <Route
            element={<UserExplorer />}
            path="user"></Route>

          <Route
            element={<IDE />}
            path="ide"
          >
          </Route>


          <Route
            element={<DappsView />}
            path="dapps">
            <Route path="home" element={<SplashFrame/>} />

            <Route path="home" element={<DappsView/>} />

            <Route path=":dapp" element={<DappsView />}
              loader={async ({ request, params }) => {
                console.log('params are:', params);
                if(params.dapp==="home"){
                  return 
                }
                const dapp = dappByName(params.dapp || "");
                return { ...dapp, txs: loadTxs(dapp?.address || '0x1') }
              }} />

            <Route path="info/:dapp/" element={<DappInfo />}
              loader={async ({ request, params }) => {
                console.log('params are:', params);
                const dapp = dappByName(params.dapp || "");
                return { ...dapp, txs: loadTxs(dapp?.address || '0x1') }
              }} />

          </Route>
        </Route>
      </Route>
    )
  );

  return router;


};