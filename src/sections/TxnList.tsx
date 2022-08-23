import { Types } from "aptos";

import { formatParam, parsePayloadFunction, shortenAddress, TimeAgo } from "hooks/formatting";
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
        <div className="h-full container">
            <span className="flex justify-center items-center "><p>Transactions for</p> {AddrClickable(address)}</span>
            
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
                return <p>{tx.type}</p>
                }
            }
            )}
            </div>
        </div>
    );
}

const TxnPayload = ({ payload }: UserTransaction) => {
    const { type } = payload;
    
    console.log("payload", type);
    switch (type) {
        case "entry_function_payload":
            payload = payload as Types.TransactionPayload_EntryFunctionPayload
            const {addr, mod, scr} = parsePayloadFunction(payload.function);
            return (
                <div>
                    <div className="">
                        <TxnHeader address={addr} module_name={mod} func_name={scr} />
                        <EntryTxnArgs {...payload} />
                    </div>
                </div>
            );

        case "module_bundle_payload":
            payload = payload as Types.TransactionPayload_ModuleBundlePayload
            // const {addr, mod, scr} = parsePayloadFunction(payload.function);
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
    return (
        <div className="flex flex-row justify-between">
            <div className="">
                <button className="text-underline">repeat tx </button>
                <p>gas cost: {gas_used}</p>
            </div>
            <div className=""> 
                <p className="text-bold">{events?.length} events</p>
            </div>
            <div>
                {HashLink(hash)}
                {VersionLink(version)}
                <p data-tip="hello-worl" className="text-left">
                    {TimeAgo(timestamp)} from @ {shortenAddress(sender)}
                </p>
            </div>
        </div>
    )
}



export default TxnList;