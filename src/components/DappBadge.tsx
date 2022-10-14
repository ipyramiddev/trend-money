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
    <Link to={`/explorer/modules/${dapp.address}`} >
    <button data-tip={dapp.name} 
        className={`outline outline-white  outline-2 dappBadge items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' :''}`} key={dapp.name}>
            {DappLogo(dapp.image)}
    </button>
    </Link>)
}

export default DappBadge;
