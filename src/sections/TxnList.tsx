import { Types } from "aptos";

import { formatParam, parsePayloadFunction, shortenAddress, TimeAgo } from "hooks/formatting";
import { aptosTxnLink } from "hooks/useExplorer";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
import { UserTransaction } from "aptos/dist/generated";
interface TxnListProps {
    // isLoading: boolean;
    txns: Types.Transaction[];
    address: string;

}


const TxnList = ({ txns, address }: TxnListProps) => {

    return (
        <div className="h-full container">
            <h1>Transactions for {address}</h1>

            <div className="txScroller px-4">
            {txns.map((tx: Types.Transaction) => {
                if (tx.type === "user_transaction") {
                    // tx = tx as UserTransaction;
                    return (<div className="seam-outline mx-4 my-3" >
                        <TxnPayload {...tx as UserTransaction} />
                        <TxnFooter {...tx as UserTransaction} />
                    </div>)
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
        case "script_function_payload":
            payload = payload as Types.TransactionPayload_ScriptFunctionPayload;
            const {addr, mod, scr} = parsePayloadFunction(payload.function);
            return (
                <div>
                    <div className="">
                        <div className="text-center">
                            <div className="flex flex-row gap gap-2 m-1">
                            <p className="account-outline text-bold text-xl">{addr}</p>
                            <p className="module-outline text-bold text-xl">{mod}</p>
                            <p className="function-outline text-xl">{scr}</p>

                            </div>
                        </div>
                        <div className="flex flex-row m-2 justify-between outline outline-2  rounded-md bg-opacity-40">
                            <div className="p-2">
                            <p className="text-center text-xl font-semibold">script args</p>
                            {payload.arguments.map((arg, index) => {
                                return <p key={index}>{formatParam(arg)}</p>
                            })}
                            </div>
                            <div className=" bg-white p-2 text-black opacity-80">
                            <p className="text-center text-xl font-semibold">arg types</p>
                                {payload.type_arguments.map((type_arg, index) => {
                                    return <p key={index}>{formatParam(type_arg)}</p>
                                })}
                                
                            </div>
                        </div>
                    </div>
                </div>
            )
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


const TxnFooter = ({ success, sender, timestamp, version, hash, gas_used }: UserTransaction) => {
    return (
        <div className="flex flex-row justify-between">
            <p>gas cost: {gas_used}</p>
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