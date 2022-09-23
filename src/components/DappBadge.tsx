import DappLogo from "sections/dapps/DappLogo";

interface Props {
    dapp: any;
    setSelectedDapp: (dapp: any) => void;
    isSelected?: boolean;
    // props: {
    // };
}
const DappBadge = ({ dapp, setSelectedDapp, isSelected }: Props) => {
    return (<button data-tip={dapp.name} onClick={() => setSelectedDapp(dapp)}
        className={`outline outline-white  outline-2 dappBadge items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' :''}`} key={dapp.name}>
            {DappLogo(dapp.image)}
    </button>)
}

export default DappBadge;
