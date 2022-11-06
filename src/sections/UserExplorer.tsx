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
        if (connected && account != null) {
            loadAccount(account.address?.toString() || "", client);
            loadTxs(account.address?.toString() || "", client).then((res) => {
                setTxs(res)
                console.log("just loaded ", res);
            }
            );
        }
    }
        , [account]);

        const SeamPass = () => {
            return (
                <div className='rounded-lg shadow-lg shadow-blue drop-shadow-2xl'>
                        <div className='relative'>
                            <div className='absolute top-0 left-0 w-30 p-3 seam-outline'>
                                <p className='text-3xl font-bold'>Seam Pass</p>
                                <p> {totalMinted}/{totalSupply} Minted</p>
                                <button className='bg-white seam-button p-2 m-2'>
                                    Mint
                                </button>
                            </div>
                            <iframe src='https://my.spline.design/purpleiconsset5copy-d971ed424c575c8f5aa2498ccdf9cb2f/' frameBorder='0' width='500px' height='500px'>
                            </iframe>
                            {/* DO NOT DELETE */}
                            <div className='w-full h-12 bg-black absolute bottom-0'>
                            </div>
                        </div>
                    </div>
            );
        }

    return (
        <div className="mx-2 items-center justify-center p-2">
            <p className="text-3xl font-semibold">User Explorer</p>
            
            <div className='flex flex-row m-3 items-start justify-start'>
                {account?.address ?
                    <div className='flex flex-col '>
                        <UserOverview {...account} />

                    <TxnList txns={txs} address={account?.address.toString()} />
                    </div>
                    : <p>please connect</p>}
                {account?.address?.toString() ? (
                <div className='w-1/2 p-2'>
                    <ResourceDetailView showDetails={true} showUnder={true} address={account?.address.toString()} />
                </div>)
                 : <p>no resources</p>
                 }

            </div>
        </div>
    );
}



export default UserExplorer;