import { BCS } from "aptos";


export function generic_serialize(arg: any) {
    if (typeof arg === "string") {
        return BCS.bcsSerializeStr(arg);
    }
    if (typeof arg === "number") {
        return BCS.bcsSerializeUint64(arg);
    }
    if (typeof arg === "boolean") {
        return BCS.bcsSerializeBool(arg);
    }
    throw new Error("Unsupported type");

}



export function serializeVectorBool(vecBool: boolean[]) {
    const serializer = new BCS.Serializer();
    serializer.serializeU32AsUleb128(vecBool.length);
    vecBool.forEach((el) => {
      serializer.serializeBool(el);
    });
    return serializer.getBytes();
  }

  // export const hexToString= (hex: string) => {
  //   const decoder = new TextDecoder();
  //   const bytes = hex.match(/.{2}/g).map((h) => parseInt(h, 16));
  //   return decoder.decode(new Uint8Array(bytes));
  // }