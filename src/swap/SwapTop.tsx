import { CoinClient } from "aptos";
import AssetPrice from "components/asset/AssetPrice";
import Stat from "components/Stat";
import Token from "components/Token";
import TokenStack from "components/TokenStack";
import { useEffect, useState } from "react";
import DappLogo from "sections/dapps/DappLogo";
import { dappByName } from "util/dappUtils";
import { useSwapForm } from "./SwapInputs";
import useSubmitSwap, { previewSwap } from "./useSwap";


interface PoolProps {
    pool: any;
}


// Strats are what compose a

const tag_map = {
    lend: { name: "Supply", color: "pink", },
    borrow: { name: "Liquidity pool", color: "red", },
    lp: { name: "Liquidity pool", color: "yellow", },
    order: { name: "Orderbook", color: "orange", }
}

const SS = ({ pool }: any) => {


    return (<div className="flex flex-row gap gap-3 seam-outline p-2 text-white">
        {/* TOKEN */}

        <div>
            <p className="text-xl font-bold">{pool.name}</p>
        </div>
        <div className="flex flex-row justify-between">
            <Stat format={true} name="portion" value={pool.portion * 100} unit="%" />
        </div>
    </div>);
}


// const Σ = (){}
const SwapSettings = (coins:any[]) => { return (<div>
    <p>Swap Inputs</p>
    {coins.map((coin:any)=>(
    <div className="flex flex-row justify-between items-center">
            <Token name={coin.name} icon={coin.symbol} />
        <div>
    <p className="text-3xl">{coin.symbol}</p>
    <p className="text-xl">{coin.name}</p>
    {/* <AssetPrice asset={coin} /> */}
    </div>
    <input type="text"  placeholder="0.0" className="bg-gray-800 text-white"/>
    </div>
    ))}
</div>) };

// const SwapPreview = () => { return (<div>
//     <p>Swap Preview</p>
// </div>) };

const SwapScript = () => { return (<div>
    <p>Swap Script</p>
</div>) };


export function SwapView() {
    const {
        previewSwap,
        submitSwap,
    } = useSubmitSwap();
    const [inputCoins, setInputCoins] = useState<any[]>([]);
    const renderPreview = (inputs: SwapInputs) => {
        // setPrev(SwapPreview({ inputs: inputs }))
        // return(<div></div>)
    }
    const { handleSubmit, handleInputChange, inputs, SwapForm } = useSwapForm(renderPreview)


    const swap_assets = ["APT", "BTC", "ETH", "SOL", "USDT"]
        ;
    const [protocols, setProtocols] = useState(["econia", "Anime.swap", "hippo"])
    // const 

    const add_token = (symbol: string) => {
        if (swap_assets.includes(symbol)) {
            return;
        }
        setInputCoins([...inputCoins, {symbol:symbol}])
    }


    return (<div className="w-full min-h-screen items-center justify-center text-white">
        <div className='flex flex-row justify-between gap gap-6'>
            <div>
                <TokenStack tokens={["APT", "wUSDC", "wSol"]} onClick={add_token} />
                {SwapSettings(inputCoins)}
            </div>
            <div>
                <h1 className="text-3xl text-center"> Σ Swap</h1>
                <div className="items-center justify-center seam-outline shadow-md shadow-blue rounded-2xl">
                    <div>
                        {SwapForm()}
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-row h-1/3 items-center justify-center">
            {/* // <SwapPreview inputs={inputs}/> */}
        </div>

    </div>);
};



function SwapPreview({ inputs }: { inputs: SwapInputs }) {
    // const temp = previewSwap(inputs)
    const [prev, setPrev] = useState<any>(null);
    useEffect(() => {
        previewSwap(inputs).then((p: any) => setPrev(p))
    }, [inputs])
    if (!prev) { return (<div>loading...</div>) }
    // return (<div>
    //     {prev.amount?.toString()}
    // </div>)
    // } 
    return (<div>
        <p>{JSON.stringify(prev)}</p>
    </div>)
}
