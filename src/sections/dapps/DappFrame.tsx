import { useRef, useState } from "react";
import { FaArrowCircleUp, FaBackward, FaForward } from "react-icons/fa";

interface DappFrameProps {
    dapp: Dapp;
    viewUrl:string;

}

const DappHeader = (dapp:Dapp) =>{
    return(<div className="flex flex-row gap gap-2 items-center text-baseline px-4">
    <p className="text-2xl">{dapp.name}</p>
    <img className="rounded-lg w-12 h-12 " src={`./dapps/${dapp.image}`} alt="dapp-img" />
    </div>);

}

const DappFrame = ({dapp,viewUrl}:DappFrameProps) => {
    const ref = useRef<any>();


    const DappNav = () => {
        return (
            <div className="flex flex-row items-start justify-center px-3">
                {/* BACK ARROW */}
                <button className="seam-sqr">
                    <FaBackward />
                </button>

                {/* FORWARD ARROW */}
                <button className="seam-sqr">
                    <FaForward/>
                </button>


                {/* REFRESH button */}

                <button className="seam-sqr">
                    <FaArrowCircleUp/>
                </button>
                <input className="w-2/3 py-3 mx-3 rounded-2xl bg-white px-5 text-black"
                value={viewUrl}>
                    </input>

                {/* url txt input */}
                
            </div>
        )
    }
    const newNav = () => {
        const url =  ref.current.contentWindow.location.href
        console.log("NEW url",url);
    }

    return (
        <div className="">
        <div className="mockup-window  shadow-lg shadow-pink w-full py-3 m-3">
            {DappHeader(dapp)}
        <DappNav/>
        <iframe className="scrollbar rounded-xl  scrollbar-thumb-pink scrollbar-track-blue" 
            width={'100%'}
            height={'600px'}
            ref={ref}
            onLoad={newNav}
            title="host" src={viewUrl}/>
        </div>
        </div>
    )
}

export default DappFrame;