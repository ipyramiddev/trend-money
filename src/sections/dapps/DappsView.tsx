import DappBubble from "components/dapps/DappBubble";
import { dapps } from "dapp_data";
import BubbleSection from "sections/BubbleSection";

const DappsView = () => {
    return (
        <div className="h-screen w-screen p-6 relative items-start justify-start ">
        <h1>Dapps</h1>
        {/* < */}
        <div className="w-1/3 p-2 m-2 auto-cols-auto outline">
        <BubbleSection dapps={dapps}/>
        </div>

        </div>
    );
    }

export default DappsView;