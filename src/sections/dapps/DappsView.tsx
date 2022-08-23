import DappBubble from "components/dapps/DappBubble";
import { dapps } from "dapp_data";
import { useState } from "react";
import BubbleSection from "sections/BubbleSection";
import { ImShuffle} from 'react-icons/im';
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import TxnList from "sections/TxnList";

function shuffle(array:any[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

const DappsView = () => {
    
    const [selectedDapp, setSelectedDapp] = useState<any>(dapps[5]);
    const [recentOpen, setRecentOpen] = useState<any[]>(dapps.slice(0,5));
    const [orderedDapps,setOrderedDapps] = useState<any[]>(shuffle(dapps));
    const [txns, setTxns] = useState<Types.Transaction[]|null>(null);

    const loadDapp = (dapp:any) => {
        setSelectedDapp(dapp);
        addRecent(dapp);
        if(dapp.address){
            loadTxs(dapp.address).then((txs)=>setTxns(txs))
        }
        // setSelcted
        return;
    }
    const addRecent = (dapp: Dapp) =>{
        const newRecent = [dapp, ...recentOpen]
        setRecentOpen(newRecent);
    }
    const reshuffle = () => setOrderedDapps(shuffle(orderedDapps));

    return (
        <div className="h-screen w-screen p-6 relative items-start justify-start ">
        <p className="text-3xl">Dapps</p>
        {/* < */}
        <div className="flex flex-row gap-2 justify-start">
        <div className="w-1/3 p-2 m-2 auto-cols-auto outline">
        <p>Recently Used</p>
        <div className="flex flex-col w-full">
            <div className="flex flex-row p-1">
        {recentOpen.map((dapp:any)=>{
            return <img className="w-10 h-10 p-1" src={"./dapps/"+dapp.image}/>
        })

        
    }
    </div>
    {/* <button className="seam-button" onClick={reshuffle}><ImShuffle/></button> */}
    </div>
        <BubbleSection dapps={orderedDapps as Dapp[]} onSelect={loadDapp}/>
        </div>
        <iframe className="scrollbar scrollbar-thumb-pink scrollbar-track-blue" title="host" src={selectedDapp.url} width="80%"/>
{/*         
    </div>
    </div> */}
        </div>
        {txns?.length!=0 ? <TxnList txns={txns||[]} address={selectedDapp.address}/> : null}
        </div>
    );
    }

export default DappsView;