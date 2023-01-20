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

    const format_gas = (gas:string) => {
        const gas_num = parseInt(gas);
        const gas_apt = gas_num / 1000000;
        return gas_apt.toFixed(3).toString() + " APT";
    }


    return (
        <div className="flex flex-row justify-between">
            <div className="">
                {/* <button className="text-underline">repeat tx </button> */}
                <p>gas used: {format_gas(gas_used)}</p>
            </div>
            <div className="">
                <p className="text-bold" data-tip={`<p>${event_txt}</p>`}>{events?.length} events</p>

                <ReactTooltip place="top" textColor="white" html={true} multiline={true} />
            </div>
            <div>
                {HashLink(hash)}
                {VersionLink(version)}
                <button 
                    // onClick = {()=}
                data-tip={`timestamp:${timestamp}`} className="text-left">
                    {TimeAgo(timestamp)}
                </button>
            </div>
        </div>
    );
};
