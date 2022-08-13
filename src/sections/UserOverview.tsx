import { AptosClient, AptosAccount, FaucetClient, TokenClient, BCS, TxnBuilderTypes } from "aptos";
import { AccountResource } from "aptos/dist/api/data-contracts";
// import Stat from "components/Stat";
import { format_large_number, shortenAddress } from "hooks/formatting";
import { loadCoins, loadNfts, sendTransaction } from "hooks/useAptos";
import { useState, useEffect } from "react";
import UserNfts from "./user/UserNfts";



const UserOverview = ({ connected, user }: UserProps) => {
    const [sendAddr, setSendAddr] = useState<string>("");

    if (user === undefined) {
        return null;
    }
    return (
        <div className="flex flex-col p-3 m-3 rounded-lg text-left items-start justify-start">
            <p className="text-lg sm:text-xs opacity-70">Welcome back {shortenAddress(user.address)}</p>
            <div className="outline rounded-lg p-2 m-1">
            <p className="text-4xl font-bold">{format_large_number(user.coins?.balance)}</p>
            <p className="text text-sm opacity-30"> Aptos Tokens</p>
            </div>
            <div className="flex flex-row justify-start gap gap-4">

                <div className="user-stat">
                <p className="stat-val"> {user.coins?.deposit_count || 0 } </p>
                    <p> deposits </p>
                </div>
                <div className="user-stat">
                    <p className="stat-val"> {user.coins?.withdraw_count || 0} </p>
                    <p> withdrawls </p>
                </div>
            </div>

            <UserNfts {...user.nfts} />
            <button className="seam-button m-3" onClick={() => sendTransaction(sendAddr)}>Send coins:</button>

        </div>
    )
}



export default UserOverview;
