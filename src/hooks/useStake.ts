import { useWeb3 } from "@fewcha/web3-react";
import {BCS, TxnBuilderTypes} from "aptos";
import useSubmitTransaction from "./useTransaction";

const useSubmitStake = () => {
  const {
    submitTransaction,
    transactionInProcess,
    transactionResponse,
    clearTransactionResponse,
  } = useSubmitTransaction();

  const { account, balance, isConnected,disconnect, network, fewcha, martian, currentWallet } = useWeb3();

  async function submitStake(
    stakingAmount: number,
    operatorAddr: string,
    voterAddr: string,
  ) {
    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
      TxnBuilderTypes.EntryFunction.natural(
        "0x1::stake",
        "initialize_stake_owner",
        [],
        [
          BCS.bcsSerializeUint64(stakingAmount),
          BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(operatorAddr)),
          BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(voterAddr)),
        ],
      ),
    );

    const transactionRequest = await window.martian.generateTransaction(account.address.toString(), payload);
    const txnHash = await window.martian.signTransaction(transactionRequest);
    const txnsubmit = await window.martian.submitTransactions(txnHash);

    // await submitTransaction(payload);
  }

  return {
    submitStake,
    transactionInProcess,
    transactionResponse,
    clearTransactionResponse,
  };
  
};

export default useSubmitStake;
