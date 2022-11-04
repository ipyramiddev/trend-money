import Token from "../Token";

function SupportedAssets(props: any) {
  const tokens = props.tokens;
  return (
    <div>
      <p className="text-2xl">Supported Assets</p>
      <div className="flex flex-row gap-2">
        {tokens.map((token: any, i: number) => (
          <div key={i}>
            {token.symbol}
            <Token token={token.symbol} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupportedAssets;
