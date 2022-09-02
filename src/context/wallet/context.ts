import {createContext, useContext} from "react";
import { AptosAccount } from "aptos";
import {NetworkName} from "../../constants";


export type WalletNetworks = "Devnet" | "Localhost" | "Testnet" | "AIT3";

export const walletExplorerNetworkMap = (
  walletNetwork: WalletNetworks,
): NetworkName => {
  switch (walletNetwork) {
    case "Devnet":
      return "devnet";
    case "Localhost":
      return "local";
    case "AIT3":
      return "ait3";
    
    default:
      return "devnet";
  }
};

