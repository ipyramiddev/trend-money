import { AptosClient, AptosAccount, FaucetClient, TokenClient, BCS, TxnBuilderTypes } from "aptos";
import { AccountResource } from "aptos/dist/api/data-contracts";
// import Stat from "components/Stat";
import { format_large_number } from "hooks/formatting";
import { loadCoins, loadNfts, sendTransaction } from "hooks/useAptos";
import { useState, useEffect } from "react";

// const Stat = ({stat:Stat, color,format,unit}): StatProps => {
//     return (
//         <div className="flex flex-col p-3 m-3 rounded-lg text-left justify-between bg-opacity-20">
//             <p className={`text-xl text-${props.color}`}>{format ? format_large_number(stat.value) : value} {unit ? unit : ''}</p>
//             <p className="text-lg sm:text-xs opacity-70">{stat.name}</p>
//             {/* <p className="text-sm opacity-30">{stat.description}</p> */}
//         </div>
//     )

// }

const UserOverview = ({ connected, user }: UserProps) => {
    const [sendAddr, setSendAddr] = useState<string>("");

    if (user===undefined) {
        return null;
    }
    return (
        <div className="flex flex-col p-3 m-3 rounded-lg text-left items-start justify-start">
            <p className="text-lg sm:text-xs opacity-70">Welcome back</p>
            {/* <p className="text-2xl sm:text-lg text-yellow1">{user?.address}</p> */}
            <p className="text-4xl">{user.coins?.balance}</p>
            <p className="text text-sm opacity-30"> Aptos Tokens</p>
            <div className="flex flex-row justify-start gap gap-4">
                
                <div className="user-stat">
                    <p className="text-3xl"> {user.coins?.deposit_count} </p>
                    <p> deposits </p>
                </div>
                <div className="user-stat">
                    <p> {user.coins?.withdraw_count} </p>
                    <p> withdrawls </p>
                </div>
            </div>

            <UserNfts {...user.nfts} />
            <input type="text" onChange={(event)=>setSendAddr(event.target.value)} className="w-full m-2 outline-white bg-lightPurple"></input>
            <button className="seam-button m-3" onClick={()=>sendTransaction(sendAddr)}>Send coins:</button>

        </div>
    )
}

const UserNfts = ({collections,nfts, collection_count, minted_count,}: UserNfts ) => {
    
    return (
        <div className="flex flex-row justify-start gap gap-4">
            <div className="user-stat">
                    <p className="text-4xl">{collection_count}</p>
                    <p className="text-sm opacity-30">collections created</p>
                </div>
                <div className="user-stat">
                    <p className="text-4xl">{minted_count}</p>
                    <p className="text-sm opacity-30">nfts Minted</p>
                </div>
        </div>
                )
    }

export default UserOverview;
