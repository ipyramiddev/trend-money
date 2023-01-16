import { Types } from "aptos";
import {useState } from "react";
import AccountResources from "sections/account/AccountResources";

interface Props {
    address: string;
    showDetails?: boolean;
    showUnder?: boolean;

}

const ResourceDetailView = ({ address, showDetails,showUnder}: Props) => {
    const [resource, setResource] = useState<Types.MoveResource | null>(null);

    const selectResources = (resource: Types.MoveResource) => {
        setResource(resource)
    }
    
    if (showUnder){
        <div className=" h-full">
        <AccountResources address={address} selectResource={selectResources} />
        <div className="scrollable ">
        {showDetails ? ResourceDetails(resource) : null}
        </div>
    </div>
    }

    return (<div className="flex flex-wrap">
        <AccountResources address={address} selectResource={selectResources} />
        {showDetails ? ResourceDetails(resource) : null}
    </div>);
}

const ResourceDetails = (resource: Types.MoveResource | null) => {
    return (<div className="p-3 ">
        <p className="text-3xl">Resource Details</p>
        <p className="text-xl font-semibold">{resource?.type}</p>
        <div className="overflow-hidden">
        <p className="overflow-hidden">{JSON.stringify(resource?.data,null, "\t")}</p>
        </div>
    </div>);
}

export default ResourceDetailView;