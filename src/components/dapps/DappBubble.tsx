// Function to convert the market cap to a readable format in thousands
import Icons from '../Icons';
import { Dapp } from './types';

interface Stat {
    name: string;
    value: string;
}
const BubbleStat = ({name, value}: Stat) => {
    return (
        <div className="flex flex-col">
            <p className="text-pink-500 text-2xl">{value}</p>
            <p className="text-white opacity-60">{name}</p>
        </div>
    );
}


export default function DappBubble(dapp: Dapp) {
    
    const stats_template = [
        
        // { "name": "market cap", "value": format_market_cap(nft.market_cap_quote) },
        // { "name": "volume", "value": nft.volume_24h },
        // { "name": "circulating supply", "value": nft.circulating_supply },
        // { "name": "floor 7d", "value": format_floor({floor_price_quote_7d:nft.floor_price_quote_7d, quote_currency:"usd"}) }
    ];


    return (
        <div className=" p-2 m-5 text-black rounded-xl border-white border-4">
            <div className={` text-center hover:opacity-60`}>
            <div className="flex flex-row items-center">

                <img className=" rounded-lg m-3 w-20 max-h-20 " src={`./dapps/${dapp.image}`} alt="nft-image" />
                <p className="text-3xl font-bold">{dapp.name}</p>
                <Icons discordUrl={dapp.discord} twitterUrl={dapp.twitter} githubUrl={dapp.github}/>
                <div className="flex flex-col items-center">
                    {/* {stats_template.map((stat) => {
                        return (
                            <BubbleStat {...stat} />
                            );
                    })} */}

                </div>


            </div>
            </div>
        </div>
    );
}