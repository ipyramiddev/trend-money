import { Types } from "aptos";
import React from "react";
import { ReactDOM } from "react";
import { formatParam, parsePayloadFunction } from "hooks/formatting";
import TxnHeader from "components/txn/TxnHeader";
import EntryTxnArgs from "components/txn/TxnArgs";
import { TxnFooter } from "./TxnFooter";
import { AddrClickable } from "./AddrClickable";
interface TxnListProps {
    // isLoading: boolean;
    txns: Types.Transaction[];
    address: string;
}


const TxnList = ({ txns, address }: TxnListProps) => {

    return (
        <div className="h-full items-start ">
            <div className="flex flex-row justify-start items-center ">
                <p>Transactions for</p> <p>{AddrClickable(address)}</p>
            </div>

            <div className="txScroller px-4">
                {txns.map((tx: Types.Transaction) => {
                    if (tx.type === "user_transaction") {
                        return (<div className="seam-outline mx-4 my-3" >
                            <TxnPayload {...tx as Types.UserTransaction} />

                            <TxnFooter {...tx as Types.UserTransaction} />
                        </div>)
                    }
                    else {
                        return <p data-tip="type of txn (ex)">{tx.type}</p>
                    }
                }
                )}
            </div>
        </div>
    );
}

const TxnPayload = ({ payload }: Types.UserTransaction) => {
    const { type } = payload;

    switch (type) {
        case "entry_function_payload":
            payload = payload as Types.TransactionPayload_EntryFunctionPayload
            const { addr, mod, scr } = parsePayloadFunction(payload.function);
            return (
                <div>
                    <div className="">
                        <TxnHeader address={addr} module_name={mod} func_name={scr} />
                        <p data-tip={payload.arguments}>{type}
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
        default:
            return (
                <div>
                    <p>{type}</p>
                </div>
            )

    }

    return (
        <div>
            <p>Non user txn</p>
        </div>
    )
}

export default TxnList;