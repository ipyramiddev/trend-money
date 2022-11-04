import { viewAddressLink } from "../hooks/useExplorer";
import Token from "./Token";

export default function TokenStack(tokens: any, onClick: any) {
  return (
    <div className="">
      <div
        className={`py-2 px-3 flex flex-row items-center -space-x-6 gap gap-1 avatar-group`}
      >
        {tokens.tokens.map((token: any, i:number) => {
          return (
            // <a href={viewAddressLink(token)}>
            <button onClick={() => onClick(token)} key={i}>
              <Token key={i} i={i} token={token} />
            </button>
            // </a>
          );
        })}
      </div>
    </div>
  );
}
