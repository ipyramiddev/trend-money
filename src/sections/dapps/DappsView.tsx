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
import Draggable from 'react-draggable';
import { dappsByAddress, shuffle } from "util/dappUtils";
// import {shuffle} from 'util
import { DappContextProvider, useDappContext } from "./DappContext";
import { Outlet, useParams } from "react-router-dom";
import WindowWrapper from "components/etc/WindowWrapper";
import SplashFrame from "./SplashFrame";



const DappsView = () => {
    let {dapp} = useParams();

    const [selectedDapp, setSelectedDapp] = useState<any>("home");
    const [recentOpen, setRecentOpen] = useState<any[]>(dapps.slice(0, 3));
    const [orderedDapps, setOrderedDapps] = useState<any[]>(shuffle(dapps));
    const [txns, setTxns] = useState<Types.Transaction[] | null>(null);

    const [dappStack, setDappStack] = useState<any[]>(recentOpen);
    const {isHome, selectDapp,toggleHome } = useDappContext()

    const pushDapp = (curr: any) => {
        const newStack = [curr, ...dappStack]
        setDappStack(newStack);
    }

    const changeDapp = (dapp: any) => {
        selectDapp(dapp);
        toggleHome();
            
    }


    return (
        <div className="flex flex-col w-full p-6 relative items-start justify-start ">
                <DappContextProvider value={{dapp:null,isHome:true}}>
        {/* <Draggable>                     */}
            {/* <WindowWrapper> */}
            <div className="px-6 w-full">
            <div className="w-full h-100 items-center justify-center">
                {/* {dapp==="home" ? ( ) : null } */}
                {/* <Outlet/>
                 */}
                {isHome ? (
                 <SplashFrame/>)
                    : null}

            {!isHome && selectedDapp.name ? (
                <DappFrame dapp={selectedDapp} viewUrl={selectedDapp.url} selectDapp={changeDapp}/>) : null}

                </div>
                </div>
            
            {/* </WindowWrapper> */}
            {/* </Draggable> */}
            {txns?.length!==0 ? <TxnList txns={txns||[]} address={selectedDapp.address}/> : null}
            <ReactTooltip place="top" textColor="white" html={true} multiline={true} />
                </DappContextProvider>
        </div>
    );
}

export default DappsView;