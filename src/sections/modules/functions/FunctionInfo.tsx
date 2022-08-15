import { Types } from "aptos";
import { MoveAbility, MoveFunctionGenericTypeParam, MoveType } from "aptos/dist/generated";

import { formatParam } from "hooks/formatting";

const FunctionInfo = ({ function: func }: { function: Types.MoveFunction }) => {
    // const FunctionInfo = (function: Types.MoveFunction) => {
    return (
        <div className="items-center justify-center bg-purple bg-opacity-50 p-1 m-2 rounded-xl">
            <p className="text-center text-2xl p-2">Function Info</p>
            <p className="label"> function name:</p>
            <p className="function-outline">{func.name}</p>
            <p className="label"> Visibility: {func.visibility}</p>
            <div className="seam-outline cc modScroller">
                {func.params.map((param: string,i) => {
                    return (
                        <div key={param+i} className=" param-outline justify-center">
                            <p className="">{formatParam(param)}:</p>
                        </div>
                    )
                }
                )}
            </div>

{func.generic_type_params.map((param: MoveFunctionGenericTypeParam,i:number) => {
                    return (
                        <div key={"move"+i} className=" text-yellow justify-center">
                            {param.constraints.map((constraint: MoveAbility,index) => {
                                return (
                                    <div className="bg-white" key={constraint+index}>
                                        <p className="text-2xl">{constraint}:</p>
                                        {/* <p className="">{constraint.type}</p> */}
                                        </div>
                                )
                            })
                        }
                        </div>
                    )
                }
                )}

            <div>
                <p className="label">Return Type:</p>
                {func.return.length === 0 ? <p>No return type</p> : null}
                {func.return.map((ret: MoveType, i) => {
                    return (
                        <div key={ret + i} className="return-outline justify-center">
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