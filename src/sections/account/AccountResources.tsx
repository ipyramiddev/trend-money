import { useEffect, useState } from "react";
import { Types } from "aptos";
import { formatType, format_large_number, shortenAddress, splitType } from "hooks/formatting";
import ReactTooltip from "react-tooltip";
import { json } from "stream/consumers";
import { DepositsWithdraws } from "./DepositsWithdraws";
import { loadResources } from "hooks/useAptos";
import AccountOutline from "components/etc/AccountOutline";
import CoinImg from "components/etc/CoinImg";
import ModuleOutline from "components/etc/ModuleOutline";
import TypeOutline from "components/etc/TypeOutline";


interface Props{
    address: string;
    selectResource: (resource:Types.MoveResource)=>void;
    
}

const AccountResources = ({ address,selectResource }: Props) => {
    const [resources, setResources] = useState<Types.MoveResource[]>([]);



    useEffect(() => {
        loadResources(address).then((res) => {
            const reversed = res
            const coreAddys = res.map((t:any)=>{
                const {cAddr, cMod} = parseCoin(t.type)
                return shortenAddress(cAddr)
            })
            
                setResources(reversed);
        });
    }, []
    );
    return (
        <div className="">
            <p className="text-3xl">Account Resources</p>
            <div className="scrollY overflow-scroll p-2 flex flex-col max-h-2xl ">
                {resources && resources.length !== 0 ? (filteredResources(resources,selectResource,[])) : <p>none</p>}
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
    max: number = 100
    ) => {
        let r_temp = resources;
        
        return ResourceList(r_temp,selectResource);
    }



const Resource = (resource: Types.MoveResource,selectResource: (resource:Types.MoveResource)=>void,base_addr="0x1") => {
    // console.log("Account resource",resource);
    if (resource.type == "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>") {

        return CoinStore(resource.data);
    }
    if (resource.type.includes("0x1::coin::CoinStore")){
        console.log("coinstore",resource.type);
        return GenericCoinStore(resource.data,resource.type)
    }

    if (resource.type == "0x3::token::TokenStore") {
        return TokenStore(resource.data);
    }
    if (resource.type == "0x3::token::Collections") {

        return Collections(resource.data);
    }

    
    const { address, module, name } = splitType(resource.type);
    const isSelf = address==base_addr;
    return (
        <div className="p-2 m-2 outline h-40 rounded-lg outline-2 ">

            <div className="flex flex-row items-center">
            <AccountOutline name="" addr={address} isSelf={isSelf}/>
            <ModuleOutline module_name={module}/>
            <TypeOutline type_name={name}/>
            {/* <TypeOu */}
            </div>
            <div className="flex flex-row justify-end items-end">
            <button  className="bg-white text-black rounded-full px-3 py-2 text-" onClick={()=>selectResource(resource)}>View Details</button>
            </div>
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
            <img src="../tokens/asset_APT.png" className="w-10  rounded-full h-10 bg-white m-2"/>
            <div>
            <p className="text-4xl font-bold">{format_large_number(coins.coin?.value)}</p>
            <p className="text text-sm opacity-70">APT coin</p>
            </div>
            
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
            <CoinImg symbol={cSymbol}/>
            <p className="text-4xl font-bold">{format_large_number(coins.coin?.value)}</p>
            <AccountOutline name="" addr={cAddr}/>
            {/* <p className="text text-sm opacity-70">{coin}</p> */}
            <ModuleOutline module_name={cMod}/>
            
        {DepositsWithdraws(coins)}
        </div>
        </div>
        
        {/* <UserNfts {...user.nfts} /> */}
    </div>);
}


export default AccountResources;