import { AptosClient } from "aptos";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import ParserServer from '../sections/ide/ParserServer'
type File = {
    name: string;
    script: string;
    warnings?: string[];
    compiled?: string;
}

interface EditorProps {
    file: File;
    module: string;
}


const mockScript = (aptIN:any,) => {
    const amnt = aptIN * 100_000_000;
    const market_id= '0x4d61696e204163636f756e74'
    const script = 
    `script { \n
        use 0x9770fa9c725cbd97eb50b2be5f7416efdfd1f1554beb0750d4dae4c64e860da3::controller;
        fun main(sender: &signer) {
            controller::register_user();
            controller::deposit("${market_id}", "${amnt}", false);
        }   
    }`
    return script;
}
const mockFile = {
    name: "test.move",
    script: mockScript(1)
}

interface PoolProps {
    client: AptosClient;
}

// This page will load a list of user files and show an inbrowser ide
// From here the user can create new files, edit existing files, and delete files
// These files will be stored as resources in the user's account
// from this page the user will be able to compile, test and deploy their contracts
const IDE = () => {
    return (
    <div className="w-full h-full items-center ">
        <p>IDE</p>
        <FileEditor file={mockFile} module="temp"/>
    </div>
    )
}

// const ParserServer = (moveText:string) => {}

const IDEHeader = () =>{
    return (<div className="flex flex-row items-start justify-center px-3">
            {/* LOAD File */}
            <button className="seam-sqr" data-tip="coming soon">
                Load File
            </button>

            <button className="seam-sqr" data-tip="coming soon">
                New Script
            </button>

            <button className="seam-sqr" data-tip="coming soon">
                Template Scripts
            </button>

            {/* Save button */}
             <button className="seam-sqr" data-tip="coming soon">
                <FaSave />
            </button>
            </div>)
}


const FileEditor = ({
    file,
    module
}:EditorProps) => {

    // const handleChange = (e:any) =>{
    //         setCurrentText(e.event.textValue);
    // }

    const [currentText, setCurrentText] = useState<string>(file.script);

    return (
        <div className="mockup-window w-3/4 border-pink rounded-xl mockup-window-outline border-4 shadow-xl  shadow-pink  min-h-1/2 pt-2 m-3">
<ParserServer/>
            <div>
        {/* <div className="multiline h-60">
        <textarea 
        className="w-full h-full py-3 mx-3 rounded-2xl bg-white px-5 text-black"
          name="textValue"
          value={currentText}
        //   onChange={(e)=>handleChange(e)}
        />
      </div> */}
        

      </div>

      {/* <p>{currentText}</p> */}
            </div>
    )}

export default IDE;