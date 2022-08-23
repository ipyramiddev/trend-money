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

}


const DappBubble = ({ dapp, onSelect }: Props) => {

    return (
        <div className="flex flex-col justify-center items-center my-2 rounded-2xl border-white border-4 dappBubble">
            <div className=" justify-center items-center">
                <div className="flex flex-row justify-start">
                    <div><p className="p-2 text-3xl font-bold align-baseline">{dapp.name}</p>
                        <Tags tags={dapp.tags as string[]} />
                    </div>
                    <img className="rounded-lg w-12 h-12 " src={`./dapps/${dapp.image}`} alt="nft-image" />
                </div>
                <Icons discordUrl={dapp.discord} twitterUrl={dapp.twitter} githubUrl={dapp.github} />
            </div>
            <button className='seam-button p-2 m-2' onClick={() => onSelect(dapp)}>Open Dapp</button>
        </div>
    );
}

export default DappBubble;