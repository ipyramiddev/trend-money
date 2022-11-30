import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ExChart from "components/card/Exchart";
import { useLocation } from "react-router-dom";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { Token } from "graphql";
const DetailPage = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  console.log(params.get("tokens")?.split(","))
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const [unit1, setUnit1] = useState(true);
  const [unit2, setUnit2] = useState(false);
  const [unit3, setUnit3] = useState(false);
  const [unit4, setUnit4] = useState(false);
  const [time1, setTime1] = useState(true);
  const [time2, setTime2] = useState(false);
  const [time3, setTime3] = useState(false);
  const [time4, setTime4] = useState(false);
  const [all, setAll] = useState(true);
  const selectAll = () => {
    setAll(!all);
  };
  const selectTime1 = () => {
    setTime1(true);
    setTime2(false);
    setTime3(false);
    setTime4(false);
  };
  const selectTime2 = () => {
    setTime2(true);
    setTime1(false);
    setTime3(false);
    setTime4(false);
  };
  const selectTime3 = () => {
    setTime3(true);
    setTime2(false);
    setTime1(false);
    setTime4(false);
  };
  const selectTime4 = () => {
    setTime4(true);
    setTime2(false);
    setTime3(false);
    setTime1(false);
  };
  const selectUnit1 = () => {
    setUnit1(true);
    setUnit2(false);
    setUnit3(false);
    setUnit4(false);
  };
  const selectUnit2 = () => {
    setUnit2(true);
    setUnit1(false);
    setUnit3(false);
    setUnit4(false);
  };
  const selectUnit3 = () => {
    setUnit3(true);
    setUnit2(false);
    setUnit1(false);
    setUnit4(false);
  };
  const selectUnit4 = () => {
    setUnit4(true);
    setUnit2(false);
    setUnit3(false);
    setUnit1(false);
  };
  const selectTab1 = () => {
    setTab1(true);
    setTab2(false);
    setTab3(false);
  };
  const selectTab2 = () => {
    setTab2(true);
    setTab1(false);
    setTab3(false);
  };
  const selectTab3 = () => {
    setTab3(true);
    setTab2(false);
    setTab1(false);
  };
  return (
    <motion.div>
      <div
        className="lg:px-32 max-md:px-0 py-4 "
        style={{ backgroundColor: "black" }}
      >
        <div className="lg:p-16 sm:p-0 border-4 border-dashed rounded-xl">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex space-x-4 items-center">
                <div className="flex">
                  {
                    params.get("tokens")?.split(",").map((token, index) => {
                      return (
                        index>0?
                        <img
                          className="bg-white lg:w-12 lg:h-12 md:w-12 md:h-12 -ml-4 rounded-full max-md:w-10 max-md:h-10"                          
                          src={`../tokens/asset_${token}.png`}
                        />
                        :
                        <img
                          className="bg-white lg:w-12 lg:h-12 md:w-12 md:h-12 rounded-full max-md:w-10 max-md:h-10"                          
                          src={`../tokens/asset_${token}.png`}
                        />
                      )
                    })
                  }
                </div>
                <div
                  style={{ height: "2.4rem", borderRight: "1px solid #3a3a44" }}
                ></div>
                {
                  params.get("tokens")?.split(",").map((token, index) => {
                    return (
                      <span className="h-12 flex items-center font-medium border-2 border-dashed rounded-2xl text-white p-1">
                        {token}
                      </span>
                    )

                  })
                }

              </div>
              <svg
                className="w-12 h-12"
                fill="#9143f3"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="mt-5">
              <div className="flex justify-between">
                <span className="lg:text-4xl max-md:text-2xl font-medium lg:ml-16 max-md:ml-4 sm:ml-8">
                  Boosted UniV3 0.05%
                </span>
                <div className="flex space-x-2 items-center">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    ></path>
                  </svg>
                  <span>Audited by Pessimistic</span>
                </div>
              </div>
            </div>
            <div className="mt-5 lg:ml-16 max-md:ml-4">
              <span>
                Strategy replicates UniV3 position by a combination of UniV3
                interval & Yearn. Get the best of both worlds!
              </span>
            </div>
            <div className="grid lg:grid-cols-3 max-md:grid-cols-1 gap-4 mt-5 lg:ml-16 max-md:ml-0">
              <div
                className="w-full p-4 shadow-md lg:max-w-lg border-4 border-dashed rounded-xl flex items-center"
                style={{ backgroundColor: "black" }}
              >
                <div className="space-y-2">
                  <p className="text-xs">apr boosted univ3 vs univ3</p>
                  <h3 className="text-xl font-semibold">+20.47%</h3>
                </div>
              </div>
              <div
                className="w-full p-4 shadow-md lg:max-w-lg border-4 border-dashed rounded-xl flex items-center"
                style={{ backgroundColor: "black" }}
              >
                <div className="space-y-2">
                  <p className="text-xs">tvl (total value locked)</p>
                  <h3 className="text-xl font-semibold">142,854 USD</h3>
                </div>
              </div>
              <div
                className="w-full p-4 shadow-md lg:max-w-lg border-4 border-dashed rounded-xl flex items-center"
                style={{ backgroundColor: "black" }}
              >
                <div className="space-y-2">
                  <p className="text-xs">filled</p>
                  <h3 className="text-xl font-semibold">28.49%</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-32 max-md:px-0 py-4 grid grid-cols-3 space-x-4 max-md:grid-cols-1 max-md:space-x-0">
        <div className="col-span-2 max-md:col-span-1">
          <div
            className="w-full p-4 shadow-md border-4 border-dashed rounded-xl items-center"
            style={{ backgroundColor: "black" }}
          >
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">Analytics</h3>
                <div className="flex items-center space-x-2">
                  <div
                    className="rounded-md text-center p-1 text-sm"
                    style={{
                      backgroundColor: tab1 ? "grey" : "transparent",
                      border: "1px solid grey",
                      cursor: "pointer",
                    }}
                    onClick={selectTab1}
                  >
                    TVL
                  </div>
                  <div
                    className="rounded-md text-center p-1 text-sm"
                    style={{
                      backgroundColor: tab2 ? "grey" : "transparent",
                      border: "1px solid grey",
                      cursor: "pointer",
                    }}
                    onClick={selectTab2}
                  >
                    APR vs UniV3
                  </div>
                  <div
                    className="rounded-md text-center p-1 text-sm"
                    style={{
                      backgroundColor: tab3 ? "grey" : "transparent",
                      border: "1px solid grey",
                      cursor: "pointer",
                    }}
                    onClick={selectTab3}
                  >
                    APR
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-4">
                <ParentSize>
                  {({ width, height }) => (
                    <ExChart width={width} height={(width * 3) / 4} />
                  )}
                </ParentSize>
              </div>

              <div className="text-center lg:p-8 max-md:p-0 text-sm">
                The chart and APR shows historical data for the previous
                depositors and don't guarantee future performance.
                <br />
                Please check the documentation on APR calculations before aping.
              </div>
              <div className="lg:flex max-md:block justify-between px-8">
                <div>
                  <p className="font-semibold">Unit</p>
                  <div className="flex items-center lg:space-x-2 max-md:space-x-4">
                    <div
                      className="rounded-md text-center p-1 text-sm"
                      style={{
                        backgroundColor: unit1 ? "grey" : "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                      onClick={selectUnit1}
                    >
                      PN
                    </div>
                    <div
                      className="rounded-md text-center p-1 text-sm"
                      style={{
                        backgroundColor: unit2 ? "grey" : "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                      onClick={selectUnit2}
                    >
                      WBTC
                    </div>
                    <div
                      className="rounded-md text-center p-1 text-sm"
                      style={{
                        backgroundColor: unit3 ? "grey" : "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                      onClick={selectUnit3}
                    >
                      WETH
                    </div>
                    <div
                      className="rounded-md text-center p-1 text-sm"
                      style={{
                        backgroundColor: unit4 ? "grey" : "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                      onClick={selectUnit4}
                    >
                      USD
                    </div>
                  </div>
                </div>
                <div className="max-md:mt-4">
                  <p className="font-semibold">Timeframe</p>
                  <div className="flex items-center lg:space-x-2 max-md:space-x-4">
                    <div
                      className="rounded-md text-center p-1 text-sm"
                      style={{
                        backgroundColor: time1 ? "grey" : "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                      onClick={selectTime1}
                    >
                      7d
                    </div>
                    <div
                      className="rounded-md text-center p-1 text-sm"
                      style={{
                        backgroundColor: time2 ? "grey" : "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                      onClick={selectTime2}
                    >
                      30d
                    </div>
                    <div
                      className="rounded-md text-center p-1 text-sm"
                      style={{
                        backgroundColor: time3 ? "grey" : "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                      onClick={selectTime3}
                    >
                      90d
                    </div>
                    <div
                      className="rounded-md text-center p-1 text-sm"
                      style={{
                        backgroundColor: time4 ? "grey" : "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                      onClick={selectTime4}
                    >
                      All time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full p-4 shadow-md border-4 border-dashed rounded-xl items-center mt-5"
            style={{ backgroundColor: "black" }}
          >
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">About strategy</h3>
                <div className="flex space-x-4">
                  <div className="flex space-x-2">
                    <p className=" text-sm">Vault</p>
                    <a
                      href="https://etherscan.io/address/0x1FCD3926b6DFa2A90Fe49A383C732b31f1ee54eB"
                      target="_blank"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className="flex space-x-2">
                    <p className=" text-sm">Strategy</p>
                    <a
                      href="https://etherscan.io/address/0x81379c8b9376f06178B28954e46c32626776DAf0"
                      target="_blank"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <p className="p-8 text-sm">
                UniV3 Boosted strategy provides a risk profile very similar to a
                fixed UniV3 position but with higher returns.
                <br />
                <br />
                Consider UniV3 ETH/USDC 0.05% pool and assume we’d like to put
                our liquidity into the [1000, 2000] price range (we refer to it
                as the Domain price range). How can we do better than just
                providing it directly into the pool?
                <br />
                <br />
                The trick is to put only a tiny portion of liquidity into a
                really narrow price range earning the same fees as direct
                providing. As soon as the price risks going out of the narrow
                range, rebalance the interval to cover the price safely.
                <br />
                <br />
                The liquidity requirements for UniV3, in this case, are
                significantly lower. The rest of the liquidity can be put into
                some yield protocols like Yearn. Thus the overall returns are
                higher for the UniV3 Boosted strategy.
                <br />
                <br />
                For more details, associated risks and mechanics see here
              </p>
            </div>
          </div>
          <div
            className="w-full p-4 shadow-md border-4 border-dashed rounded-xl items-center mt-5"
            style={{ backgroundColor: "black" }}
          >
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">Vaults</h3>
              </div>
              <div className="p-8">
                <div className=" grid grid-cols-3 space-x-4">
                  <div className="rounded-md fiex justify-center items-center p-4"></div>
                  <div className="border-2 border-dashed rounded-md fiex justify-center items-center text-center lg:p-4 max-md:p-1 max-md:text-xs">
                    Root Vault
                  </div>
                  <div className="rounded-md fiex justify-center items-center p-4"></div>
                </div>
                <div className="grid grid-cols-3 space-x-4 mt-8">
                  <div className="border-2 border-dashed rounded-md fiex justify-center text-center items-center lg:p-4 max-md:p-1 max-md:text-xs">
                    ERC20Vault
                  </div>
                  <div className="border-2 border-dashed rounded-md fiex justify-center text-center items-center lg:p-4 max-md:p-1 max-md:text-xs">
                    YearnVault
                  </div>
                  <div className="border-2 border-dashed rounded-md fiex justify-center text-center items-center lg:p-4 max-md:p-1 max-md:text-xs">
                    UniV3Vault
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full p-4 shadow-md border-4 border-dashed rounded-xl items-center mt-5"
            style={{ backgroundColor: "black" }}
          >
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">Activity</h3>
                <div className="flex items-center space-x-2">
                  <div
                    className="rounded-md text-center p-1"
                    style={{
                      backgroundColor: all ? "grey" : "transparent",
                      border: "1px solid grey",
                      cursor: "pointer",
                    }}
                    onClick={selectAll}
                  >
                    My
                  </div>
                  <div
                    className="rounded-md text-center p-1"
                    style={{
                      backgroundColor: !all ? "grey" : "transparent",
                      border: "1px solid grey",
                      cursor: "pointer",
                    }}
                    onClick={selectAll}
                  >
                    All
                  </div>
                </div>
              </div>
              <div className="divide-y divide-dashed">
                <div className="flex justify-between">
                  <p className=" text-sm">DEPOSIT</p>
                  <p className=" text-sm">STRATAGY</p>
                  <p className=" text-sm">VALUE</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div
            className="w-full p-4 shadow-md border-4 border-dashed rounded-xl items-center"
            style={{ backgroundColor: "black" }}
          >
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Your Position</h3>
              <div className="flex justify-center items-center">
                <div className="p-12 flex flex-col">
                  <span className="text-xl font-semibold">0.00</span>
                  <span>WBTC</span>
                </div>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div className="p-12 flex flex-col">
                  <span className="text-xl font-semibold">0.00</span>
                  <span>WETH</span>
                </div>
              </div>
              <div className="flex justify-around">
                <p>LP tokens</p>
                <p>0</p>
              </div>
              <div
                className="flex justify-center gap-3 p-5 m-10 rounded-xl"
                style={{ backgroundColor: "#3e3e4a" }}
              >
                <p>Equivalent:</p>
                <p>0 USD</p>
              </div>
              <div
                className="flex justify-center gap-3 p-5 m-10 rounded-xl text-center font-semibold"
                style={{ backgroundColor: "#9143f3", cursor: "pointer" }}
              >
                Deposit
              </div>
              <div
                className="flex justify-center gap-3 p-5 m-10 rounded-xl text-center font-semibold"
                style={{ border: "2px solid grey", cursor: "pointer" }}
              >
                Withdraw
              </div>
            </div>
          </div>
          <div
            className="w-full p-4 shadow-md  border-4 border-dashed rounded-xl flex mt-5"
            style={{ backgroundColor: "black" }}
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="space-y-6">
              <p className="font-semibold pt-3">The product is in beta</p>
              <p>Use at your own risk with money you can afford to lose.</p>
            </div>
          </div>
        </div>
      </div>
      {/* <ParentSize>{({ width, height }) => <ExChart width={width*3/4} height={width/3} />}</ParentSize> */}
    </motion.div>
  );
};

export default DetailPage;
