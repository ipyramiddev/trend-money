import { useEffect, useState } from "react";
// import {getAccountResources } from '@fewcha/web3";
// loads the resources for an account
import Web3 from "@fewcha/web3";
import { MoveResource } from "aptos/dist/generated";

const web3 = new Web3();
const AccountResources = ({address}:{address:string}) => {
    const [resources, setResources] = useState<MoveResource[]>([]);
    useEffect(()=>{
        web3.action.sdk.getAccountResources(address).then((res) =>{
            if(res.status==200){
                // res.data
            setResources(res.data);
            }
        });
    },[]
    );
    return (
            <div>
                <h1>Account Resources</h1>
                <div>
                    {resources.length!=0 ? (ResourceList(resources) ): <p>noresource</p>}
                    </div>
                <p>
                    This is for account resources.
                </p>
            </div>
    );
}

const ResourceList=(resources: MoveResource[])=>{
    return resources.map((resource:MoveResource)=> Resource(resource))
}

const Resource = (resource : MoveResource) =>{
    return(
        <div className="p-2 ">
            <p>{resource.type}</p>
            <p>{resource.data.toString()}</p>
        </div>
    )
}

export default AccountResources;