import App from "App";
import { ERouter } from "Erouter";
import { loadModules } from "hooks/useAptos";
import { loadTxs } from "hooks/useTransaction";
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
import UserExplorer from "sections/UserExplorer";
import { dappByName, dappsByAddress, isDapp } from "util/dappUtils";


export const BaseRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Trade />} />

        {/* <Route path="powersets" element={<Trade/>} /> */}
        <Route path="staking" element={<NodePage />} />
        <Route path="explorer" element={<Explorer />} >
          <Route
            element={<ModuleExplorer />}
            path="modules/:addr/"
            loader={async ({ request, params }) => {
             
              console.log("running loader");
              return loadModules(params.addr || "0x1")
            }}
          />

            <Route 
            element={<UserExplorer/>}
            path="user"></Route>

            <Route
              element={<IDE/>}
              path="ide"
              >
                </Route>

            <Route 
            element={<DappsView/>}
            path="dapps">
              <Route path="home"element={<SplashFrame/>}/>

              <Route path=":dapp" element={<DappFrame/>}
                loader= {async ({request,params})=>{
                  console.log('params are:',params);
                  const dapp = dappByName(params.dapp||"");
                  return {...dapp, txs:loadTxs(dapp?.address||'0x1')}
                }}/>


            </Route>
        </Route>
      </Route>
    )
  );

  return router;


};