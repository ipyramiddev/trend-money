import App from "App";
import Explorer from "pages/Explorer";
import NodePage from "pages/NodePage";
import { Trade } from "pages/Trade";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import DappsView from "sections/dapps/DappsView";
import ModuleExplorer from "sections/modules/ModuleExplorer";


export const BaseRouter = () => {
  const router =  createBrowserRouter(
    createRoutesFromElements(
      <Route>
                <Route path="/" element={<Trade />} />
                
                {/* <Route path="powersets" element={<Trade/>} /> */}
                <Route path= "/staking" element = {<NodePage/>}/>
                <Route path="explorer" element={<Explorer />} />
      </Route>
  
    )
  );

      return router;


};