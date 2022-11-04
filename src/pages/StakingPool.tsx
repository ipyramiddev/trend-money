import React, { useState } from "react";
import { useWeb3 } from "@fewcha/web3-react";
import Stat from "components/Stat";
import Token from "components/Token";
import TokenStack from "components/TokenStack";
import { sendPayload } from "hooks/useAptos";
import Xarrow from "react-xarrows";
import DappLogo from "sections/dapps/DappLogo";
import { dappByName } from "util/dappUtils";
import useSubmitTransaction from "../hooks/useTransaction";

import { AnimatePresence, motion } from "framer-motion";
import Overlay from "components/card/Overlay";
import Modal from "components/card/Modal";

interface PoolProps {
  pool: any;
  i?: number;
  // setDeposit: (t:any)=> void
}

const tag_map = {
  lend: { name: "Supply", color: "pink" },
  borrow: { name: "Liquidity pool", color: "red" },
  lp: { name: "Liquidity pool", color: "yellow" },
  order: { name: "Orderbook", color: "orange" },
};

const CategoryTag = (cat: string, color = "pink") => {
  const tag = tag_map.lend;
  let tag_color = "bg-blue";
  // if(
  return <p className={"text-md px-3 py-1 rounded-lg " + tag.color}>{cat}</p>;
};

const SubStrat = ({ pool }: any) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <motion.div
        className="listing"
        onClick={openModal}
        whileHover={{ scale: 1.1, y: 12 }}
      >
        <div
          className="flex flex-col seam-outline p-2 text-white cursor-pointer"
          id={`${pool.name}-${pool.platform}`}
        >
          {/* TOKEN */}

          <div>
            <div className="flex flex-row justify-between">
              <p className="text-xl font-bold min-h-[4rem]">{pool.name}</p>
              {CategoryTag(pool.category_tag)}
            </div>
          </div>
          {ProtocolTag(pool.platform)}
          <TokenStack tokens={pool.assets} />
          <div className="flex flex-row justify-between">
            <Stat
              format={true}
              name="portion"
              value={pool.portion * 100}
              unit="%"
            />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <Overlay close={closeModal}>
            <Modal close={closeModal} />
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

const ProtocolTag = (p: any) => {
  const dapp_name = dappByName(p);
  const dapp_img = dapp_name ? dapp_name.image : "Pontem.png";

  return (
    <div className="flex flex-row items-center justify-center px-2 py-1 rounded-xl outline outline-2 outline-white">
      <div className="w-8 h-8">
        <img className="rounded-lg" src={`dapps/${dapp_img}`} alt="dapp-img" />
      </div>
      <p>{p}</p>
    </div>
  );
};
// const Σ = (){}

export const StakingPool = ({ pool }: PoolProps) => {
  const {
    submitTransaction,
    transactionInProcess,
    transactionResponse,
    clearTransactionResponse,
    genAnimePayload,
  } = useSubmitTransaction();

  const { account } = useWeb3();

  const send = async () => {
    const payload = await genAnimePayload();
    // await sendPayload(account?.address,payload);
  };

  const pool_assets = ["APT", "BTC"];

  const protocols = pool.pools.map((i: any) => [
    i.address || "0x0x",
    { name: i.name, image: i.image },
  ]);
  console.log("PROTOCOLS", protocols);

  return (
    <div className="w-full shadow-lg shadow-white roundex-2xl text-white p-8 mt-4 mb-4 rounded-lg text-white border-[3px] border-white border-dashed">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl">{pool.name}</h1>
      </div>
      <div className="flex flex-row justify-start items-center">
        <div
          id={`deposit-${pool.name}`}
          key={`deposit-${pool.name}`}
          className="items-center justify-center"
        >
          <button
            onClick={() => send()}
            className="seam-button flex flex-row items-center justify-center"
          >
            <Token token={pool_assets[0]} />
            Deposit
          </button>
        </div>
      </div>
      {/* <div className='flex flex-col justify-between'> */}
      <div className="flex flex-row gap gap-3">
        {/* </div> */}
        <div className="flex flex-row w-1/3 justify-baseline gap gap-4">
          {/* <BarChart/> */}
          <div className="stat place-items-center">
            <p className="stat-value">{pool.avg_apr_24}</p>
            <p className="stat-title">apr 24h.</p>
          </div>
          <div className="stat place-items-center">
            <div className="stat-value">{pool.total_deposits}</div>
            <div className="stat-title">APT</div>
          </div>

          {pool.pools.map((pool: any, i: number) => {
            return <SubStrat pool={pool} i={i} key={i} />;
          })}
        </div>
        {pool.pools.map((strat: any, i: number) => {
          return (
            <Xarrow
              start={`deposit-${pool.name}`} //can be react ref
              startAnchor={["right", "bottom"]}
              endAnchor={["top", "middle"]}
              curveness={40}
              dashness={true}
              headSize={4}
              path="grid"
              color="white"
              end={`${strat.name}-${strat.platform}`} //or an id
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};
