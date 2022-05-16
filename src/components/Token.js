// import { ToolTip } from "react-daisyui";
function Token(props){
    const token = props.token;
    return (
        <toolTip key={props.i} data={"token"}>
        <div className="token hover:scale-125">
            <img className="w-10 h-10 rounded-full" title={token} src={`../tokens/asset_${token}.png`} alt={token} />
        </div>
        </toolTip>
    );

}

export default Token;