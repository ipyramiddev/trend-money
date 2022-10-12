import Icons from "components/Icons";
import { useRef, useState } from "react";
import { FaArrowCircleUp, FaBackward, FaForward, FaGithub, FaHome, FaTwitter } from "react-icons/fa";
import { Link, useLoaderData, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { dappByName } from "util/dappUtils";
import { useDappContext } from "./DappContext";
import DappLogo from "./DappLogo";

interface DappFrameProps {
    dapp: Dapp;
    viewUrl: string;

}

const DappHeader = (dapp: Dapp) => {
    return (<div className="flex flex-row gap gap-2  items-center text-baseline px-4">
        <p className="text-2xl ">{dapp?.name}</p>
        {DappLogo(dapp?.image || "dapp.png")}
    </div>);
}

const DappFrame = () => {
    const ref = useRef<any>();
    let {dapp} = useParams();
    console.log("setting dapp:",dapp)
    // let {dapp_data} = useLoaderData() as any;
    let dapp_data = dappByName(dapp||"") as Dapp;
    const [rand, setRand] = useState(0);
    const [url, setUrl] = useState(dapp_data?.url||'');

    // const DappReload = () => {
    //     console.log("Trigger reload");
    //     setUrl(dapp?.url||"");
    //     setRand(rand + 1)
    // }

    
    return (
        <div className="w-full min-w-full">
            <div className="mockup-window border-pink mockup-window-outline border-4 shadow-xl  shadow-pink  w-full pt-2 m-3">
                {DappHeader(dapp_data)}
                {DappNav(dapp_data)}
                <iframe className="scrollbar rounded-xl  scrollbar-thumb-pink scrollbar-track-blue"
                    width={'100%'}
                    height={'600px'}
                    ref={ref}
                    // onLoad={newNav}
                    title="host" src={dapp_data?.url} />
            </div>
        </div>
    )
}

export default DappFrame;


const DappNav=(dapp:Dapp)=> {
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
            // onClick={()=>selectDapp(dapp)}
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
