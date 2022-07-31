import { useState,useRef } from 'react';




export default function IRL() {
    
    const [optos, setOptos] = useState(null);
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const port = "6082";
    // const vncScreenRef = useRef<React.ElementRef<typeof VncScreen>>(null);
  return (
    <div className='flex flex-col items-center p-3 m-3 w-full'>
      <div className="mockup-code">
        <pre data-prefix="$"><code> Welcome to aptosXoptos</code></pre> 
        <pre data-prefix=">>>" data-suffix=">>>"><code>Your opto hosts</code>  </pre>

        </div>

      
      <iframe title="host" src={`http://opto0:${port}/vnc.html?host=opto0&port=${port}`} width="auto" />
      
    </div>
  );
}


