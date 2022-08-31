import { Types } from "aptos";
import { formatParam } from "hooks/formatting";

const ModuleTypes = ({ module }: { module: Types.MoveModuleBytecode }) => {
    const { abi } = module;
    return (
        <div>
            <p className="text-center text-2xl p-2">Module Types(structs)</p>
            <div className="flex flex-col scrollbar w-60 scrollbar-thumb-blue2 dappScroll">
                {ModuleStructs(module)}
            </div>
            <div className="flex flex-col scrollbar w-60 scrollbar-thumb-blue2 dappScroll">
                {module.abi?.
        </div>
        </div>
    );
}


const ModuleStructs = (module: Types.MoveModuleBytecode) => {
    const { abi } = module;
    return (
        <div className="flex flex-row items-center   ">
            {abi?.structs.map((struct: Types.MoveStruct) => {
                return ModuleStruct(struct);
            })}

        </div>
    )
}


const ModuleStruct = (struct: Types.MoveStruct) => {
    return (
        <div className="outline w-full rounded-xl m-2 px-2">
            <div className="flex flex-row gap gap-1">
                <h3 className="text-2xl">{struct.name}</h3>
                <p className="label">:struct</p>
            </div>
            <div className="p-2">
                {struct.fields.map((field: any) => {
                    return (
                        <div className="flex p-1 gap-1 justify-end">
                            <p>{formatParam(field.name)}:</p>
                            <p>{field.type}</p>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )

}
export default ModuleTypes;