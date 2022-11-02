// create a page with link back to explorer/mainnet/0x1

import AccountOutline from "components/etc/AccountOutline";
import { Link, useParams } from "react-router-dom"

const ErrorPage = () => {
    const {network, addr} = useParams();
        return (
            <div className="flex flex-col items-center justify-center p-6 m-4">

                <h1 className="text-4xl">404 no account found @</h1>
                <AccountOutline addr={addr} />

                <Link to={`/explorer/modules/${network}/0x1`}>
                    <button className="seam-button">Return</button>
                </Link>
            </div>
        )
}

export default ErrorPage;