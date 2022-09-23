import { shortenAddress } from "hooks/formatting";
import DappLogo from "sections/dapps/DappLogo";
import { getDappImg, isDapp } from "util/dappUtils";

interface CoinProps {
    symbol?:string;
    // addr: string | any
}
const CoinImg = ({symbol}:CoinProps)=>{

    
    return (
        <div className=" flex flex-row h-20 w-20 items-center justify-center rounded-sm p-0 m-2">
    <img src={`./tokens/asset_${symbol}.png`} className="rounded-full"/>
    </div>)
}
export default CoinImg
