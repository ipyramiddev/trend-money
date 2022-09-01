import { TxnBuilderTypes, AptosClient, Types } from "aptos";


// export const sendTransaction

import {useQuery} from "react-query";
import {getTransaction} from ".";
import {ResponseError} from "./client";
import {useGlobalState} from "../GlobalState";
import {useEffect, useState} from "react";

import {
  walletExplorerNetworkMap,
} from "../context/wallet/context";
import {signAndSubmitTransaction} from "./wallet";

export function useGetTransaction(txnHashOrVersion: string) {
  const [state, _setState] = useGlobalState();

  const result = useQuery<Types.Transaction, ResponseError>(
    ["transaction", {txnHashOrVersion}, state.network_value],
    () => getTransaction({txnHashOrVersion}, state.network_value),
  );

  return result;
}


export type TransactionResponse =
  | TransactionResponseOnSubmission
  | TransactionResponseOnError;

// "submission" here means that the transaction is posted on chain and gas is paid.
// However, the status of the transaction might not be "success".
export type TransactionResponseOnSubmission = {
  transactionSubmitted: true;
  transactionHash: string;
};

export type TransactionResponseOnError = {
  transactionSubmitted: false;
  message: string;
};

const useSubmitTransaction = () => {
  const [transactionResponse, setTransactionResponse] =
    useState<TransactionResponse | null>(null);
  const [transactionInProcess, setTransactionInProcess] =
    useState<boolean>(false);
  const [state, _] = useGlobalState();
  // const {walletNetwork} = useWalletContext();
  const client = new AptosClient(state.network_value);

  useEffect(() => {
    if (transactionResponse !== null) {
      setTransactionInProcess(false);
    }
  }, [transactionResponse]);

  async function submitTransaction(
    payload: TxnBuilderTypes.TransactionPayloadEntryFunction,
  ) {
    // if dApp network !== wallet network => return error
    // if (walletExplorerNetworkMap(walletNetwork) !== state.network_name) {
      setTransactionResponse({
        transactionSubmitted: false,
        message:
          "Wallet and Explorer should use the same network to submit a transaction",
      });
      return;
    // }

    // setTransactionInProcess(true);
    // await signAndSubmitTransaction(payload, client).then(
    //   setTransactionResponse,
    // );
  }

  function clearTransactionResponse() {
    setTransactionResponse(null);
  }

  return {
    submitTransaction,
    transactionInProcess,
    transactionResponse,
    clearTransactionResponse,
  };
};

export default useSubmitTransaction;


const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const defaultClient = new AptosClient(NODE_URL);

export const loadTxs = async (address: string,client:AptosClient=defaultClient):Promise<Types.Transaction[]> =>  {
    const txs = await client.getAccountTransactions(address)
        
        return txs.reverse()
    
}
