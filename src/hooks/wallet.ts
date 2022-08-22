import {TxnBuilderTypes, AptosClient} from "aptos";
// import {WalletNetworks} from "../context/wallet/context";
import {
  TransactionResponse,
  TransactionResponseOnError,
} from "./useTransaction";



export const isWalletConnected = async (): Promise<boolean> => {
  try {
    if (await window.aptos?.isConnected?.()) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const isAccountCreated = async (): Promise<boolean> => {
  try {
    const res = await window.aptos?.isConnected?.();
    // if there is an account we are getting a true/false response else we are getting an object type response
    return typeof res === "boolean";
  } catch (error: any) {
    console.log(error);
  }
  return false;
};

export const connectPetra = async (): Promise<any> => {
  if(window.aptos){
    console.log('petra wallet found')
    const result = await window.aptos?.connect?.();
    console.log("result",result);
    return result;
  }
}

export const getPetra = async () : Promise<boolean>  => {
  return isWalletConnected();
}

export const connectMartian = async (): Promise<any> => {
  if(window.martian && !window.martian?.isConnected()){
      console.log("martian not connected trying to connect")
      const res = await window.martian.account();
      return res;
  }
  return {"error": "not fount"};
}



export const connectToWallet = async (): Promise<boolean> => {
  try {
    const result = await window.aptos?.connect?.();
    if ("address" in result) return true;
    if(window.martian) {
        if(!window.martian.isConnected()) {
            window.martian.connect().then((res:any) => {
                console.log(res);
                // const account = 
                return true
            });
        }

    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getAccountAddress: () => Promise<string | null> = async () => {
  try {
    const data = await window.aptos?.account?.();
    if ("address" in data) return data.address;
  } catch (error) {
    console.log(error);
  }
  return null;
};



export const isUpdatedVersion = (): boolean =>
  window.aptos?.on instanceof Function;

export const signAndSubmitTransaction = async (
  transactionPayload: TxnBuilderTypes.TransactionPayloadEntryFunction,
  client: AptosClient,
): Promise<TransactionResponse> => {
  const responseOnError: TransactionResponseOnError = {
    transactionSubmitted: false,
    message: "Unknown Error",
  };

  try {
    const response = await window.aptos?.signAndSubmitTransaction?.(
      transactionPayload,
    );
    if ("hash" in response) {
      await client.waitForTransaction(response["hash"]);
      return {
        transactionSubmitted: true,
        transactionHash: response["hash"],
      };
    }
  } catch (error: any) {
    if (typeof error == "object" && "message" in error) {
      responseOnError.message = error.message;
    }
  }
  return responseOnError;
};
