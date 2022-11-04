// import { connectPetra, getPetra } from "hooks/wallet";
import React from "react";


import {
  WalletProvider,
  HippoWalletAdapter,
  AptosWalletAdapter,
  HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  FewchaWalletAdapter,
  useWallet,
  // PontemWalletAdapter
} from '@manahippo/aptos-wallet-adapter';

interface WalletProviderProps {
  children: React.ReactNode;
}
export const MyWalletProvider: React.FC<WalletProviderProps> = ({
  children,
}: WalletProviderProps) => {
  const wallets = [
    new HippoWalletAdapter(),
    new MartianWalletAdapter(),
    new AptosWalletAdapter(),
    new FewchaWalletAdapter(),
    new HippoExtensionWalletAdapter(),
    // new PontemWalletAdapter()
  ];
  const value = wallets;
  // const {
  //   connect,
  //   disconnect,
  //   account,
  //   signAndSubmitTransaction,
  //   connecting,
  //   connected,
  //   disconnecting,
  //   wallet: currentWallet,
  //   signTransaction,
  //   select
  // } = useWallet();

  // const wallets:walletContext[] = [petraWallet]
  return (
    <WalletProvider wallets={value} 
      // autoConnect={false}
      onError={(error) => {
        console.log('wallet errors: ', error);
        // message.error(error);
      }}>{children}</WalletProvider>
  );
};

