import { Types } from "aptos";
import { MoveTypeId } from "aptos/dist/api/data-contracts";
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
                {func.params.map((param: string) => {
                    return (
                        <div className=" param-outline justify-center">
                        <p className="">{formatParam(param)}:</p>
                        </div>
                    )
                }
                )}

            </div>
            <div>
                <p className="label">Return Type:</p>
                {func.return.length === 0 ? <p>No return type</p> : null}
            {func.return.map((ret: MoveTypeId, i) => {
                    return (
                        <div key={ret+i} className=" param-outline justify-center">
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