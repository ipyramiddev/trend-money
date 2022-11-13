// returns portion of the total liquidity traded within the last 24 hours 0.01 = 1%
export const effective_cap_ratio = (volume:number, reserve:number) => {
    return (volume / reserve).toFixed(2);
}
