import { AptosClient, AptosAccount, FaucetClient, TokenClient, BCS, TxnBuilderTypes } from "aptos";

// import Stat from "components/Stat";
import { format_large_number, shortenAddress } from "hooks/formatting";
import { resolveName } from "hooks/integrations/useANS";
import { sendTransaction } from "hooks/useAptos";
import { useState, useEffect } from "react";

import UserNfts from "./user/UserNfts";
// import { AccountContext, AccountContextConsumer } from "../context/AccountContext";


// const loadUserStats

const UserOverview = (props:any) => {
    const [sendAddr, setSendAddr] = useState<string>("");
    
    
    return (
        <div className="p-3 m-3 rounded-lg text-left items-start justify-start">
            <p className="text-lg sm:text-sm opacity-80">Welcome back {shortenAddress(props?.address)}</p>
            <div className="outline rounded-lg p-2 m-1">
            {/* <p className="text-4xl font-bold">{format_large_number(user.coins?.balance)}</p> */}
            <p className="text text-sm opacity-70">Aptos Tokens</p>
            <span className="bg-white">
            <img src="../public/tokens/asset_APT.svg" className="w-auto h-auto p-3"/>
            </span>
            </div>
           
            {/* <UserNfts {...user.nfts} /> */}
            
        </div>
    )
}


export default UserOverview;
