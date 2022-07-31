
const user = {
    ethAddress: "0x8d12a197cb00d4747a1fe03395095ce2a5cc6819",
    wallet_balances: [
        {
            chain: "ETH",
            balance: "10.00"
        },
        {
            chain: "BUCKT",
            balance: "49.00"
        }
    ]
}

export default function UserAssets() {

    return (
        <div className="bg-black">
            <p className="text-3xl text-white pb-1">💰 User Assets 💰 </p>
            {/* Show available wallet data */}
            {/* Show open positions on buckets */}
            {/* show user recent activities */}
            <div className=" rounded-3xl bg-white bg-opacity-25 text-left p-3">
                <p className="text-2xl text-white opacity-70" > wallet balances </p>
                <div className="pl-3">
                {user.wallet_balances.map((balance, index) => {
                    return (<div className="flex justify-between p-1">
                        <div className="flex grid-cols-2 gap-4">
                            <div>
                            <p className="label-text">Asset</p>
                                <p className="value-text">{balance.chain}</p>
                            </div>
                            <div>
                                <p className="label-text">Quantity</p>
                                <p className="value-text">{balance.balance}</p>
                            </div>
                        </div>
                    </div>)
                })}
                </div>

            </div>
            <div>
            </div>
        </div>
    );
}