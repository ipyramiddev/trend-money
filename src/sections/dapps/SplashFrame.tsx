
import { dapps } from "data/dapps/dapp_data";
import { shortenAddress } from "hooks/formatting";
import { Link } from "react-router-dom";
import DappLogo from "sections/dapps/DappLogo";
import { useDappContext } from "./DappContext";


interface sDapp {
    dapp: any;
    setSelectedDapp: (dapp: any) => void;
    isSelected?: boolean;
    key: string;
}

const DappBadge = ({ dapp, setSelectedDapp, isSelected,key }: sDapp) => {
    return (
        <div className="h-100 outline rounded-xl outline-white shadow-blue shadow-lg m-4 px-4 py-2">
            <div className="flex flex-row justify-between items-center">
                {DappLogo(dapp.image)}
                <p className="text-lg text-right">{dapp.name}</p>
            </div>
            {dapp.address ? 
            <Link to={`/explorer/modules/${dapp.address}`}>
            <p className="hover:text-underlined"
            >@{shortenAddress(dapp.address)}</p></Link>:null}
    <Link to={`/explorer/dapps/${dapp.name}`}>
    <button onClick={() => setSelectedDapp(dapp)}
        className={`outline outline-white w-full outline-2 dappBadge items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' :''}`} key={dapp.name}>
            Open Dapp
    </button>
    </Link>

    <button data-tip={dapp.name} onClick={() => setSelectedDapp(dapp)}
        className={`outline outline-white w-full outline-2 dappBadge items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' :''}`} key={dapp.name}>
            View Info
    </button>
    </div>)
}

const SplashFrame = () => {
    const { dapp, selectDapp } = useDappContext();
    return (
        <div className="w-full h-100 items-center justify-center">
            <div className="mockup-window border-pink mockup-window-outline border-4 shadow-xl  shadow-pink  w-full pt-2 m-3">
                <div className = "flex flex-wrap w-full  items-center justify-center">
                {dapps.map((dapp1, i) => {
                    return (<DappBadge key={"dapp"+i.toString()} dapp={dapp1} setSelectedDapp={selectDapp
                    }/>)

                })}
                </div>
            </div>
        </div>
    )
}
export default SplashFrame;