import {useState} from 'react';
import TokenView from './TokenView';
import AptosPools from './AptosPools';

const tabs = [
    {name: 'Account Txns', id: 'txns'},
    {name: 'Use', id: 'use'},
    {name: 'Resources', id: 'celo'},
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
                        return (<a  key={index} className={`tab tab-bordered ${view===tab.name ? 'text-underline' : 'border-gray'}`} onClick={()=>setView(tab.name)}>
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