import {useState} from 'react';
import TokenView from './TokenView';
import UbeTokenPrices from '../components/UbeTokenPrices';

function SwitchView(props) {
    const [view, setView] = useState("token-prices");

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-2">
                <div className="tabs">
                    <a className="tab tab-bordered outline outline-2" onClick={()=>setView('token-prices')}><p classname="text-underlined">Token Prices</p></a>
                    <a className="tab tab-bordered" onClick={()=>setView('top-pairs')}>Top Pairs</a>
                    <a className="tab tab-bordered">Platform View</a>
                </div>

                {view === "token-prices" && <UbeTokenPrices />}
                {/* {view === "top-pairs" && <TopPairs />} */}
                {/* {view === "platform-view" && <PlatformView />} */}

            </div>
        </div>
    )
}

export default SwitchView;