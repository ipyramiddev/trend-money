import {useState} from 'react';
import TokenView from './TokenView';
import AptosPools from './AptosPools';
import { StakePage } from './staking/Validators';

const tabs = [
    {name: 'Yield Strategies', id: 'yield'},
    {name: 'Staking Pools', id: 'stake'},
    {name: 'Open Stake', id: 'celo'},
]

function SwitchView(props) {
    const [view, setView] = useState("token-prices");

    const switchTab = (tab) => {
        if (tab!==view) {
            setView(tab);
        }
    }
    
    return (
        <div className="flex flex-col items-start justify-center">
            <div className="flex flex-row gap-2">
                <div className="tabs">
                    {tabs.map((tab, index) => {
                        return (<a  key={index} className={`tab tab-bordered ${view===tab.name ? 'text-underline' : 'border-gray'}`} onClick={()=>setView(tab.name)}>
                            <p classname="text-2xl">{tab.name}</p>
                            </a>)
                    })
                }
                </div>

                {view === "Yield Strategies" && <AptosPools />}
                {view === "Staking Pools" && <StakePage />}
                {/* {view === "Open stake" && <OpenStake/>} */}
                
            </div>
        </div>
    )
}

export default SwitchView;