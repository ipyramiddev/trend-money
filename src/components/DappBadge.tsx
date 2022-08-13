
interface Props {
    dapp: any;
    setSelectedAddress: (address: string) => void;
    isSelected?: boolean;
    // props: {
    // };
}
const DappBadge = ({ dapp, setSelectedAddress, isSelected }: Props) => {
    return (<div onClick={() => setSelectedAddress(dapp.address)}
        
        className={`outline outline-white outline-2 dappBadge items-center justify-center  ${isSelected ? 'bg-white bg-opacity-20' :''}`} key={dapp.name}>
        <img
            className="object-fill dappBadge-img"
            src={`../dapps/${dapp.image}`} alt={dapp.name} />
        <p className="font-bold ">{dapp.name}</p>
    </div>)
}

export default DappBadge;
