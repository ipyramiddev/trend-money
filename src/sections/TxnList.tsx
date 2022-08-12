import { Types } from "aptos";
import { UserTransaction } from "aptos/dist/api/data-contracts";
import { formatParam, parsePayloadFunction, shortenAddress, TimeAgo } from "hooks/formatting";
import { aptosTxnLink } from "hooks/useExplorer";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
interface TxnListProps {
    // isLoading: boolean;
    txns: Types.OnChainTransaction[];
    address: string;

}


const TxnList = ({ txns, address }: TxnListProps) => {
    const [selectedAddress, setSelectedAddress] = useState<string | null>(address);
    const [addressList, setAddressList] = useState<string[]>([address, "0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270","0x1"]);

    const switchAddress = (address: string) => {
        setSelectedAddress(address);
    }


    return (
        <div className="h-full container">
            <h1>Transactions for { }</h1>
            <select className="addr-dropdown" onChange={(event) => switchAddress(event.target.value)}>

                {/* <option value={chains[0]} onChange={(event)=>connect(event.target.value.id){</select>}>Select a chain</option> */}
                {addressList.map((addr) => (
                    <option value={addr}>
                        <div className="flex flex-row justify-between p-2 p-1">
                            <p>{addr}</p>
                        </div>
                    </option>
                ))}
            </select>
            <div className="txScroller px-4">
            {txns.map((tx: Types.OnChainTransaction) => {
                if (tx.type === "user_transaction") {
                    tx = tx as Types.UserTransaction;
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
            payload = payload as Types.ScriptFunctionPayload;
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
            {/* <p>{payload.data}</p> */}
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