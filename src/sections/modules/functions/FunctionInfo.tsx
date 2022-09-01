import { Types } from "aptos";
import { MoveAbility, MoveFunctionGenericTypeParam, MoveType } from "aptos/dist/generated";

import { formatParam, formatType } from "hooks/formatting";

const FunctionInfo = ({ function: func }: { function: Types.MoveFunction }) => {
    return (
        <div className="items-center justify-center p-1 m-2 rounded-xl">
            <p className="text-center text-2xl pb-2">Function Info</p>
            <p className="label"> function name:</p>
            <p className="function-outline">{func.name}</p>
            <p className="label"> Visibility: {func.visibility}</p>
            
            <div>
                {func.generic_type_params.map((param: MoveFunctionGenericTypeParam, i: number) => {
                    return (
                        <div key={"move" + i} className=" text-green1 justify-center">
                            {param.constraints.map((constraint: MoveAbility, index) => {
                                return (
                                    <div className="bg-white" key={constraint + index}>
                                        <p className="text-2xl">{constraint}:</p>
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
                {func.return.map((ret: MoveType, i) => {
                    return (
                        <div key={ret + i} className="max-w-10 return-outline justify-center">
                            <p className="">{formatType(ret)}:</p>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default FunctionInfo;