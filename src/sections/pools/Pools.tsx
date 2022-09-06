import { AptosClient } from "aptos";

interface PoolProps {
    client: AptosClient;
}

const Pools = ({ client, }: PoolProps) => {

    return (
        <div>
            <h1>Pools</h1>
        </div>
    )
}

export default Pools;