import React from "react";
import { shortenAddress } from "hooks/formatting";

export const AddrClickable = (addr: string) => {
    return (
        <button className="px-2 account-outline m-1">
            {shortenAddress(addr)}
        </button>

    );
};
