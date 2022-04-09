export default function TokenStack(tokens) {
    return (<div className="">
        <div className={`flex flex-row gap gap-1`}>
        {/* <img src={`../../../public/tokens/asset_DAI.png`} className="w-full h-full" alt="" /> */}
            {tokens.tokens.map(token => {return(
                // <div className={` h-10 bg-${token} p-1 bg-cover`}>
                    <img className="w-10 h-10 rounded-full" src={`../tokens/asset_${token}.png`} alt="" />

            )})}
        </div>
    </div>
    );
}