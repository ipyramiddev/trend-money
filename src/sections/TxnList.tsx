import { Types } from "aptos";
import React from "react";
import { ReactDOM } from "react";
import { formatParam, formatType, parsePayloadFunction, shortenAddress, TimeAgo } from "hooks/formatting";
import { aptosTxnLink } from "hooks/useExplorer";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
import { UserTransaction } from "aptos/dist/generated";
import TxnHeader from "components/txn/TxnHeader";
import EntryTxnArgs from "components/txn/TxnArgs";
interface TxnListProps {
    // isLoading: boolean;
    txns: Types.Transaction[];
    address: string;
}


const TxnList = ({ txns, address }: TxnListProps) => {

    return (
        <div className="h-full items-start ">
            <div className="flex flex-row justify-start items-start "><p>Transactions for</p> <p>{AddrClickable(address)}</p></div>
            
            <div className="txScroller px-4">
            {txns.map((tx: Types.Transaction) => {
                if (tx.type === "user_transaction") {
                    // tx = tx as UserTransaction;
                    return (<div className="seam-outline mx-4 my-3" >
                        <TxnPayload {...tx as UserTransaction} />
                        
                        <TxnFooter {...tx as UserTransaction} />
                    </div>)
                }
                else{
                return <p data-tip="type of txn (ex)">{tx.type}</p>
                }
            }
            )}
            </div>
            {/* <ReactTooltip place="top" textColor="white" multiline={true}/> */}
        </div>
    );
}

const TxnPayload = ({ payload }: UserTransaction) => {
    const { type } = payload;
    
    // console.log("payload", type);
    switch (type) {
        case "entry_function_payload":
            payload = payload as Types.TransactionPayload_EntryFunctionPayload
            const {addr, mod, scr} = parsePayloadFunction(payload.function);
            return (
                <div>
                    <div className="">
                        <TxnHeader address={addr} module_name={mod} func_name={scr} />
                        <p data-tip="type of txn (ex)">{type}
                        {/* <ReactTooltip place="top" textColor="white" multiline={true}/> */}
                        </p>
                        <EntryTxnArgs {...payload} />
                    </div>
                </div>
            );

        case "module_bundle_payload":
            payload = payload as Types.TransactionPayload_ModuleBundlePayload
            return (
                <div>
                    <div className=" bg-white">
                        {payload.type}
                        <TxnHeader address={addr} module_name={mod} func_name={scr} />
                        {/* <EntryTxnArgs {...payload} /> */}
                    </div>
                </div>
            );

    }



    return (
        <div>
            <p>Non user txn</p>
        </div>
    )
}

const VersionLink = (version: string) => {
    const url = aptosTxnLink(version);
    return <a className="flex flex-row text-right justify-end" href={url}>
        <p className="pr-1 text-sm opacity-70 align-bottom">version</p>
        <p className="link">{version}</p>
    </a>;
}

const HashLink = (hash: string) => {
    return (
        <a className="flex flex-row text-right justify-end" href={aptosTxnLink(hash)}>
            <p className="pr-1 text-sm opacity-70 align-bottom">hash</p>
            <p>{shortenAddress(hash)}</p>
        </a>
    )
}
const AddrClickable = (addr:string) => {
    return(
        <button className="px-2 account-outline m-1">
            {shortenAddress(addr)}
        </button>
       
    );
}


const TxnFooter = ({ success, sender, timestamp, version, hash, gas_used,events,event_root_hash }: UserTransaction) => {

    // const event_html
    const event_txt ="<div>"+ events.map((event)=> {
        return "<p>"+formatType(event.type)+"</p>";
        // return event_txt;
    }) + "</div>";
    
    

    return (
        <div className="flex flex-row justify-between">
            <div className="">
                <button className="text-underline">repeat tx </button>
                <p>gas cost: {gas_used}</p>
            </div>
            <div className=""> 
                <p className="text-bold" data-tip={`<p>${event_txt}</p>`}>{events?.length} events</p>
                
                <ReactTooltip place="top" textColor="white" html={true} multiline={true}/>
            </div>
            <div>
                {HashLink(hash)}
                {VersionLink(version)}
                <p data-tip={`timestamp:${timestamp}`} className="text-left">
                    {TimeAgo(timestamp)} from @ {shortenAddress(sender)}
                </p>
            </div>
        </div>
    )
}



export default TxnList;