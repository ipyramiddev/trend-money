import { useState } from "react";

const tabs = [
  { name: "Transactions", id: "txs" },
  { name: "Types", id: "types" },
  { name: "Resources", id: "resources" },
];

function SwitchView(props: any) {
  const [view, setView] = useState("Transactions");
  return (
    <div className="flex flex-col  m-4 p-4 text-bold items-center justify-center">
      <div className="flex flex-row gap-2 items-center justify-center">
        {tabs.map((tab, index) => {
          return (
            <a
              key={index.toString()}
              onClick={() => setView(tab.name)}
            >
              <p className={`tab text-3xl ${
                view === tab.name ? " underline" : ""
              }`}>{tab.name}</p>
            </a>
          );
        })}
      </div>
      {view === "Transactions" && props.children[0]}
      {view === "Types" && props.children[1]}
      {view === "Resources" && props.children[2]}
    </div>
  );
}

export default SwitchView;
