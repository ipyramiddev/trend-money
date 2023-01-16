import { Types } from "aptos";
import AccountOutline from "components/etc/AccountOutline";
import ModuleOutline from "components/etc/ModuleOutline";
import { formatParam, splitType } from "hooks/formatting";

const ModuleTypes = ({ module }: { module: Types.MoveModuleBytecode }) => {
    const { abi } = module;
    return (
        <div className="m-3 px-4 py-4 ">
            <p className="text-center text-2xl ">Module Types</p>
            <div className="flex flex-col modscroll scrollbar scrollbar-thumb-blue2  mx-6 py-5">
                {ModuleStructs(module)}
            </div>

        </div>
    );
}


const ModuleStructs = (module: Types.MoveModuleBytecode) => {
    const { abi } = module;
    return (
        <div className="flex flex-wrap w-full gap gap-2 items-start">
            {abi?.structs.map((struct: Types.MoveStruct) => {
                return ModuleStruct(struct);
            })}
        </div>
    )
}

const isComplexName = (name: string) => {
    return name.includes("::") || name.includes("<") || name.includes(">");
}




const ModuleStruct = (struct: Types.MoveStruct) => {
    let fields = struct.fields.map((field: Types.MoveStructField) => {
        let { address, module, name } = splitType(field.type);
        if (isComplexName(name)) {
            const [title, ...rest] = name.split("<");
            name = title;
        }

        return ({ name: field.name, type: name, module: module, address: address })
    });
    return (
        <div className="outline rounded-xl m-2 px-2">
            <div className="flex flex-grid gap gap-1">
                <h3 className="text-2xl">{struct.name}</h3>
                <p className="label">:struct</p>
            </div>
            <div className="p-2">
                {fields.map((field: any) => {
                    return (
                        <div className="flex p-1 gap-1 justify-start">
                            <p>{formatParam(field.name)}:</p>
                            <div>
                                <div className="flex flex-row gap-1 justify-start items-center">
                                    <p className="text-2xl font-bold">{field.type}</p>
                                </div>
                                <div className="flex flex-row gap-1 justify-center items-center">
                                    <p>@</p>
                                    {field.module !== "base" ? (
                                        <>
                                    <AccountOutline addr={field.address} />
                                    <p>::</p>
                                    
                                    <ModuleOutline module_name={field.module}/></>) : (<p>std</p>)}
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )

}
export default ModuleTypes;