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
import AccountOutline from "components/etc/AccountOutline";
import CoinImg from "components/etc/CoinImg";
import ModuleOutline from "components/etc/ModuleOutline";

const web3 = new Web3();

interface Props{
    address: string;
    selectResource: (resource:Types.MoveResource)=>void;
    
}

const AccountResources = ({ address,selectResource }: Props) => {
    const [resources, setResources] = useState<Types.MoveResource[]>([]);
    const [filters, setFilters ] = useState<string[]>([])
    const [filterItems, setFilterItems ] = useState<string[]>([])

    const toggleFilter= (f:any) => {
        if(filters.includes(f)){
            const temp = filters.filter((f1:any) =>{
                return f1!==f;
            })
            setFilters(temp);
            return;
        }
        setFilters([...filters, f])
    }

    useEffect(() => {
        loadResources(address).then((res) => {
            const reversed = res.reverse()
            const coreAddys = res.map((t:any)=>{
                const {cAddr, cMod} = parseCoin(t.type)
                return shortenAddress(cAddr)
            })
            
                setResources(reversed);
                setFilterItems([... new Set(coreAddys)]);
        });
    }, []
    );
    return (
        <div>
            <p className="text-3xl">Account Resources</p>
            {/* filter view */}
            <div className="flex flex-grid items-start">
                {filterItems.map((f:any)=>{
                    const active = filters.includes(f);
                    return (<button className={`outline rounded-t-xl p-2 ${active? 'bg-white text-black':"text-white"}`}
                     onClick={()=>toggleFilter(f)}>
                        <p >{f}</p>
                    </button>)
                })}
            </div>


            <div className="modScroll p-2 flex flex-col max-w-2xl ">
                {resources && resources.length !== 0 ? (filteredResources(resources,selectResource,filters)) : <p>none</p>}
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
    filter: string[] = [],
    max: number = 15
    ) => {
        let r_temp = resources;
        let i = 0;
        while(i<filter.length && resources.length>0){
            r_temp = r_temp.filter((r:Types.MoveResource,i:number)=>{
                const t = r.type.startsWith(filter[i])
                return t;
            })
            i=i+1;
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
        <div className="outline rounded-lg">
            <p>Account Collections </p>
            <p>{JSON.stringify(c)}</p>
        </div>)
}

const Collection = (c: any) =>{

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

const parseCoin= (coin:string) =>{
    const coinT = coin.split("<")

    const c = coinT[coinT.length-1].split("::")
    const cAddr = c[0]
    const cMod = c[1]
    const cSymbol = c[2].split(">")[0]
    return {cAddr,cMod,cSymbol}
}

const GenericCoinStore = (coins: any,typ:string) => {
    const coinT = typ.split("<")

    const coin = coinT[coinT.length-1]
    const {cAddr, cMod, cSymbol} = parseCoin(typ)
    return (<div className="flex flex-col  p-3 m-3 rounded-lg text-left items-start justify-start">
            <div>
        <div className="outline flex flex-row items-center justify-between rounded-lg w-full p-2 m-1">
            <p className="text-4xl font-bold">{format_large_number(coins.coin?.value)}</p>
            <CoinImg symbol={cSymbol}/>
            <AccountOutline name="" addr={cAddr}/>
            {/* <p className="text text-sm opacity-70">{coin}</p> */}
            <ModuleOutline module_name={cMod}/>
            <div>
            <img src="./tokens/asset_APT.png" className="w-20 h-20 m-2"/>
            <p>{cSymbol}</p>
            </div>
            {/* <p className="text text-sm opacity-70">{typ.split("::")[1]}</p> */}
            </div>
            {/* <img src="./tokens/asset_APT.svg" className="w-20 h-20 m-2"/> */}
        </div>
        {DepositsWithdraws(coins)}
        {/* <UserNfts {...user.nfts} /> */}
    </div>);
}

export default AccountResources;