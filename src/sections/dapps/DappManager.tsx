import { useEffect } from "react";
import { useDappContext } from "./DappContext";
import DappFrame from "./DappFrame";
import SplashFrame from "./SplashFrame";

const DappManager = () => {
    const { selectDapp,dapp,isHome } = useDappContext();

    useEffect(() => {
    }, [dapp,isHome])

    const loadDapp = (dapp: any) => {
        selectDapp(dapp)
    }

    
        
        
        
    //     if (dapp.url) {
            
    //         pushDapp(<DappFrame dapp={dapp} viewUrl={dapp?.url||""}/>);
    //         setSelectedDapp(dapp);
    //         loadTxs(dapp.address).then((txns)=>setTxns(txns))
    //     } else {
    //         if(!dapp.url){
    //             let d = dappsByAddress().get(dapp)
    //             if (d!==undefined){
    //             pushDapp(<DappFrame dapp={d} viewUrl={d.url||""}/>);
    //             setSelectedDapp(d);
    //             if(d.address){
    //         loadTxs(d.address).then((txns)=>setTxns(txns))}
    //         }
    //         }
            
    //     }
    //     // popDapp();

    //     return;
    // }


    return (<div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center">
                {/* {dapp ? */}

                {/* // <DappFrame dapp={dapp} viewUrl={dapp?.url||""}/> */}
                {/* // : */}
                {/* // <SplashFrame/>  */}

            </div>
        </div>)
}

export default DappManager;