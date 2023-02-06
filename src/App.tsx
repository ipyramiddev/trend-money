import React from "react";
import Web3Provider from "@fewcha/web3-react";
import Wrapper from "./Wrapper";
import { RouterProvider } from "react-router-dom";
import { BaseRouter } from "BaseRouter";
import { AuthProvider } from "components/Auth";

function App() {
  return (
    <div className="bg-darkgray min-h-screen relative z-10">
      <Web3Provider>
        <Wrapper>
          <RouterProvider router={BaseRouter()} />
        </Wrapper>
      </Web3Provider>
    </div>
  );
}

export default App;
