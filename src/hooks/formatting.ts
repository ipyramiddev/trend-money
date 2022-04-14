// function format_tvl(tvl) {
//     if (tvl === null) {
//         return '-';
//     }
//     tvl = tvl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return "$" + tvl;
// }



// export const format_apy(apy){
//     // Return apy as a percentage
//     if (apy === null) {
//         return '-';
//     }
//     return apy.toFixed(2)*100 + "%";


// }

export const shortenAddress = (
    account: string | null,
    truncation: number = 4
  ) => {
    if (!account) {
      return "0x????...????";
    }
    return (
      account.slice(0, truncation + 2) +
      ".." +
      account.slice(account.length - truncation - 1, account.length)
    );
  };