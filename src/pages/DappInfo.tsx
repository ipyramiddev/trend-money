import { useLoaderData } from "react-router-dom";

const DappInfo = () => {
    const dapp = useLoaderData();
    return (<div>
        <div className="flex flex-col items-start">
            {/* <img className="rounded-2xl  " src={`/dapps/${dapp.Img}`} alt="dapp-img" /> */}
        </div>
        


    </div>)
};

export default DappInfo