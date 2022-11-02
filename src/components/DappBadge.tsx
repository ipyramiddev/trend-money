import { Link } from "react-router-dom";
import DappLogo from "sections/dapps/DappLogo";

interface Props {
    dapp: any;
    isSelected?: boolean;
    
    // props: {
    // };
}
const DappBadge = ({ dapp,  isSelected }: Props) => {
    return (
    
    <button data-tip={dapp.name} 
        className={`dappBadge rounded-full p-2 hover:bg-white items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 p-3 text-black' :''}`} key={dapp.name}>
            {DappLogo(dapp.image)}
    </button>
    )
}

export default DappBadge;
