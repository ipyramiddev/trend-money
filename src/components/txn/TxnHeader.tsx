import { shortenAddress } from "hooks/formatting";
import copy from "copy-to-clipboard";

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
        <div className="flex flex-row text-center text-xl justify-between gap gap-2 items-center">
            {/* Address */}
            <button data-tip="Copy address" onClick={()=>copyToClipboard(address)} className="account-outline text-bold">{shortenAddress(address)}</button>
            <p className="text-bold text-3xl">::</p>

            {/* Module */}
            <p  data-tip="Copy address" className="module-outline text-bold ">{module_name}</p>
            <p className="text-bold text-3xl">::</p>
            {/* Function */}
            <p className="function-outline">{func_name}</p>
        </div>
    );
};

export default TxnHeader;