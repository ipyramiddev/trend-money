import { BCS, Types } from "aptos";


export function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
  }


// export function genPayload(


export function isValidAccountAddress(accountAddr: string): boolean {
    // account address is 0x{64 hex characters}
    // with multiple options - 0X, 0x001, 0x1, 0x01
    // can start with that and see if any fails to parsing
    return /^(0[xX])?[a-fA-F0-9]{1,64}$/.test(accountAddr);
  }
  
export function sortTransactions(
    a: Types.Transaction,
    b: Types.Transaction,
  ): number {
    const first = "version" in a ? parseInt(a.version) : Infinity;
    const second = "version" in b ? parseInt(b.version) : Infinity;
    return first < second ? 1 : -1;
  }
  

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

  export const stringToHex= (text: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("");
  }
  export function isHex(text: string) {
    // if it's hex, and is <= (64 + 2 for 0x) char long
    return text.startsWith("0x") && text.length <= 66;
  }
  