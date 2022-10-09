
import { dapps } from "data/dapps/dapp_data";
import { Link } from "react-router-dom";
import DappLogo from "sections/dapps/DappLogo";
import { useDappContext } from "./DappContext";

interface props {

}


interface sDapp {
    dapp: any;
    setSelectedDapp: (dapp: any) => void;
    isSelected?: boolean;
    key: string;
    // props: {
    // };
}
const DappBadge = ({ dapp, setSelectedDapp, isSelected,key }: sDapp) => {
    return (
    <Link to={`/explorer/dapps/${dapp.name}`}>
    <button data-tip={dapp.name} onClick={() => setSelectedDapp(dapp)}
        className={`outline outline-white  outline-2 dappBadge items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' :''}`} key={dapp.name}>
            {DappLogo(dapp.image)}
    </button>
    </Link>)
}

// export default DappBadge;




const SplashFrame = () => {
    const { dapp, selectDapp } = useDappContext();
    return (
        <div className="w-full h-full items-center justify-center">
            <div className="mockup-window border-pink mockup-window-outline border-4 shadow-xl  shadow-pink  w-full pt-2 m-3">
                <div className = "flex flex-grid  items-center justify-center">
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