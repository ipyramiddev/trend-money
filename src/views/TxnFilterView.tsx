import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import { useEffect, useState } from "react";
import TxnList from "sections/TxnList";

interface Props {
    address: string;

}


const TxnFilterView = ({ address }: Props) => {
    const [txs, setTxs] = useState<Types.Transaction[]>([]);
    useEffect(() => {
        loadTxs(address).then((res) => {
            setTxs(res)
            console.log("just loaded ", res);
        }
        );
    }, [address])

    // const txnEvents

    return (<div>
        <TxnList txns={txs} address={address} />
    </div>);
}

export default TxnFilterView;