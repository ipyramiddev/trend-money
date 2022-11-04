import { shortenAddress } from "hooks/formatting";
import copy from "copy-to-clipboard";

import DappLogo from "sections/dapps/DappLogo";
import { dapp_map, getDappImg,isDapp } from "util/dappUtils";
interface Props {
    address: string;
    module_name: string;
    func_name: string;
}

const TxnHeader = ({ address, module_name, func_name }: Props) => {

    const copyToClipboard = (copyText:string) => {
        copy(copyText);
        // alert(`You have copied "${copyText}"`);
     }

    return (
        <div>
        <div className="flex flex-row overflow-auto text-center text-xl justify-between gap gap-2 items-center">
            {/* Address */}
            
            <button data-tip={`${address} \n Copy address`} onClick={()=>copyToClipboard(address)} className="account-outline  p-1 text-bold">
            {isDapp(address) ? (DappLogo(getDappImg(address))) : shortenAddress(address)}
                </button>
            <p className="text-bold text-2xl">::</p>
            {/* Module */}
            <p  data-tip="Module name" className="module-outline text-bold ">{module_name}</p>
            <p className="text-bold text-3xl">::</p>
            <p  data-tip="function name" className="function-outline">{func_name}</p>
            {/* Function */}
        </div>
        </div>
    );
};

export default TxnHeader;