const ube_fee = 0.0025 // 0.0025% fee that liquidity providers earn

export const fees24hour = (vol24hUSD:number, totalLiquidity:number) => {
    console.log("vol24hUSD", vol24hUSD)
    const fees = (vol24hUSD * ube_fee) / totalLiquidity
    console.log("fees", fees)
    return {
        "usd_24h_return": ((vol24hUSD*ube_fee)),
        "fee_percent": (ube_fee * 100).toFixed(2)
    }

}
export const yearlyReturn = (vol24hUSD:number, totalLiquidity:number) => {
    const fee24 = fees24hour(vol24hUSD, totalLiquidity)
    const yearly = ((((fee24.usd_24h_return+1.0) ** 365)-1)*100)
    return yearly.toFixed(6)
}

// returns portion of the total liquidity traded within the last 24 hours 0.01 = 1%
export const effective_cap_ratio = (volume:number, reserve:number) => {
    return (volume / reserve).toFixed(2);
}

