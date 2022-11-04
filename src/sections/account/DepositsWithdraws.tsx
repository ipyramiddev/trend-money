export const DepositsWithdraws = (coins: any) => {
    return (<div className="flex flex-row justify-start gap gap-4">

        <div className="user-stat">
            <p className="stat-val"> {coins.deposit_events.counter || 0} </p>
            <p> deposits </p>
        </div>
        <div className="user-stat">
            <p className="stat-val"> {coins.withdraw_events.counter || 0} </p>
            <p> withdrawls </p>
        </div>
    </div>);
};
