import { useEffect, useState } from "react";
// import {getAccountResources } from '@fewcha/web3";
// loads the resources for an account
import Web3 from "@fewcha/web3";
import { MoveResource } from "aptos/dist/generated";
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
            // if (res.status === 200) {
                setResources(res);
            // }
        });
        // web3.action.sdk.
    }, []
    );
    return (
        <div>
            
            <div className="modScroll p-2 flex flex-col max-w-2xl ">
                {resources && resources.length !== 0 ? (ResourceList(resources,selectResource)) : <p>none</p>}
            </div>
            
        </div>
    );
}

const ResourceList = (resources: MoveResource[],selectResource: (resource:Types.MoveResource)=>void) => {
    return resources.map((resource: MoveResource,) => Resource(resource,selectResource))
}

const Resource = (resource: MoveResource,selectResource: (resource:Types.MoveResource)=>void) => {
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
    const tooltipText = JSON.stringify(resource.data,null, "\n").split("\n").map((ele,i)=>{
        if(ele.length>5){
        return (`<p>${ele.replace('"',"")}</p>`)}})
    return (
        <div className="p-2 m-2 outline outline-2 overflow-hidden">
            <button onClick={()=>selectResource(resource)} data-tip={`<div>${tooltipText}</div>`}>{formatType(resource.type)}</button>
            <ReactTooltip place="top" textColor="white"  html={true} multiline={true}/>
        </div>
    )
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
    return (<div className="flex flex-col p-3 m-3 rounded-lg text-left items-start justify-start">
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