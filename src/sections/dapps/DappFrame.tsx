import Icons from "components/Icons";
import { useRef, useState } from "react";
import { FaArrowCircleUp, FaBackward, FaForward, FaGithub, FaTwitter } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import DappLogo from "./DappLogo";

interface DappFrameProps {
    dapp: Dapp;
    viewUrl: string;

}

const DappHeader = (dapp: Dapp) => {
    return (<div className="flex flex-row gap gap-2  items-center text-baseline px-4">
        <p className="text-2xl ">{dapp.name}</p>
        {DappLogo(dapp.image || "dapp.png")}
    </div>);
}

const DappFrame = ({ dapp, viewUrl }: DappFrameProps) => {
    const ref = useRef<any>();
    const [rand, setRand] = useState(0);
    const [url, setUrl] = useState(viewUrl);

    const DappReload = () => {
        console.log("Trigger reload");
        setUrl(viewUrl);
        setRand(rand + 1)
    }

    const DappNav = () => {
        return (
            <div className="flex flex-row items-start justify-center px-3">
                {/* BACK ARROW */}
                <button className="seam-sqr" data-tip="coming soon">
                    <FaBackward />
                </button>

                {/* FORWARD ARROW */}
                <button className="seam-sqr" data-tip="coming soon">
                    <FaForward />
                </button>

                {/* REFRESH button */}

                <button
                    onClick={() => DappReload()}
                    className="seam-sqr">
                    <FaArrowCircleUp />
                </button>
                <input className="w-2/3 py-3 mx-3 rounded-2xl bg-white px-5 text-black"
                    value={url}>
                </input>
                <div className="flex flex-row gap gap-4 px-3 py-2 rounded-xl text-2xl">
                    
                    <button
                        onClick={()=>setUrl((dapp as any).github)}
                    >
                        <FaGithub />
                    </button>

                    {/* <button
                        onClick={()=>setUrl((dapp as any).twitter)}
                    >
                        <FaTwitter />
                    </button> */}
                </div>

                {/* url txt input */}
                <ReactTooltip place="top" textColor="white" multiline={true} />
            </div>
        )
    }
    const newNav = () => {
        const url = ref.current.contentWindow.location.href
        console.log("NEW url", url);
    }

    return (
        <div className="w-full min-w-full">
            <div className="mockup-window border-pink mockup-window-outline border-4 shadow-xl  shadow-pink  w-full pt-2 m-3">
                {DappHeader(dapp)}
                <DappNav />
                <iframe className="scrollbar rounded-xl  scrollbar-thumb-pink scrollbar-track-blue"
                    width={'100%'}
                    height={'600px'}
                    ref={ref}
                    // onLoad={newNav}
                    title="host" src={url} />
            </div>
        </div>
    )
}

export default DappFrame;