import { viewAddressLink } from "../hooks/useExplorer";
import Token from "./Token";

export default function TokenStack(tokens) {
    return (<div className="">
        <div className={`py-2 px-3 flex flex-row items-center -space-x-6 gap gap-1 avatar-group`}>
            {tokens.tokens.map((token,i) => {return(
                    // <a href={viewAddressLink(token)}>
                    <Token key={i} i={i} token={token} />
                    // </a>
                
            )})}
        </div>
    </div>
    );
}