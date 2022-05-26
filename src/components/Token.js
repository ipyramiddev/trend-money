// import { ToolTip } from "react-daisyui";
function Token(props){
    const token = props.token;
    const size = props.size?props.size:10;
    return (
        // <toolTip  data={"token"}>
        <div key={props.i} className={`p-1 hover:scale-125}`}>
            <img className={`w-10 h-10 rounded-full `} title={token} src={`../tokens/asset_${token}.png`} alt={token} />
        </div>
        // </toolTip>
    );

}

export default Token;