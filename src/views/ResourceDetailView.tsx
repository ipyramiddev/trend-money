import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import { useEffect, useState } from "react";
import AccountResources from "sections/account/AccountResources";
import TxnList from "sections/TxnList";

interface Props {
    address: string;

}


const ResourceDetailView = ({ address }: Props) => {
    const [txs, setTxs] = useState<Types.Transaction[]>([]);
    const [resource,setResource] = useState<Types.MoveResource|null>(null);

    const selectResources=(resource:Types.MoveResource)=>{
        setResource(resource)
    }
    // useEffect(() => {
    //     loadTxs(address).then((res) => {
    //         setTxs(res)
    //         console.log("just loaded ", res);
    //     }
    //     );
    // }, [address])

    // const txnEvents

    return (<div className="flex flex-row">
        <AccountResources address={address} selectResource={selectResources}/>
        {ResourceDetails(resource)}
        {/* < */}
    </div>);
}

const ResourceDetails = (resource:Types.MoveResource|null) =>{
    return(<div>
        <p>ddd</p>{resource?.type}</div>);
}

export default ResourceDetailView;