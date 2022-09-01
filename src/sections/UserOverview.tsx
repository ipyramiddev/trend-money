import { AptosClient, AptosAccount, FaucetClient, TokenClient, BCS, TxnBuilderTypes } from "aptos";

// import Stat from "components/Stat";
import { format_large_number, shortenAddress } from "hooks/formatting";
import { resolveName } from "hooks/integrations/useANS";
import { sendTransaction } from "hooks/useAptos";
import { useState, useEffect } from "react";

import UserNfts from "./user/UserNfts";
// import { AccountContext, AccountContextConsumer } from "../context/AccountContext";




const UserOverview = ({ connected, user }: UserProps) => {
    const [sendAddr, setSendAddr] = useState<string>("");
    if (user === undefined) {
        return null;
    }
    return (
        <div className="flex flex-col p-3 m-3 rounded-lg text-left items-start justify-start">
            <p className="text-lg sm:text-sm opacity-80">Welcome back {shortenAddress(user.address)}</p>
            <div className="outline rounded-lg w-full p-2 m-1">
            <p className="text-4xl font-bold">{format_large_number(user.coins?.balance)}</p>
            <p className="text text-sm opacity-70">Aptos Tokens</p>
            <span className="bg-white">
            <img src="../public/tokens/asset_APT.svg" className="w-auto h-auto p-3"/>
            </span>
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
            <input className=" m-3 bg-opacity-30 outline outline-white outline-2 text-black" type="text" value={sendAddr} onChange={(e) => setSendAddr(e.target.value)} />
            <button className="seam-button m-3" onClick={() => sendTransaction(sendAddr)}>Send coins:</button>
        </div>
    )
}


export default UserOverview;
