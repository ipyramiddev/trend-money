import { AptosAccount, AptosClient, BCS, TxnBuilderTypes } from "aptos";

// import { MoveFunction, MoveModuleABI, MoveTypeId, AccountResource } from "aptos/dist/api/data-contracts";

import TxnHeader from "components/txn/TxnHeader";
import { useEffect, useRef, useState } from "react";
import { generic_serialize } from "util/aptosUtils";
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useWeb3 } from "@fewcha/web3-react";
import ModalWrapper from "./ModalWrapper";
import copy from "copy-to-clipboard";
import AccountOutline from "components/etc/AccountOutline";
import Select from "react-select";

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

  const { isConnected, network } = useWeb3();

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
          className="flex flex-row seam-button items-center justify-center w-full h-12 rounded-md gap-4"
          id={option.name.split(' ').join('_')}
          key={option.name}
          >
          <img 
            className="w-10 h-10 rounded-3xl ml-2 gap-4"
            src={`/wallets/${option.name}.png`} alt={option.name} 
          />
          {option.name.split(' ')[0]}
        </button>
      );
    });
  };

  const options = [
    // { value: 'devnet', label: 'Devnet' },
    { value: "https://fullnode.mainnet.aptoslabs.com/", label: "Mainnet" },
    { value: "https://fullnode.devnet.aptoslabs.com/", label: "Devnet" },
    { value: "https://fullnode.testnet.aptoslabs.com/", label: "Testnet" },
    // { value: 'local', label: 'Local' }
  ];

  const selectStyles = {
    option: (base: any, state: any) => ({
      ...base,
      color: state.isFocused ? "black" : "white",
      background: state.isFocused ? "white" : "black",
      
    }),
    control: (base: any) => ({
      ...base,
      background: "#000",
      color: "#fff",
      borderStyle: "dashed",
      borderWidth: "3px",
      borderColor: "white",
      boxShadow: "unset"
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
      color: "#fff",
    }),
    menuList: (base: any) => ({
      ...base,
      padding: 0,
      background: "#000",
      borderStyle: "dashed",
      borderWidth: "3px",
      borderColor: "white",
      borderTop: "unset"
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#fff'
    })
  };

  const ChainInput = () => (
    <div className="flex flex-col items-center justify-center mb-2">
      <Select
        options={options}
        className="rounded-xl"
        styles={selectStyles}
        value={options.find((option) => option.value === network)}
        defaultValue={{
          value: "https://fullnode.mainnet.aptoslabs.com/",
          label: "Mainnet",
        }}
      />
      {/* <p>network:{network.toString()}</p> */}
    </div>
  );

  return (
    <ModalWrapper open={isOpen} setOpen={setIsOpen} cancelButtonRef={cancelButtonRef} title="tets">
      <ChainInput />
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
