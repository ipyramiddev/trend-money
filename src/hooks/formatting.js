function format_tvl(tvl) {
    if (tvl === null) {
        return '-';
    }
    tvl = tvl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + tvl;
}



function format_apy(apy){
    // Return apy as a percentage
    if (apy === null) {
        return '-';
    }
    return apy.toFixed(2)*100 + "%";


}