import React from "react";

export default function StackedButton(props) {
    return (
        <div className="text-4xl mt-12">
            <div className="bg-yellow rounded-2xl stack-item  hover:bg-opacity-70 ">
                <div className="bg-blue stack-item  hover:bg-opacity-70">
                    <div className="bg-purple stack-item text-center  hover:bg-opacity-70">
                        <p className="p-4 inline-block align-middle  hover:bg-opacity-70">{props.text}</p>
                
                </div>
                </div>
            </div>
        </div>
    );
}