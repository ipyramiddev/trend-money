
interface Props {
    dapp: any;
    setSelectedAddress: (address: string) => void;
    // props: {
    // };
}
const DappBadge = ({ dapp,setSelectedAddress }:Props) => {
            return (<div  onClick={() =>setSelectedAddress(dapp.address)} 
            className="px-2 m-1 h-30 items-center rounded-lg my-3 outline-dashed" key={dapp.name}>
    {/* <button > */}
            <img
                className=" p-1 w-8 h-8 object-contain rounded-xl" 
                src={`../dapps/${dapp.image}`} alt={dapp.name} />
            <p className="font-bold ">{dapp.name}</p>
            {/* </button> */}
    </div>)
}

export default DappBadge;
