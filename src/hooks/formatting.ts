// function format_tvl(tvl) {
//     if (tvl === null) {
//         return '-';
//     }
//     tvl = tvl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return "$" + tvl;
// }

export const format_large_number = (num:number) => {
    if (num === null) {
        return '-';
    }
    if( num>=1000000000 ){
        return (num/1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if( num>=1000000 ){
        return (num/1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if( num>=1000 ){
        return (num/1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

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