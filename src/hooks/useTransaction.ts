import { TxnBuilderTypes, AptosClient, Types,TransactionBuilder } from "aptos";
import {useQuery} from "react-query";
import {getTransaction} from ".";
import {ResponseError} from "./client";
import {useGlobalState} from "../GlobalState";
import {useEffect, useState} from "react";
import { NetworkType, SDK } from '@animeswap.org/v1-sdk';

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
        setTransactionInProcess(true);
        await signAndSubmitTransaction(payload, client).then(
          setTransactionResponse,
          );
        }
        
        function clearTransactionResponse() {
          setTransactionResponse(null);
        }
        
        return {
          submitTransaction,
          transactionInProcess,
          transactionResponse,
          clearTransactionResponse,
          genAnimePayload
        };
      };
      
      export default useSubmitTransaction;
      
      
      const NODE_URL = "https://fullnode.mainnet.aptoslabs.com";
      
      const defaultClient = new AptosClient(NODE_URL);
      const sdk = new SDK('https://fullnode.mainnet.aptoslabs.com')
      
      const APTOS_COIN= '0x1:aptos_coin::AptosCoin';
      const T = "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T";
      export const genAnimePayload = async () => {
        
        let txPayload = sdk.swap.addLiquidityPayload({
          coinX: APTOS_COIN,
          coinY: T,
          amountX: 1e8, // any amount you want
          amountY: 1e7, // any amount you want
          slippage: 0.05, // 5%
          deadline: 60 * 60 , // 1 day
        })
        txPayload.typeArguments = [
          "0x1::aptos_coin::AptosCoin",
          "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T",];
        return txPayload;
    }
        
        export const loadTxs = async (address: string,client:AptosClient=defaultClient):Promise<Types.Transaction[]> =>  {
          const txs = await client.getAccountTransactions(address)
          
        return txs.reverse();
    
}
