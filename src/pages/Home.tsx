import React from "react";

import { dapps } from "data/dapps/dapp_data";

const defiDapps = ["Tsunami", "Aries", "Laminar", "hippo", "Econia"];

function Protocol(dapp: any) {
  return (
    <div className="w-30 h-12 rounded-2xl">
      <p>{dapp.name}</p>
      <img
        src={`../dapps/${dapp.image}`}
        alt={dapp.name}
        className="w-20 h-20"
      />
    </div>
  );
}

const ProtocolIntegrations = () => {
  const dappData = dapps.filter((d) => defiDapps.includes(d.name));
  console.log(dappData);

  return (
    <div className="flex flex-row justify-center m-5 p-2">
      {dappData.map((dapp, index) => {
        return <Protocol {...dapp} />;
      })}
    </div>
  );
};

function Home() {
  return (
    <div className="min-h-screen pb-10 m-4 bg-black text-white items-center text-center justify-center img-center">
      <p className="text-5xl text-center m-5"> Simple ETF-Style Yield</p>
      <p className="text-2xl text-center m-2 p-4">
        Bundled pools w/ fragmented deposits across protocols in the Aptos
        ecosystem
      </p>
      <div className="flex flex-col items-center">
        <div className="m-4 pb-6 text-center">
          <p className="text-9xl pl-2">S</p>
          <img className="w-80" src="./Tokenfork.png" alt="" />
        </div>
        <div className="m-2">
          <p className="text-2xl text-white">
            multi-pool yield stability via a single deposit
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-center m-5 p-2">
        <a href="/explorer">
          <div className="text-center roundedl-xl seam-outline">
            <p className="text-3xl pb-4">
              {" "}
              Simple module + user explorer for Aptos
            </p>
            <button className="seam-button m-3 text-3xl py-2 px-3">
              Open Explorer{" "}
            </button>
            <div className="text-left p-2 m-2">
              <p> - view modules,functions,params of dapps on aptos</p>
              <p>
                {" "}
                - User account overview, recent txs, token holdings,nft stats
              </p>
              <p>
                {" "}
                - User utils, send tokens, inspect transactions and authorized
                dapps
              </p>
              <p>
                {" "}
                - Create and send transactions to any dapp/account on aptos(...
                in progress )
              </p>
            </div>
          </div>
        </a>
      </div>
      <div className="flex flex-col justify-center m-3 p-3 mb-10 items-center rounded-lg boarder boarder-4 border-white bg-white-opacity-10">
        <p className="text-3xl font-bold p-2">
          Integrating with top Aptos protocols
        </p>
        <ProtocolIntegrations />
      </div>
    </div>
  );
}
export default Home;
