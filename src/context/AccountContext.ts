
import { AptosAccount, AptosClient } from "aptos";
import * as React from "react";
 
// Create a context to access these from different components within the app
// use via <AccountContextConsumer/> + provider
export interface AccountContext{
  connected: boolean;
  client: AptosClient;
  account: AptosAccount|null;
}
const context = React.createContext<AccountContext | null>(null);
export const AccountContextProvider = context.Provider;
export const AccountContextConsumer = context.Consumer;