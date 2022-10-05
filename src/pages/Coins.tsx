import { AptosClient, Types } from "aptos";
import { loadCoinList } from "hooks/useAptos";
import { useEffect, useState } from "react";
import { coin_lists } from "../data/coin_data";
interface PoolProps {
    client: AptosClient;
}


// This page will load a list of coins and show the following info about the coins
const Coins = () => {
    const [coinData, setCoinData] = useState<Types.MoveResource[]>([]);

    useEffect(() => {
        loadCoinList(coin_lists).then((data) => {
            setCoinData(data);
        })
    }, [])


    return (
    <div>
        <p>Coins</p>
        {coinData.map((coin) => {
            return (
                <div>
                    <p>{coin.type}</p>
                    {/* <p>{coin.value}</p> */}
                </div>
            )
        })}
    </div>
    )
}

export default Coins;