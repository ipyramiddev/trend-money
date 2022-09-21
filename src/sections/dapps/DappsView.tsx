import DappBubble from "components/dapps/DappBubble";
import { dapps } from "data/dapps/dapp_data";
import { useEffect, useState } from "react";
import BubbleSection from "sections/BubbleSection";
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import TxnList from "sections/TxnList";
import DappFrame from "./DappFrame";
import Icons from "components/Icons";
import DappLogo from "./DappLogo";
import DappBadge from "components/DappBadge";
import ReactTooltip from "react-tooltip";
import { dappsByAddress } from "util/dappUtils";

function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const DappsView = () => {

    const [selectedDapp, setSelectedDapp] = useState<any>(dapps[5]);
    const [recentOpen, setRecentOpen] = useState<any[]>(dapps.slice(0, 3));
    const [orderedDapps, setOrderedDapps] = useState<any[]>(shuffle(dapps));
    const [txns, setTxns] = useState<Types.Transaction[] | null>(null);

    const [dappStack, setDappStack] = useState<any[]>([]);

    const pushDapp = (curr: any) => {
        const newStack = [curr, ...dappStack]
        setDappStack(newStack);
    }

    const loadDapp = (dapp: any) => {
        // if(dapp.name in dappStack.entries)
        
        
        if (dapp.url && !(dapp.name in recentOpen.keys)) {
            
            pushDapp(<DappFrame dapp={dapp} viewUrl={dapp?.url}/>);
            setSelectedDapp(dapp);
            loadTxs(dapp.address).then((txns)=>setTxns(txns))
        } else {
            if(!dapp.url){
                let d = dappsByAddress().get(dapp)
                if (d!==undefined){
                pushDapp(<DappFrame dapp={d} viewUrl={d.url||""}/>);
                setSelectedDapp(d);
                if(d.address){
            loadTxs(d.address).then((txns)=>setTxns(txns))}
            }
            }
            
        }
        // popDapp();
        return;
    }

    const reshuffle = () => setOrderedDapps(shuffle(orderedDapps));

    return (
        <div className="flex flex-col w-full p-6 relative items-start justify-start ">
            <p className="text-3xl">Dapps</p>
                <div className="flex flex-wrap p-1">
                    {dapps.map((dapp:any,i:number)=>{
                        return (<div className="p-0" data-tip={dapp.name}>
                            <DappBadge dapp={dapp} setSelectedDapp={loadDapp} isSelected={dapp.address ? (dapp.address === selectedDapp) : false}/>
                        </div>)
                    })}
                </div>
            <div className="px-6 w-full">
                {dappStack[0]}
                </div>
            {txns?.length!==0 ? <TxnList txns={txns||[]} address={selectedDapp.address}/> : null}
            <ReactTooltip place="top" textColor="white" html={true} multiline={true} />
        </div>
    );
}

export default DappsView;