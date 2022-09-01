import { Types } from "aptos"
import { formatParam, formatType } from "hooks/formatting"

const EntryTxnArgs = ( payload :Types.TransactionPayload_EntryFunctionPayload) => {
    return (
        <div className="flex flex-row m-2 justify-between outline outline-2  rounded-md bg-opacity-40">
            <div className="p-2">
                <p className="text-center text-xl font-semibold">script args</p>
                {payload.arguments.map((arg, index) => {
                    return <p key={index}>{formatParam(arg)}</p>
                })}
            </div>
            <div className=" bg-white p-2 text-black opacity-80">
                <p className="text-center text-xl font-semibold">arg types</p>
                {payload.type_arguments.map((type_arg, index) => {
                    return <p key={index}>{formatType(type_arg)}</p>
                })}
            </div>
        </div>)
}


export default EntryTxnArgs;