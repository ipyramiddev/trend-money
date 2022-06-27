import Token from "../Token";

function SupportedAssets(props) {
    const tokens = props.tokens;
    return (
        
        <div>
            <p className="text-2xl">Supported Assets</p>
            <div className="flex flex-row gap-2">
                {tokens.map((token, i) => (<div>
                    {token.symbol}
                    <Token token={token.symbol} />
                </div>))}
            </div>

    </div>
    )
}

export default SupportedAssets;