import { AptosClient, AptosAccount, FaucetClient,TokenClient, BCS, TxnBuilderTypes } from "aptos";
import { AccountResource } from "aptos/dist/api/data-contracts";
import Stat from "components/Stat";
import { loadCoins, loadNfts } from "hooks/useAptos";
import { useState, useEffect } from "react";


const UserOverview= ({connected, user}: UserProps) => {

    // const [coins, setCoins] = useState<any>([]);

    

    const connect = async () => {
        console.log(await window.aptos.isConnected());
        const res = await window.martian.connect()
        await window.martian.disconnect();
        // const account = await window.martian.getAccount();
        console.log(res);
        
        
        const account = await window.martian.account();
        
    }

    // const [address, setAddress] = useState<string | null>(null);

    
    
    return (
        <div className="flex flex-col p-3 m-3  bg-white rounded-lg text-left justify-between bg-opacity-20">

            <p className="text-lg sm:text-xs opacity-70">Welcome back</p>
            <p className="text-2xl sm:text-lg text-yellow1">{user.address}</p>
            <p className="text-4xl text-right">{user.coins?.balance}</p>
            <p className="text-right text-sm opacity-30"> Aptos Tokens</p>

            <div className="flex flex-row justify-end gap gap-4">
                <div className="user-stat">
                    <p className="text-4xl">{user.nfts?.collection_count}</p>
                    <p className="text-sm opacity-30">collections created</p>
                </div>
                <div className="user-stat">
                    <p className="text-4xl">{user.nfts?.minted_count}</p>
                    <p className="text-sm opacity-30">nfts Minted</p>
                </div>

            </div>

            <div>
                <p className="text-lg sm:text-xs opacity-70">Coin events</p>
                {/* <p> {nfts.</p> */}
                <div className="flex flex-row justify-end gap gap-4">
                    <div className="user-stat">
                        <p> {user.coins?.deposit_count} </p>
                        <p> deposits </p>
                    </div>
                    <div className="user-stat">
                        <p> {user.coins?.withdraw_count} </p>
                        <p> withdrawls </p>
                    </div>
                </div>


            </div>
            {/* {nfts.map((nft, i) => {
                return (
                    <div key={i}>
                        <p className="text-2xl sm:text-lg text-yellow1">nft.name</p>
                        <p className="text-right text-sm opacity-30">{nft.id}</p>
                        </div>)
            }
            )} */}
            <div className="flex flex-row justify-between">
                <button className="seam-button m-3" onClick={connect}>Connect</button>
            </div>


        </div>
    )
}
export default UserOverview;


// 