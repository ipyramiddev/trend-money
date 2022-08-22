import { AptosAccount, AptosClient, BCS, TxnBuilderTypes } from "aptos";
import { MoveFunction, MoveModule, MoveModuleBytecode, MoveType, MoveValue, TransactionPayload } from "aptos/dist/generated";
// import { MoveFunction, MoveModuleABI, MoveTypeId, AccountResource } from "aptos/dist/api/data-contracts";
import { TransactionPayloadScript } from "aptos/dist/transaction_builder/aptos_types";
import TxnHeader from "components/txn/TxnHeader";
import { useEffect, useRef, useState } from "react";
import { generic_serialize } from "util/aptosUtils";
import {useWalletContext } from '../context/wallet/context';
import { ConnectWallet, useWeb3 } from "@fewcha/web3-react";
import ModalWrapper from "./ModalWrapper";

interface txnModalProps {
    client: AptosClient;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

}




const WalletModal = ({isOpen,setIsOpen}: txnModalProps) =>{
    const [open, setOpen] = useState(isOpen);
    const [argList, setArgList] = useState<any[]>([]);
    const cancelButtonRef = useRef(null);
    const walletContext = useWalletContext()
    const { account, balance, isConnected, network, fewcha, martian, currentWallet } = useWeb3();

    
    
    return (
      <ModalWrapper open={isOpen} setOpen={setIsOpen} cancelButtonRef={cancelButtonRef} title="tets">
            


{!isConnected && <ConnectWallet type="list" />}

fewcha...
fewcha.sdk...
fewcha.token...


            {/* <button className="" onClick={connectMartian}> Martian wallet</button> */}


        {/* show input for each of the params and store them in argList */}
       
      </ModalWrapper>
    );
  }
  export default WalletModal;
