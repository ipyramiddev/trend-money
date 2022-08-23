import DappBubble from "components/dapps/DappBubble";
import { dapps } from "dapp_data";
import { useState } from "react";
import BubbleSection from "sections/BubbleSection";


const DappsView = () => {
    
    const [selectedDapp, setSelectedDapp] = useState<any>(dapps[5]);
    const [recentOpen, setRecentOpen] = useState<any[]>(dapps.slice(0,5));
    
    const loadDapp = (dapp:Dapp) => {
        setSelectedDapp(dapp)
        // setSelcted
        return;
    }

    return (
        <div className="h-screen w-screen p-6 relative items-start justify-start ">
        <h1>Dapps</h1>
        {/* < */}
        <div className="flex flex-row gap-2 justify-start">
        <div className="w-1/3 p-2 m-2 auto-cols-auto outline">
        <BubbleSection dapps={dapps as Dapp[]} onSelect={setSelectedDapp}/>
        </div>
        <iframe className="scrollbar scrollbar-thumb-pink scrollbar-track-blue" title="host" src={selectedDapp.url} width="80%"/>
        </div>
        </div>
    );
    }

export default DappsView;