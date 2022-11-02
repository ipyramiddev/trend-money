import Spline from '@splinetool/react-spline';
import TxnList from "./TxnList";
import { useWeb3 } from '@fewcha/web3-react';
import { useEffect, useState } from "react";
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import { loadAccount } from "hooks/loadAptos";
import { sendTransaction, useClient } from "hooks/useAptos";
import ResourceDetailView from "views/ResourceDetailView";
import UserOverview from "./UserOverview";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

const GATEWAY = "moccasin-eligible-jellyfish-850.mypinata.cloud/"
export const PINATA_GATEWAY = "moccasin-eligible-jellyfish-850.mypinata.cloud/ipfs/";
export const collectionCoverUrl = PINATA_GATEWAY + "QmQxtKuCfrbkuFCc1jjDQzTGdPFYiRuBGj8TWxvRGeVPLd";

const UserExplorer = () => {
    const { account, connected } = useWallet();
    const client = useClient();
    const [txs, setTxs] = useState<Types.Transaction[]>([]);
    const [sendAddr, setSendAddr] = useState<string>("");
    const totalMinted = 0;
    const totalSupply = 0;
    useEffect(() => {
        if (connected && account!=null) {
            loadAccount(account.address?.toString()||"", client);
            loadTxs(account.address?.toString()||"", client).then((res) => {
                setTxs(res)
                console.log("just loaded ", res);
            }
            );
        }
    }
        , [account]);

    return (
        <div className="w-full mx-6">
            <p className="text-3xl font-semibold">User Explorer</p>
            <div className='rounded-lg shadow-lg  shadow-blue drop-shadow-2xl p-4'>
                
<div className='relative'>
    <div className='absolute top-0 right-0 w-30 h-10'>
        <p className='text-3xl font-bold'>Seam Pass</p>
        <p> {totalMinted}/{totalSupply} Minted</p>
        <button className='bg-white seam-button p-2 m-2'>
        Mint
        </button>

    </div>
<iframe src='https://my.spline.design/purpleiconsset5copy-d971ed424c575c8f5aa2498ccdf9cb2f/' frameBorder='0' width='100%' height='500px'>
</iframe>
    <div className='w-full h-12 bg-black absolute bottom-0'
    >
    </div>
    
</div>
                {/* <img src={"/seamPass.gif"} className="w-64 h-64 rounded-2xl" /> */}
            </div>
            <div className='flex flex-row w-full items-start justify-center'>
                {/* <UserOverview connected={false} user={undefined}  /> */}
                {account?.address ?
                
                <TxnList txns={txs} address={account?.address.toString()} />
                : <p>please connect</p>}
                {account?.address?.toString() ? (<ResourceDetailView showDetails={true} showUnder={true} address={account?.address.toString()} />) : <p>no resources</p>}


                

                {/* <WagMemeContainer /> */}
            </div>
        </div>
    );
}

export default UserExplorer;