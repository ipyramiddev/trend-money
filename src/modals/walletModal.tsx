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

interface walletModalProps {
    // client: AptosClient;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

}

const WalletModal = ({isOpen,setIsOpen}: walletModalProps) =>{
    const [open, setOpen] = useState(isOpen);
    const [argList, setArgList] = useState<any[]>([]);
    const cancelButtonRef = useRef(null);
    const { account, balance, isConnected,disconnect, network, fewcha, martian, currentWallet } = useWeb3();

    const onDisconnect = ()=>{
      disconnect()
      setIsOpen(false);
    }
    return (
      <ModalWrapper open={isOpen} setOpen={setIsOpen} cancelButtonRef={cancelButtonRef} title="tets">
        <p className="text-white">{account?.address}</p>
{!isConnected && <ConnectWallet type="list" />}
{isConnected && (
<div>
  <p>Connected with {currentWallet} <img src={`./dapps/${currentWallet}.png`}/></p>
  <button className="seam-button" onClick={onDisconnect}>disconnect</button>
</div>)
}
{/* fewcha...
fewcha.sdk...
fewcha.token... */}
       
      </ModalWrapper>
    );
  }
  export default WalletModal;
