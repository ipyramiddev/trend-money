import TxnList from "./TxnList";
import UserOverview from "./UserOverview";
import WagMemeContainer from "./WagMemeContainer";
import { useWeb3 } from '@fewcha/web3-react';
import { useEffect, useState } from "react";
import { AptosClient, Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import AccountResources from "./account/AccountResources";
import { loadAccount } from "hooks/loadAptos";
interface Props {
    account:any;
    client: AptosClient;
}

const UserExplorer = ({client}:Props) => {
    const { account,isConnected } =useWeb3();
    const [txs, setTxs] = useState<Types.Transaction[]>([]);
    useEffect(()=>{
        if(isConnected && account){
            loadAccount(account.address,client);
        loadTxs(account.address,client).then((res)=>{setTxs(res)
        console.log("just loaded ", res);
        }
        );
    }

    }
    ,[account]);

    return (
        <div>
        <h1>User Explorer</h1>
            <div className='flex flex-row items-center justify-center px-2'>
            {/* <UserOverview  /> */}
            {account?.address ?(<AccountResources address={account?.address}/>):<p>no resources</p>}
            {account?.address ?
            <TxnList txns={txs} address={account?.address}/>
            :<p>please connect</p>}
            <WagMemeContainer />
            </div>
        </div>
    );
    }

export default UserExplorer;