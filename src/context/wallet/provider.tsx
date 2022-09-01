// import { connectPetra, getPetra } from "hooks/wallet";
import React from "react";


import {
  WalletProvider,
  HippoWalletAdapter,
  AptosWalletAdapter,
  HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  FewchaWalletAdapter,
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
  

  // const wallets:walletContext[] = [petraWallet]
  return (
    <WalletProvider wallets={value} onError={(error: Error) => {
      console.log('Handle Error Message', error)
    }} >{children}</WalletProvider>
  );
};

