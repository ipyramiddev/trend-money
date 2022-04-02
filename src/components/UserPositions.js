

export default function UserPositions(user) {
    return (
        <div className="rounded-2xl p-5 m-5 bg-white text-white bg-opacity-50">
            <div>
                <div className="text-4xl p-2">
                    <p>Your Positions</p>
                </div>

                <div className="grid grid-cols-2">
                    <div>
                        <div className="rounded-2xl bg-white bg-opacity-20">
                            <p className="p-2 text-green text-2xl">{user.usd_equiv}</p>
                            <p className="opacity-50 text-right pr-2">Your balance</p>
                        </div>
                    </div>
                    <div className="p-2  m-2 rounded-2xl bg-white bg-opacity-20 text-right">
                        <p className="text-green text-2xl">{user.total_interest}</p>
                        <p className="opacity-50 text-right pr-2 mb-2">Total Interest Earned</p>

                        <p className="text-blue text-2xl">{user.interest_24h}</p>
                        <p className="opacity-50 text-right pr-2">24h interest</p>

                        <p className="text-pink text-2xl">{user.interest_7d}</p>
                        <p className="opacity-50 text-right pr-2">7d interest</p>


                        <p className="text-pink text-2xl">{user.interest_1m}</p>
                        <p className="opacity-50 text-right pr-2">1m interest</p>

                    </div>

                </div>
                <div className="flex flex-row m-2 p-4 items-center">
                <button className="bg-pink m-3 text-2xl text-white hover:text-pink hover:bg-transparent hover:border-black hover:border-2 rounded-xl px-2 py-1">
                    Deposit
                </button>
                <button className="bg-blue m-3 text-2xl text-white hover:text-blue hover:bg-transparent hover:border-black hover:border-2 rounded-xl px-2 py-1">
                    Withdraw
                </button>
                </div>

            </div>
        </div>
    );
}