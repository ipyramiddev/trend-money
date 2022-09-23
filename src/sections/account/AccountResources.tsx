import { useEffect, useState } from "react";
// import {getAccountResources } from '@fewcha/web3";
// loads the resources for an account
import Web3 from "@fewcha/web3";
import { Types } from "aptos";
import { formatType, format_large_number, shortenAddress } from "hooks/formatting";
import ReactTooltip from "react-tooltip";
import { json } from "stream/consumers";
import { DepositsWithdraws } from "./DepositsWithdraws";
import { loadResources } from "hooks/useAptos";

const web3 = new Web3();

interface Props{
    address: string;
    selectResource: (resource:Types.MoveResource)=>void;
    
}

const AccountResources = ({ address,selectResource }: Props) => {
    const [resources, setResources] = useState<Types.MoveResource[]>([]);
    useEffect(() => {
        loadResources(address).then((res) => {
            const reversed = res.reverse()
                setResources(reversed);
        });
    }, []
    );
    return (
        <div>
            <p className="text-3xl">Account Resources</p>
            <div className="modScrollp-2 flex flex-col max-w-2xl ">
                {resources && resources.length !== 0 ? (ResourceList(resources,selectResource)) : <p>none</p>}
            </div>
            
        </div>
    );
}

const ResourceList = (resources: Types.MoveResource[],selectResource: (resource:Types.MoveResource)=>void) => {
    return resources.map((resource: Types.MoveResource,) => Resource(resource,selectResource))
}

const filteredResources = (
    resources: Types.MoveResource[],
    selectResource: (resource:Types.MoveResource)=>void,
    filter: any[] = ["0x3"],
    max: number = 15
    ) => {
        let r_temp = resources;
        let i = 0;
        while(i<filter.length){
            r_temp = r_temp.filter((r:Types.MoveResource,i:number)=>{
                const t = r.type.startsWith(filter[i])
                i=i+i;
                return t;
            })
        }
        return ResourceList(r_temp,selectResource);
    }



const Resource = (resource: Types.MoveResource,selectResource: (resource:Types.MoveResource)=>void) => {
    console.log("Account resource",resource);
    if (resource.type == "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>") {

        return CoinStore(resource.data);
    }
    if (resource.type.includes("0x1::coin::CoinStore")){
        return GenericCoinStore(resource.data,resource.type)
    }

    if (resource.type == "0x3::token::TokenStore") {

        return TokenStore(resource.data);
    }
    if (resource.type == "0x3::token::Collections") {

        return Collections(resource.data);
    }

    
    return (
        <div className="p-2 m-2 outline rounded-lg my-3 outline-2 overflow-hidden">
            <button onClick={()=>selectResource(resource)}>{formatType(resource.type)}</button>
            <ReactTooltip place="top" textColor="white"  html={true} multiline={true}/>
        </div>
    )
}

const Collections = (c:any) =>{
    console.log(c)
    const cData = c?.collection_data.handle
    console.log("cData",cData)
    // const lCollection = load

    return (
        <div>
            <p>{JSON.stringify(c?.data)}</p>
        </div>)
}

// 0x3::token::TokenStore
const TokenStore = (tokenstore:any)=>{
    const data = tokenstore.data
    // const tokens =
    console.log("TOKENSTORE",data);
    return (
        <div className="flex flex-col rounded-2xl outline outline-2 p-2 m-2">
            <p>Token Store</p>
            {DepositsWithdraws(tokenstore)}

        </div>
    );
}

const TokenStoreItem = () => {}

const CoinStore = (coins: any,) => {

    return (<div className="flex flex-col p-3 m-3 rounded-lg text-left items-start justify-start">
        <div className="outline flex flex-row items-center justify-between rounded-lg w-full p-2 m-1">
            <div>
            <p className="text-4xl font-bold">{format_large_number(coins.coin?.value)}</p>
            <p className="text text-sm opacity-70">APT coin</p>
            </div>
            <img src="./tokens/asset_APT.svg" className="w-20 h-20 m-2"/>
        {DepositsWithdraws(coins)}
        </div>
        {/* <UserNfts {...user.nfts} /> */}
    </div>);
}

const GenericCoinStore = (coins: any,typ:string) => {
    const coin = typ.split("::")[2].split("<")[1].split("::")[0]
    return (<div className="flex flex-col  p-3 m-3 rounded-lg text-left items-start justify-start">
        <div className="outline flex flex-row items-center justify-between rounded-lg w-full p-2 m-1">
            <div>
            <p className="text-4xl font-bold">{format_large_number(coins.coin?.value)}</p>
            <p className="text text-sm opacity-70">{coin}</p>
            </div>
            {/* <img src="./tokens/asset_APT.svg" className="w-20 h-20 m-2"/> */}
        </div>
        {DepositsWithdraws(coins)}
        {/* <UserNfts {...user.nfts} /> */}
    </div>);
}

export default AccountResources;