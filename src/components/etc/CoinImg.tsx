import { shortenAddress } from "hooks/formatting";
import DappLogo from "sections/dapps/DappLogo";
import { getDappImg, isDapp } from "util/dappUtils";

interface CoinProps {
    symbol?:string;
    // addr: string | any
}
const CoinImg = ({symbol}:CoinProps)=>{

    
    return (
        <div className=" flex flex-col h-10 w-10 items-center justify-center rounded-sm p-0 m-2">
    <img src={`tokens/asset_${symbol}.png`} className="rounded-full"/>
    <p>{symbol}</p>
    </div>)
}
export default CoinImg
