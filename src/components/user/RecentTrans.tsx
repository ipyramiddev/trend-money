

// Create component to show recent transactions
// price, quantity and time will be show
export function RecentTrades(userAddress: string) {
    return (<div className="bg-black opacity-30">
        <p className="text-2xl pb-1"> ⏰ Recent Activity ⏰ </p>
        <div className=" rounded-2xl text-blue-700">
            {/* {props.trades.map((trade, index) => {
                return (<div className="flex justify-between p-1">
                    <div className="flex flex-col">
                        <p className="text-white text-sm">{trade.action}</p>
                        <p className="text-white text-sm">{trade.quantity}</p>
                        <p className="text-white text-sm">{trade.price}</p>
                    </div>
                </div>)})} */}
            
        </div>
        </div>

    );}

export default RecentTrades;