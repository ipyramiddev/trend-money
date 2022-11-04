import StakeForm from "hooks/StakeInputs";
import useStakeInputs from "hooks/StakeInputs";
import React, { useEffect, useState } from "react";
import Validators, { StakePage } from "sections/staking/Validators";
import { SwapView } from "swap/SwapTop";
import MarketView from "views/MarketView";
import Staking from "./Staking";

const tabs = [
  { name: "Strats", id: "strategies" },
  { name: "Swap", id: "swap" },
  { name: "Stake", id: "stake" },
  { name: "Market", id: "market" },
  // { name: 'Market', id: 'Dapps' },
];

export function Trade() {
  const [view, setView] = useState("strategies");
  const color = "pink";
  const Tab = (tab: any, index: number) => {
    return (
      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center" key={index}>
        <a
          className={
            "text-xl font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
            +`px-2 m-2 py-1 hover:opacity-100 rounded-xl ${
              view === tab.id ? "underline font-bold" : "opacity-70"
            }`
          }
          onClick={(e) => {
            e.preventDefault();
            setView(tab.id);
          }}
          data-toggle="tab"
          href="#link2"
          role="tablist"
        >
          {tab.name}
        </a>
      </li>
    );
  };

  return (
    <div className="min-h-screen">
      <ul
        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
        role="tablist"
      >
        {tabs.map((tab: any, index: number) => {
          return Tab(tab, index);
        })}
      </ul>

      <div className="flex flex-col w-full items-center justify-start">
        {/* {view === "strategies" ? <ModuleExplorer client={client} mod={modules} /> : null} */}
        {view === "swap" ? <SwapView /> : null}
        {view === "strategies" ? <Staking /> : null}
        {view === "stake" ? <Validators /> : null}
        {view === "market" ? <MarketView /> : null}
      </div>
    </div>
    // </>
  );
}
