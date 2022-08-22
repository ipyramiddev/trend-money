import TxnList from "./TxnList";
import UserOverview from "./UserOverview";
import WagMemeContainer from "./WagMemeContainer";
import { useWeb3 } from '@fewcha/web3-react';
import { useEffect, useState } from "react";
import { AptosClient, Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
interface Props {
    userProps: UserProps;
    client: AptosClient;
}

const UserExplorer = ({userProps,client}:Props) => {
    const { account,isConnected } =useWeb3();
    const [txs, setTxs] = useState<Types.Transaction[]>([]);
    useEffect(()=>{
        if(isConnected){
        loadTxs(account.address,client).then((res)=>{setTxs(res)
        console.log("just loaded ", res);
        }
        );
    }
    },[isConnected,account]);

    

    return (
        <div>
        <h1>User Explorer</h1>
            <div className='flex flex-row items-center justify-center px-2'>
            <UserOverview {...userProps} />
            {isConnected && account?.address ?
            <TxnList txns={txs} address={account?.address}/>
            :<p>please connect</p>}
            <WagMemeContainer />
            
            </div>
        </div>
    );
    }

export default UserExplorer;