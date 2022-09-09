import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import { useEffect, useState } from "react";
import AccountResources from "sections/account/AccountResources";
import TxnList from "sections/TxnList";

interface Props {
    address: string;
    showDetails?: boolean
}

const ResourceDetailView = ({ address, showDetails}: Props) => {
    const [txs, setTxs] = useState<Types.Transaction[]>([]);
    const [resource, setResource] = useState<Types.MoveResource | null>(null);

    const selectResources = (resource: Types.MoveResource) => {
        setResource(resource)
    }

    return (<div className="flex flex-row">
        <AccountResources address={address} selectResource={selectResources} />
        {showDetails ? ResourceDetails(resource) : null}
    </div>);
}

const ResourceDetails = (resource: Types.MoveResource | null) => {
    return (<div className="p-3">
        <p className="text-3xl">Resource Details</p>
        <p className="text-xl font-semibold">{resource?.type}</p>
        <p>{JSON.stringify(resource?.data,null, "\t")}</p>
    </div>);
}

export default ResourceDetailView;