import { AptosAccount, AptosClient, BCS, TxnBuilderTypes } from "aptos";

// import { MoveFunction, MoveModuleABI, MoveTypeId, AccountResource } from "aptos/dist/api/data-contracts";

import TxnHeader from "components/txn/TxnHeader";
import { useEffect, useRef, useState } from "react";
import { generic_serialize } from "util/aptosUtils";
import { useWallet } from '@manahippo/aptos-wallet-adapter';
// import { ConnectWallet, useWeb3 } from "@fewcha/web3-react";
import ModalWrapper from "./ModalWrapper";
import copy from "copy-to-clipboard";
import AccountOutline from "components/etc/AccountOutline";

interface walletModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const WalletModal = ({ isOpen, setIsOpen }: walletModalProps) => {
  const [open, setOpen] = useState(isOpen);
  const [argList, setArgList] = useState<any[]>([]);
  const cancelButtonRef = useRef(null);
  const {
    connect,
    disconnect,
    account,
    wallets,
    signAndSubmitTransaction,
    connecting,
    connected,
    disconnecting,
    wallet: currentWallet,
    // signMessage,
    signTransaction,
    // network
  } = useWallet();

  const onDisconnect = () => {
    disconnect().then(() => {
    setOpen(false);
    setIsOpen(false);
    });
  }

  const renderWalletConnectorGroup = () => {
    return wallets?.map((wallet) => {
      const option = wallet.adapter;
      return (
        <button
          onClick={() => {
            connect(option.name);
          }}
          className="flex flex-row seam-button items-center justify-center w-full h-12 rounded-md"
          id={option.name.split(' ').join('_')}
          key={option.name}
          >
          {option.name}
          <img 
            className="w-10 h-10 rounded-2xl ml-2"
          src={`/wallets/${option.name}.png`} alt={option.name} />
        </button>
      );
    });
  };

  return (
    <ModalWrapper open={isOpen} setOpen={setIsOpen} cancelButtonRef={cancelButtonRef} title="tets">
      {connected && account!=null ? <div className="flex flex-col justify-between"> 
      <AccountOutline addr={account!=null ? account.address?.toString():"not Connected"}/>
      <p className="text-green1 text-center text-lg">Connected</p>
        <button className='seam-button' onClick={() => copy}> Copy </button>
      </div> : <p> Not connected </p>}
      {renderWalletConnectorGroup()}
      {connected && (
        <div className="">
          <button className='seam-button' onClick={() => copy}> Copy </button>
          <button className="seam-button" onClick={onDisconnect}>disconnect</button>
        </div>)
      }
    </ModalWrapper>
  );
}
export default WalletModal;
