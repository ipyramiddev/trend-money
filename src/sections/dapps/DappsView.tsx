import DappBubble from "components/dapps/DappBubble";
import { dapps } from "data/dapps/dapp_data";
import { useEffect, useState } from "react";
import BubbleSection from "sections/BubbleSection";
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import TxnList from "sections/TxnList";
import DappFrame from "./DappFrame";
import Icons from "components/Icons";

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
        } else {

        }
        // popDapp();
        setSelectedDapp(dapp);
        loadTxs(dapp.address).then((txns)=>setTxns(txns))
        return;
    }

    const reshuffle = () => setOrderedDapps(shuffle(orderedDapps));

    return (
        <div className="min-h-screen w-screen p-6 relative items-start justify-start ">
            <p className="text-3xl">Dapps</p>
                <div className="flex flex-row p-1">
                    <BubbleSection dapps={orderedDapps as Dapp[]} onSelect={loadDapp} />
                </div>
            <div className="min-h-screen px-6">
                {dappStack[0]}
                </div>
            {txns?.length!==0 ? <TxnList txns={txns||[]} address={selectedDapp.address}/> : null}
        </div>
    );
}

export default DappsView;