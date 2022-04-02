export default function TokenStack(tokens) {
    return (<div className="flex flex-col items-center justify-center w-screen h-screen space-y-6">
        <div className="flex">
            {tokens.tokens.map(token => {return(
            <img className="w-12 h-12 rounded-full border-4 border-white" src={`./tokens/${token.img}`} alt="" />
            )})};
            <img className="w-12 h-12 rounded-full border-4 border-white -ml-4" src="https://images.generated.photos/ADbBAzeK5oWF2oDJWfZ2-Wq3TBjqex-dxZVQGD5LPJY/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxMzk2ODBfMDUz/NjY1Nl8wNzAxMDQ2/LmpwZw.jpg" alt="" />
            <img className="w-12 h-12 rounded-full border-4 border-white -ml-4" src="https://images.generated.photos/XML68W6_tNAx4BhHYZSLpszf-vb6NDpjShMIzYaA3iU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0NzY1MjkuanBn.jpg" alt="" />
            <img className="w-12 h-12 rounded-full border-4 border-white -ml-4" src="https://images.generated.photos/Z5HfwR5L8Fez5uCqEcj3SbogJgJhBdfxJs73ZRGjWgE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAwNzc4NzAuanBn.jpg" alt="" /> */}
        </div>
    </div>
    );
}