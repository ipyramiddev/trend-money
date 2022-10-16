import {useState} from 'react';

const tabs = [
    {name: 'Transactions', id: 'txs'},
    {name: 'Types', id: 'types'},
    {name: 'Resources', id: 'resources'},
]

function SwitchView(props) {
    const [view, setView] = useState("Transactions");

    const switchTab = (tab) => {
        if (tab!==view) {
            setView(tab);
        }
    }
    
    return (
        <div className="flex flex-col  m-4 p-4 text-bold items-center justify-center">
            <div className="flex flex-row gap-2 items-center justify-center">
                    {tabs.map((tab, index) => {
                        return (<a  key={index} className={`tab text-3xl tab-bordered ${view===tab.name ? 'text-underline' : ''}`} onClick={()=>setView(tab.name)}>
                            <p classname="text-3xl">{tab.name}</p>
                            </a>)
                    })
                }
{/* 
                {view === "Yield Strategies" && <AptosPools />}
                {view === "Staking Pools" && <StakePage />}
            */}
                {/* {view === "Open stake" && <OpenStake/>} */}
                
            </div>
            {view === "Transactions" && props.children[0]}
            {view === "Types" && props.children[1]}
            {view === "Resources" && props.children[2]}
        </div>
    )
}

export default SwitchView;