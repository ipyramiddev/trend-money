import { AptosClient } from "aptos";
import { useState } from "react";
 

interface PoolProps {
    client: AptosClient;
}


// This page will load a list of user files and show an inbrowser ide
// From here the user can create new files, edit existing files, and delete files
// These files will be stored as resources in the user's account
// from this page the user will be able to compile, test and deploy their contracts
const IDE = () => {
    return (
    <div>
        <p>IDE</p>
        

    </div>
    )
}

type File = {
    name: string;
    content: string;
    warnings?: string[];
    compiled?: string;

}

interface EditorProps {
    file: File;
    module: string;

}



const FileEditor = ({
    file,
    module
}:EditorProps) => {

    const [currentText, setCurrentText] = useState<string>(file.content);

    return (
        <div className="mockup-window border-pink mockup-window-outline border-4 shadow-xl  shadow-pink  w-full pt-2 m-3">
        <div className="multiline">
        <input type="textarea" 
        className="w-full h-full py-3 mx-3 rounded-2xl bg-white px-5 text-black"
          name="textValue"
          value={currentText}
        //   onChange={this.handleChange}
        />
      </div>
            </div>
    )}

export default IDE;