import { useState,useRef } from 'react';


const SEAM_NODE = ""

export default function IRL() {
    
    const [optos, setOptos] = useState(null);
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const port = "6080";
    // const vncScreenRef = useRef<React.ElementRef<typeof VncScreen>>(null);
  return (
    <div className='flex flex-col items-center p-3 m-3 h-full'>
      
      
      <iframe  width="100%" height="100%"title="host" src={`http://192.168.0.130:${port}/vnc.html?host=opto0@192.168.0.130&port=${port}`} />
      
    </div>
  );
}


