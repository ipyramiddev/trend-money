// create a page with link back to explorer/mainnet/0x1

import AccountOutline from "components/etc/AccountOutline";
import { Link, useParams } from "react-router-dom"

const LoadingPage = () => {
    const {network, addr} = useParams();
        return (
            <div className="flex flex-col items-center justify-center p-6 m-4">

                <img src="0.gif"></img>
            </div>
        )
}

export default LoadingPage;
