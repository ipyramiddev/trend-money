import { AptosClient, Types } from "aptos";
// import { loadCoinList } from "hooks/useAptos";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { coin_lists } from "../data/coin_data";
interface PoolProps {
  client: AptosClient;
}

// This page will load a list of coins and show the following info about the coins
const Coins = () => {
  const coins = useLoaderData() as any;
  const [coinData, setCoinData] = useState<Types.MoveResource[]>([]);

  useEffect(() => {
    loadCoinList(coin_lists).then((data) => {
      setCoinData(data);
    });
  }, []);

  return (
    <div>
      <p>Coins</p>
      {coins.map((coin:any, i:number) => {
        return (
          <div key={i}>
            <p>{coin.type}</p>
            <p>{coin.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Coins;
