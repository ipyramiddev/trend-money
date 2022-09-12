import TxnList from "./TxnList";
import UserOverview from "./UserOverview";
import WagMemeContainer from "./WagMemeContainer";
import { useWeb3 } from '@fewcha/web3-react';
import { useEffect, useState } from "react";
import { AptosClient, Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import AccountResources from "./account/AccountResources";
import { loadAccount } from "hooks/loadAptos";
import { sendTransaction } from "hooks/useAptos";
import { FaJenkins } from "react-icons/fa";
import ResourceDetailView from "views/ResourceDetailView";
interface Props {
    account: any;
    client: AptosClient;
}

const UserExplorer = ({ client }: Props) => {
    const { account, isConnected } = useWeb3();
    const [txs, setTxs] = useState<Types.Transaction[]>([]);
    const [sendAddr, setSendAddr] = useState<string>("");
    useEffect(() => {
        if (isConnected && account) {
            loadAccount(account.address, client);
            loadTxs(account.address, client).then((res) => {
                setTxs(res)
                console.log("just loaded ", res);
            }
            );
        }
    }
        , []);

    return (
        <div className="w-full mx-6">
            <p className="text-3xl font-semibold">User Explorer</p>
            
            <div className='flex flex-row w-full items-start justify-center'>
                {/* <UserOverview  /> */}
                {account?.address ?
                
                <TxnList txns={txs} address={account?.address} />
                : <p>please connect</p>}
                {account?.address?.toString() ? (<ResourceDetailView showDetails={false} address={account?.address.toString()} />) : <p>no resources</p>}
                
                {/* <WagMemeContainer /> */}
            </div>
        </div>
    );
}

export default UserExplorer;