import Stat from "components/Stat";
import Token from "components/Token";
import { useEffect, useState } from "react";
import DappLogo from "sections/dapps/DappLogo";
import { dappByName } from "util/dappUtils";
import {useSwapForm} from "./SwapInputs";
import useSubmitSwap, { previewSwap } from "./useSwap";


interface PoolProps {
    pool: any;
}


// Strats are what compose a

const tag_map= {
    lend: {name:"Supply", color:"pink",},
    borrow: {name:"Liquidity pool", color:"red",},
    lp: {name:"Liquidity pool", color:"yellow",},
    order: {name:"Orderbook", color:"orange",}
}

const SS = ({pool}:any) =>{


    return (<div className="flex flex-row gap gap-3 seam-outline p-2 text-white">
        {/* TOKEN */}
            
        <div>
        <p className="text-xl font-bold">{pool.name}</p>
        
        </div>
        <div className="flex flex-row justify-between">
            <Stat format={true} name="portion" value={pool.portion*100} unit="%"  />
        </div>
    </div>);
}


// const Σ = (){}
const SwapSettings=()=>{return(<div></div>)};

export function  SwapView()  {
    // const {
    //     previewSwap,
    //     submitSwap,
    //   } = useSubmitSwap(); 
      const [prev, setPrev] = useState<any>(null);
      const renderPreview = (inputs:SwapInputs) => {
          setPrev(SwapPreview({inputs:inputs}))
          // return(<div></div>)
        }
        const { handleSubmit, handleInputChange, inputs,SwapForm} = useSwapForm(renderPreview)

    
    const swap_assets = ["APT","BTC","ETH","SOL","USDT"]
    ;
    const [protocols,setProtocols] = useState(["econia","aptin","Anime.swap"])
    // const 
    

    


return (<div className="w-full h-screen items-center justify-center text-white">
        <div className='flex flex-row justify-center'>
            <div>
            <h1 className="text-3xl text-center"> Σ Swap</h1>
            <div className="items-center justify-center seam-outline shadow-md shadow-blue rounded-2xl">
                {/* <TokenStack tokens={pool_assets}/> */}
                <SwapSettings/>
                <div>
                {SwapForm()}
                </div>
                </div>
            </div>
            </div>        

            <div className="flex flex-row bg-pink h-1/3 items-center justify-center">
                {/* { */}
                {prev ? prev:null }
                {/* // <SwapPreview inputs={inputs}/> */}
            </div>

    </div>);
};

function SwapPreview({inputs}:{inputs:SwapInputs}) {
    // const temp = previewSwap(inputs)
    const [prev, setPrev] = useState<any>(null);
    useEffect(()=>{
        previewSwap(inputs).then((p:any)=>setPrev(p))
    },[inputs])
        if(!prev){return (<div>loading...</div>)}
        // return (<div>
        //     {prev.amount?.toString()}
        // </div>)
    // } 
    return (<div>
        <p>{JSON.stringify(prev)}</p>
    </div>)
}
