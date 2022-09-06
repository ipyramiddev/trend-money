// Function to convert the market cap to a readable format in thousands
import Icons from '../Icons';
import { Dapp } from './types';

interface Stat {
    name: string;
    value: string;
}
const BubbleStat = ({ name, value }: Stat) => {
    return (
        <div className="flex flex-col">
            <p className="text-pink-500 text-2xl">{value}</p>
            <p className="text-white opacity-60">{name}</p>
        </div>
    );
}
const Tag = ({ name }: { name: string }) => {
    return (
        <div className="rounded-lg text-sm px-3 py-1 outline outline-1 outline-white opacity-75">
            <p className="font-light">{name}</p>
        </div>
    )
}

const Tags = ({ tags }: { tags: string[] }) => (
    <div className="pl-2 flex flex-row gap gap-2">
        {tags.map((tag, i) => (<Tag key={i} name={tag} />))}
    </div>
)

interface Props {
    dapp: Dapp
    onSelect: (dapp: Dapp) => void;
    key:number;

}


const DappBubble = ({ dapp, onSelect,key }: Props) => {

    return (
        <div key={key} 
        onClick={() => onSelect(dapp)}
        className="flex flex-col justify-center px-5 items-center my-2 rounded-2xl border-white border-4 dappBubble">
                <div className="flex flex-row  px-6 justify-start">
                   
                    <img className="rounded-lg w-12 h-12 " src={`./dapps/${dapp.image}`} alt="nft-image" />
                    <p className="p-2 text-xl align-baseline">{dapp.name}</p>
                </div>
            
        </div>
    );
}

export default DappBubble;