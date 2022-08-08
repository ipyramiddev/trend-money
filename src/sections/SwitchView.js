import {useState} from 'react';
import TokenView from './TokenView';
import UbeTokenPrices from '../components/UbeTokenPrices';
import AptosPools from './AptosPools';

const tabs = [
    {name: 'Aptos Pools', id: 'aptos'},
    {name: 'Celo Pools', id: 'celo'},
    {name: 'Uniswap Pools', id: 'uniswap'},
]

function SwitchView(props) {
    const [view, setView] = useState("token-prices");

    const switchTab = (tab) => {
        if (tab!==view) {
            setView(tab);
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-2">
                <div className="tabs">
                    {tabs.map((tab, index) => {
                        return (<a className={`tab tab-bordered ${view===tab.name ? 'bg-white text-black' : 'border-gray'}`} onClick={()=>setView(tab.name)}>
                            <p classname="text-2xl">{tab.name}</p>
                            </a>)
                    })
                }
                </div>

                {view === "Aptos Pools" && <AptosPools />}
                
            </div>
        </div>
    )
}

export default SwitchView;