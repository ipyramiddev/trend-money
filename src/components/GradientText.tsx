import React from 'react';

export function GradientText(props){
    return (
        <div className="h-30 w-auto max-w-xs bg-gradient-to-bl from-pink-500 via-red-500 to-yellow-500 text-white rounded-2xl bg-opacity-60 text-center m-2">
            <p className = "text-gray-700 p-1">{props.label}</p>
            <p className="text-3xl align-middle pt-3">{props.value}</p>

            
        </div>
    );
}

export default GradientText;