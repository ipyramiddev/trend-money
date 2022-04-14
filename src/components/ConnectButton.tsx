import  {useContractKit}  from "@celo-tools/use-contractkit";
import React from "react";
import {shortenAddress} from "../hooks/formatting";
// import { Wallet } from "phosphor-react";

export const ConnectButton: React.FC = () => {
    const { address, connect } = useContractKit();
    return (
        <div
            className="hover:opacity-75 border p-2 cursor-pointer bg-gradient-to-br from-blue-700 to-green-300 rounded-3xl"
            onClick={async () => {
                try {
                    await connect();
                } catch (e) {
                    console.warn(e);
                }
            }}
        >
            <div className="flex items-center justify-center">
                {/* <Wallet className="text-white" size={28} /> */}
                <p className="font-bold ml-2 tracking-tight text-white text-center">
                    {address ? shortenAddress(address) : "Connect Wallet"}
                </p>
            </div>
        </div>
    );
};

export default ConnectButton;