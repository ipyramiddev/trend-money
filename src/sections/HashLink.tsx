import React from "react";
import { shortenAddress } from "hooks/formatting";
import { aptosTxnLink } from "hooks/useExplorer";

export const HashLink = (hash: string) => {
    return (
        <a className="flex flex-row text-right justify-end" href={aptosTxnLink(hash)}>
            <p className="pr-1 text-sm opacity-70 align-bottom">hash</p>
            <p>{shortenAddress(hash)}</p>
        </a>
    );
};
