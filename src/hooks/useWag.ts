import { AptosAccount, AptosClient, BCS, TxnBuilderTypes } from "aptos";


export const wagMint = async (account: AptosAccount, amount: number) => {
    return;
}


function serializeVectorBool(vecBool: boolean[]) {
    const serializer = new BCS.Serializer();
    serializer.serializeU32AsUleb128(vecBool.length);
    vecBool.forEach((el) => {
      serializer.serializeBool(el);
    });
    return serializer.getBytes();
  }
  
  const NUMBER_MAX: number = 1000;
  /** Creates a new collection within the specified account */

  async function createCollection(client:AptosClient, account: AptosAccount, name: string, description: string, uri: string) {
    const scriptFunctionPayload = new TxnBuilderTypes.TransactionPayloadEntryFunction
    (
      TxnBuilderTypes.EntryFunction.natural(
        "0x3::token",
        "create_collection_script",
        [],
        [
          BCS.bcsSerializeStr(name),
          BCS.bcsSerializeStr(description),
          BCS.bcsSerializeStr(uri),
          BCS.bcsSerializeUint64(NUMBER_MAX),
          serializeVectorBool([false, false, false]),
        ],
      ),
    );
  
    const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
      client.getAccount(account.address()),
      client.getChainId(),
    ]);
  
    const rawTxn = new TxnBuilderTypes.RawTransaction(
      TxnBuilderTypes.AccountAddress.fromHex(account.address()),
      BigInt(sequenceNumber),
      scriptFunctionPayload,
      BigInt(1000),
      BigInt(1),
      BigInt(Math.floor(Date.now() / 1000) + 10),
      new TxnBuilderTypes.ChainId(chainId),
    );
  
    const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);
    const pendingTxn = await client.submitSignedBCSTransaction(bcsTxn);
    await client.waitForTransaction(pendingTxn.hash);
  }