import { AptosClient } from "aptos";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import ParserServer from '../sections/ide/ParserServer'
type File = {
    name: string;
    lines: string[];
    warnings?: string[];
    compiled?: string;
}

interface EditorProps {
    file: File;
    module: string;
}

const mockFile = {
    name: "test.move",
    lines: [
        "line 1",
        "line 2",
        "line 3",
        "line 4",
        "line 5",
    ],
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

    const handleChange = (e:any) =>{
            setCurrentText(e.event.textValue);
    }

    const [currentText, setCurrentText] = useState<string>(file.lines.join(" \n"));

    return (
        <div className="mockup-window border-pink mockup-window-outline border-4 shadow-xl  shadow-pink  w-full min-h-1/2 pt-2 m-3">

            <div>
        <div className="multiline">
        <textarea 
        className="w-full h-full py-3 mx-3 rounded-2xl bg-white px-5 text-black"
          name="textValue"
          placeholder={currentText}
          onChange={(e)=>handleChange(e)}
        />
      </div>
        <ParserServer/>

      </div>

      <p>{currentText}</p>
            </div>
    )}

export default IDE;