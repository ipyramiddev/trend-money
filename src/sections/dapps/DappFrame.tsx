import WindowWrapper from "components/etc/WindowWrapper";
import Icons from "components/Icons";
import { useRef, useState } from "react";
import { FaArrowCircleUp, FaBackward, FaForward, FaGithub, FaHome, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { dappByName } from "util/dappUtils";
import DappLogo from "./DappLogo";

interface DappFrameProps {
    dapp: Dapp;
    viewUrl: string;
    selectDapp: (dapp: Dapp) => void;
    goHome: () => void;

}





function renderIDapp(url:string) {
    return (<iframe className="scrollbar rounded-xl  scrollbar-thumb-pink scrollbar-track-blue"
    width={'100%'}
    height={'600px'}
    // ref={ref}
    // onLoad={newNav}
    title="host" src={url} />)
    
}

const DappHeader = (dapp: Dapp) => {
    return (<div className="flex flex-row gap gap-2  items-center text-baseline px-4">
        <p className="text-2xl ">{dapp?.name}</p>
        {DappLogo(dapp?.image || "dapp.png")}
    </div>);
}


const DappFrame = ({ dapp, viewUrl,selectDapp,goHome }: DappFrameProps) => {
    const ref = useRef<any>();
    console.log("setting dapp:",dapp)
    let dapp_data = dappByName(dapp.name||"") as Dapp;
    // const home = dapp==="home";
    return (
        <div className="w-full min-w-full">
            <WindowWrapper>
                {DappHeader(dapp_data)}
                {DappNav(dapp_data,selectDapp,goHome)}
                {renderIDapp(dapp_data?.url||"")}
                
            </WindowWrapper>
        </div>
    )
}

export default DappFrame;


const DappNav=(dapp:Dapp,selectDapp:(dapp:Dapp)=>void,goHome:()=>void)=> {
    return (
        <div className="flex flex-row items-start justify-center px-3">
            {/* BACK ARROW */}
            {/* <button className="seam-sqr" data-tip="coming soon">
                <FaBackward />
            </button> */}

            {/* FORWARD ARROW */}
            {/* <button className="seam-sqr" data-tip="coming soon">
                <FaForward />
            </button>
*/}
            {/* REFRESH button */}

            {/* Home Icon button */}
            <Link to="/explorer/dapps/home">
            <button className="seam-sqr" data-tip="Home" 
            onClick={()=>goHome()}
            >
                <FaHome/>
            </button>
            </Link>

            <button
                // onClick={() => selectDapp(null)}
                className="seam-sqr">
                <FaArrowCircleUp />
            </button>
            {/* <input className="w-2/3 py-3 mx-3 rounded-2xl bg-white px-5 text-black"
                value={url}>
            </input> */}
            <div className="flex flex-row gap gap-4 px-3 py-2 rounded-xl text-2xl">
                {/* <button
                    onClick={()=>setUrl((dapp as any).github)}>
                    <FaGithub />
                </button> */}
            </div>
            {/* url txt input */}
            <ReactTooltip place="top" textColor="white" multiline={true} />
        </div>
    )
}
