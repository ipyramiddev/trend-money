import { BCS } from "aptos";


function generic_serialize(arg: any) {
    if (typeof arg === "string") {
        return BCS.bcsSerializeStr(arg);
    }
}



function serializeVectorBool(vecBool: boolean[]) {
    const serializer = new BCS.Serializer();
    serializer.serializeU32AsUleb128(vecBool.length);
    vecBool.forEach((el) => {
      serializer.serializeBool(el);
    });
    return serializer.getBytes();
  }