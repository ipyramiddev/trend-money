import { AptosAccount, AptosClient, BCS, TxnBuilderTypes } from "aptos";

// import { MoveFunction, MoveModuleABI, MoveTypeId, AccountResource } from "aptos/dist/api/data-contracts";

import TxnHeader from "components/txn/TxnHeader";
import { useEffect, useRef, useState } from "react";
import { generic_serialize } from "util/aptosUtils";
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { ConnectWallet, useWeb3 } from "@fewcha/web3-react";
import ModalWrapper from "./ModalWrapper";
import copy from "copy-to-clipboard";

interface walletModalProps {
  // client: AptosClient;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

}

const WalletModal = ({ isOpen, setIsOpen }: walletModalProps) => {
  const [open, setOpen] = useState(isOpen);
  const [argList, setArgList] = useState<any[]>([]);
  const cancelButtonRef = useRef(null);
  const { account, balance, isConnected, disconnect, network, fewcha, martian, currentWallet } = useWeb3();
  const { } = useWallet();

  const onDisconnect = () => {
    disconnect()
    setOpen(false);
    setIsOpen(false);
  }

  return (
    <ModalWrapper open={isOpen} setOpen={setIsOpen} cancelButtonRef={cancelButtonRef} title="tets">
      {isConnected ? <div className="flex flex-col justify-between"> <p className="text-white">{account?.address}</p>
        <button className='seam-button' onClick={() => copy}> Copy </button>
      </div> : <p> Not connected </p>}
      {!isConnected && <ConnectWallet type="list" />}
      {isConnected && (
        <div className="">
          <div className="flex flex-row justify-center items-center gap gap-3 p-2 m-2">
            <p>Connected with </p>
            {currentWallet === 'martian' ??
              <img className="w-32 h-10" src={`./dapps/martian.png`} alt={currentWallet} />}
            {currentWallet === 'fewcha' ?
              <img className="w-32 h-24 p-2 bg-white rounded-2xl" src={`./dapps/fewcha.svg`} alt={currentWallet} /> : null}
          </div>
          <button className='seam-button' onClick={() => copy}> Copy </button>
          <button className="seam-button" onClick={onDisconnect}>disconnect</button>
        </div>)
      }

    </ModalWrapper>
  );
}
export default WalletModal;
