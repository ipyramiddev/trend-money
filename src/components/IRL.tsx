import { useState,useRef } from 'react';


const SEAM_NODE = ""


export default function IRL(node:any) {
    
    const port = "6080";
    // const vncScreenRef = useRef<React.ElementRef<typeof VncScreen>>(null);
  return (
      <div className='flex flex-col w-full h-screen items-start justify-start h-100'>
      
      <iframe  width="100%" height="600px" title="host" src={`http://192.168.0.130:${port}/vnc.html?host=opto0@192.168.0.130&port=${port}`} />
    </div>
  );
}


