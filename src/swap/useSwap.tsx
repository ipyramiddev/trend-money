import { useWeb3 } from "@fewcha/web3-react";
import {BCS, TxnBuilderTypes} from "aptos";
import { aSwap } from "hooks/useAnime";
import useSubmitTransaction from "hooks/useTransaction";
import { useState } from "react";

export async function previewSwap(inputs:SwapInputs){
  if(inputs.protocol && inputs.protocol==="Anime.swap"){
    // setLoading(true);
    const temp = await aSwap(inputs.from_coin, inputs.to_coin, inputs.from_quantity)
    console.log("TEMP",temp)
    // setLoading(false);
    return temp;
    
  }
}

const useSubmitSwap = () => {
  // const {
  //   submitTransaction,
  //   transactionInProcess,
  //   transactionResponse,
  //   clearTransactionResponse,
  // } = useSubmitTransaction();
  // const [loading,setLoading] = useState<boolean>(false);
  // const { account, balance, isConnected,disconnect, network, fewcha, martian, currentWallet } = useWeb3();




  async function submitSwap(
    inputs:SwapComp
  ) {
    // const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
    //   TxnBuilderTypes.EntryFunction.natural(
    //     "0x1::swap",
    //     "initialize_swap_owner",
    //     [],
    //     [
    //       BCS.bcsSerializeUint64(stakingAmount),
    //       BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(operatorAddr)),
    //       BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(voterAddr)),
    //     ],
    //   ),
    // );

    // const transactionRequest = await window.martian.generateTransaction(account.address.toString(), payload);
    // const txnHash = await window.martian.signTransaction(transactionRequest);
    // const txnsubmit = await window.martian.submitTransactions(txnHash);

    // await submitTransaction(payload);
  }

  return {
    previewSwap,
    submitSwap,
    // transactionInProcess,
    // transactionResponse,
    // clearTransactionResponse,
  };
  
};

export default useSubmitSwap;

