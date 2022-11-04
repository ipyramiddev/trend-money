import React from "react";
import { formatType, shortenAddress, TimeAgo } from "hooks/formatting";
import ReactTooltip from "react-tooltip";
import {Types} from 'aptos';
import { VersionLink } from "./VersionLink";
import { HashLink } from "./HashLink";

export const TxnFooter = ({ success, sender, timestamp, version, hash, gas_used, events, event_root_hash }: Types.UserTransaction) => {

    // const event_html
    const event_txt = "<div>" + events.map((event:Types.Event) => {
        return "<p>" + formatType(event.type) + "</p>";
        // return event_txt;
    }) + "</div>";



    return (
        <div className="flex flex-row justify-between">
            <div className="">
                {/* <button className="text-underline">repeat tx </button> */}
                <p>gas cost: {gas_used}</p>
            </div>
            <div className="">
                <p className="text-bold" data-tip={`<p>${event_txt}</p>`}>{events?.length} events</p>

                <ReactTooltip place="top" textColor="white" html={true} multiline={true} />
            </div>
            <div>
                {HashLink(hash)}
                {VersionLink(version)}
                <p data-tip={`timestamp:${timestamp}`} className="text-left">
                    {TimeAgo(timestamp)} from @ {shortenAddress(sender)}
                </p>
            </div>
        </div>
    );
};
