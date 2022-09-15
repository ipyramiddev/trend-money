import DappLogo from "sections/dapps/DappLogo";

interface Props {
    dapp: any;
    setSelectedAddress: (address: string) => void;
    isSelected?: boolean;
    // props: {
    // };
}
const DappBadge = ({ dapp, setSelectedAddress, isSelected }: Props) => {
    return (<button onClick={() => setSelectedAddress(dapp.address)}
        
        className={`outline outline-white  outline-2 dappBadge items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' :''}`} key={dapp.name}>
            {DappLogo(dapp.image)}
        {/* <img
            className="object-contain  rounded-3xl"
            src={`../dapps/${dapp.image}`} alt={dapp.name} /> */}
        {/* <p className="font-bold ">{dapp.name}</p> */}
    </button>)
}

export default DappBadge;
