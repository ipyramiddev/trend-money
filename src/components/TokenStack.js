export default function TokenStack(tokens) {
    return (<div className="">
        <div className={`flex flex-row gap gap-1`}>
        {/* <img src={`../../../public/tokens/asset_DAI.png`} className="w-full h-full" alt="" /> */}
            {tokens.tokens.map(token => {return(
                    <img className="w-10 h-10 rounded-full" title={token} src={`../tokens/asset_${token}.png`} alt="" />
            )})}
        </div>
    </div>
    );
}