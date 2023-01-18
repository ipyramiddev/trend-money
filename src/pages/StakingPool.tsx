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
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Overlay from "components/card/Overlay";
import Modal from "components/card/Modal";
import ProgressBar from "@ramonak/react-progress-bar";
import AreaChart from "components/graphs/AreaChart";

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
      <Link to={`/detail?name=${pool.name}&tokens=${pool.assets}`}>
        <motion.div className="listing" whileHover={{ scale: 1.05, y: 8 }}>
          <div className="card-body">
            <div
              className="flex flex-col text-white cursor-pointer z-10 relative bg-black border-dashed border-[3px]"
              id={`${pool.name}-${pool.platform}`}
            >
              {/* TOKEN */}

              <div className="bg-[#12171D] p-4">
                <div className="flex flex-row justify-between items-center">
                  <p className="flex items-center text-xl font-bold min-h-[4rem]">{pool.name}</p>
                  {CategoryTag(pool.category_tag)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex">
                  {pool.assets.map((token: string, index:number) => {
                    return (
                      <div className="m-2 px-2 py-1 bg-[#00E8A2] rounded-lg text-black font-bold text-sm" key={index}>
                        {token}
                      </div>
                    )
                  })}
                </div>
                <div>
                  <AreaChart />
                </div>
                <div className="px-5">
                  yield is generated by single-staking APT on Tortuga and borrowing wETH from Aptin to LP into wETH-USDC on Liquid Swap
                </div>
              </div>
              {/* {ProtocolTag(pool.platform)} */}
              <TokenStack tokens={pool.assets} />
              {/* <div className="flex flex-row justify-between">
                <Stat
                  format={true}
                  name="Portion"
                  value={pool.portion * 100}
                  unit="%"
                />
              </div> */}
              <div className="flex px-4 justify-between items-end my-5">
                <div className="grow">
                  <p className="text-[12px] my-1">Aggregate Risk Rating</p>
                  <ProgressBar completed="60" isLabelVisible={false} className="progress-wrapper" baseBgColor="#1E2125" bgColor="linear-gradient(to right, #e80053 0%, #ff9999 100%)" borderRadius="4px" />
                </div>
                <div className="flex-1 text-end">
                  <p className="text-[#E80053] text-[12px]">HIGH/46%</p>
                </div>
              </div>
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
      </Link>
    </>
  );
};

const ProtocolTag = (p: any) => {
  const dapp_name = dappByName(p);
  const dapp_img = dapp_name ? dapp_name.image : "Pontem.png";

  return (
    <div className="flex flex-row items-center justify-center px-2 py-1 rounded-xl outline outline-2 outline-white">
      <div className="w-8 h-8">
        <img className="rounded-full" src={`dapps/${dapp_img}`} alt="dapp-img" />
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
      <div className="flex flex-row justify-between items-center pb-3">
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
        <div className="flex flex-row w-1/3 justify-baseline gap gap-4 p-6">
          {/* <BarChart/> */}
          <div className="stat place-items-center">
            <p className="stat-value">{pool.avg_apr_24}</p>
            <p className="stat-title">APY 24h.</p>
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
