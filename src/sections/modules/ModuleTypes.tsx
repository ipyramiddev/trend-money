import { Types } from "aptos";
import { formatParam } from "hooks/formatting";

const ModuleTypes = ({ module }: { module: Types.MoveModuleBytecode }) => {
    const { abi } = module;
    return (
        <div className="flex flex-col w-full px-6 py-4 ">
            <p className="text-center text-2xl ">Module Types</p>
            <div className="flex flex-col scrollbar  scrollbar-thumb-blue2 w-full mx-6 py-5">
                {ModuleStructs(module)}
            </div>
            
        </div>
    );
}


const ModuleStructs = (module: Types.MoveModuleBytecode) => {
    const { abi } = module;
    return (
        <div className="flex flex-row gap gap-2 items-start">
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