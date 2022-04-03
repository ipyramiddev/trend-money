export default function TokenStack(tokens) {
    return (<div className="flex flex-col items-center justify-center w-screen h-screen space-y-6">
        <div className="flex">
            {tokens.tokens.map(token => {return(
            <img className="w-12 h-12 rounded-full border-4 border-white" src={`./tokens/${token.img}`} alt="" />
            )})};
            
        </div>
    </div>
    );
}