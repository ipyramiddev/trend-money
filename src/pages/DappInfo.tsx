import WindowWrapper from "components/etc/WindowWrapper";
import { useLoaderData } from "react-router-dom";

const DappInfo = () => {
    const dapp = useLoaderData() as any;
    return (<div>
        <WindowWrapper>
            <div className="flex flex-row justify-between px-2">
                <div className="flex flex-col items-start p-3 m-3">
                    <p className="text-5xl text-bold text-left">{dapp.name}</p>
                    <img className="rounded-2xl w-40 h-40 " src={`/dapps/${dapp.image}`} alt="dapp-img" />
                </div>
                <div>
                    <p>Description</p>
                    <p>{dapp.description}</p>

                    <p>Dapp Address(s)</p>
                    <p>{dapp.address}</p>
                </div>
            </div>
        </WindowWrapper>


    </div>)
};


export default DappInfo

