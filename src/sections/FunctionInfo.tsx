import { Types } from "aptos";
import { formatParam } from "hooks/formatting";

const FunctionInfo = ({ function: func }: { function: Types.MoveFunction }) => {
    // const FunctionInfo = (function: Types.MoveFunction) => {
    return (
        <div className="bg-purple bg-opacity-50 p-1 m-2 rounded-xl">
            <p className="text-center text-2xl p-2">Function Info</p>
            
            <div className="seam-outline modScroller">
                {func.params.map((param: string) => {
                    return (
                        // <div className="flex flex-row gap-1 justify-center">
                        <p className="param-outline">{formatParam(param)}:</p>
                    )
                }
                )}
                {/* <p>{func.returns}</p> */}
            </div>

        </div>
    )
}

export default FunctionInfo;