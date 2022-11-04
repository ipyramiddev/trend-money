
import { dapps } from "data/dapps/dapp_data";
import { shortenAddress } from "hooks/formatting";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import DappLogo from "sections/dapps/DappLogo";
import { useDappContext } from "./DappContext";


interface sDapp {
    dapp: any;
    setSelectedDapp: (dapp: any) => void;
    isSelected?: boolean;
    key: string;
}

const DappBadge = ({ dapp, setSelectedDapp, isSelected, key }: sDapp) => {
    return (
        <div className="h-100  outline rounded-xl outline-white shadow-blue shadow-lg m-4 px-4 py-2">
            <div className="flex flex-row justify-between items-center">
                <p className="text-lg font-bold text-right">{dapp.name}</p>
                {DappLogo(dapp.image)}
            </div>
            {dapp.address ?
                <Link to={`/explorer/modules/${dapp.address}`}>
                    <p className="hover:text-underlined"
                    >@{shortenAddress(dapp.address)}</p></Link> : null}
            {/* <Link to={`/explorer/dapps/${dapp.name}`}> */}
                <button onClick={() => setSelectedDapp(dapp)}
                    className={`w-full seam-button  items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' : ''}`} key={dapp.name + '-ui'}>
                    Open Dapp
                </button>
            {/* </Link> */}


            <Link to={`/explorer/dapps/info/${dapp.name}`}>
                <button
                    className={`outline outline-white w-full text-black hover:text-white bg-white hover:bg-transparent outline-2 dappBadge items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' : ''}`} key={dapp.name + "-info"}>
                    Dapp Info
                </button>
            </Link>
        </div>)
}

const SplashFrame = () => {
    const { dapp, selectDapp } = useDappContext();
    return (
        <div className="w-full h-100 items-center justify-center">
            <div className="mockup-window bg-black border-blue mockup-window-outline border-4 shadow-xl  shadow-blue  w-full pt-2 m-3">

                <div className="flex flex-wrap w-full  items-center justify-center">
                    {/* <Draggable> */}
                    {dapps.map((dapp1, i) => {
                        
                        return (
                            <div className="bg-black">
                            {/* <TabWrapper> */}
                                <DappBadge key={"dapp" + i.toString()} dapp={dapp1} setSelectedDapp={selectDapp
                        } />
                            {/* </TabWrapper> */}
                            </div>)

                    })}
                    {/* </Draggable> */}
                </div>
            </div>
        </div>
    )
}
export default SplashFrame;
