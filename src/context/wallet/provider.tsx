import { connectPetra, getPetra } from "hooks/wallet";
import React from "react";
import {walletContext} from "./context";
import {useWallet} from "./useWallet";

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({
  children,
}: WalletProviderProps) => {
  const value = useWallet(connectPetra,getPetra);
  

  // const wallets:walletContext[] = [petraWallet]
  return (
    <walletContext.Provider value={value}>{children}</walletContext.Provider>
  );
};

