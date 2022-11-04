import { Types } from "aptos";

import { formatParam, formatType } from "hooks/formatting";


const GenericParam = (param:Types.MoveFunctionGenericTypeParam) =>{
    const g_string = "< G >"
    
    return (<div>
        <p>{g_string}</p>
    </div>)
}

const FunctionInfo = ({ function: func }: { function: Types.MoveFunction }) => {
    return (
        <div className="items-center justify-center p-1 m-2 rounded-xl">
            <p className="text-center text-2xl pb-2">Function Info</p>
            <p className="label"> function name:</p>
            <p className="function-outline">{func.name}</p>
            <p className="label"> Visibility: {func.visibility}</p>
            
            <div className="flex flex-row justify-between items-center">
                {func.generic_type_params.map((param: Types.MoveFunctionGenericTypeParam, i: number) => {
                    return (
                        <div key={"move" + i} className=" text-green1 justify-center">
                            <p>Type</p>
                              {GenericParam(param)}
                            {param.constraints.map((constraint: Types.MoveAbility, index:number) => {
                                return (
                                    <div key={constraint + index}>
                                    </div>
                                )
                            })
                            }
                        </div>
                    )
                }
                )}
            </div>
            <div>
                <p className="label">Return Type:</p>
                {func.return.length === 0 ? <p>No return type</p> : null}
                {func.return.map((ret: Types.MoveType, i) => {
                    return (
                        <div key={ret + i} className="max-w-10 return-outline justify-center">
                            <p className="">{ret}:</p>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default FunctionInfo;