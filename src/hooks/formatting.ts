
import { slice } from "lodash";
// function format_tvl(tvl) {
//     if (tvl === null) {
//         return '-';
//     }
//     tvl = tvl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return "$" + tvl;
// }

// function format_apy(apy:[]) {
//     if (tvl === null) {
//         return '-';
//     }
//     tvl = tvl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return "$" + tvl;
// }

export const format_large_number = (n:number,decimals=100000000) => {
    let num = n/decimals;
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
        
    if( num<1000 ){
    return (num/1).toFixed(4)
    };
}

export const format_date = (date:number) => {
        const unix_ts = Number(date);
        const diff = (Date.now()*1000 - unix_ts)/1000000/60/60
        return diff.toFixed(1);
    

}

export const formatTimestamp = (time:string)=>{
    const unix_ts = Number(time);
    const diff = (Date.now()*1000 - unix_ts)/1000000/60/60
    return diff.toFixed(1);
}

export const parsePayloadFunction = (funct:string) => {
    
    const func = funct.split('::');
    return { addr: func[0], mod:func[1], scr: func[2], };
}

export const format_tvl = (price: number) =>{
    return "$" + format_large_number(price)
}

export const format_price = (price:number) => {
    if (price === null) {
        return '-';
    }

    return "$" + (price/1).toFixed(2);
}

export const shortenAddress = (
    account: string | null,
    truncation: number = 4
  ) => {
    if (!account) {
      return "0x????...????";
    }
    if(account.length<4){
        return account
    }
    if(account.slice(0,2)!=='0x'){
        return account
    }

    // if (account.slice(0, 2) === "0x" || account.slice(0, 3) !== "&0x") {
    //     return account;
    // }   
    return (
      account.slice(0, truncation + 2) +
      ".." +
      account.slice(account.length - truncation - 1, account.length)
    );
  };

export const formatParam = (param:string) => {
    // console.log("param",param)
    if (!param || param===undefined || param==="" ) {
        return "0x";
    }
    // try{
    if (param && param.length>1) {
        // split on ::
        // const splitt = param.split("::");
        // if(splitt.length !== 1){
        //     return shortenAddress(splitt[0]) + "::" + splitt[1] + "::" + splitt[2];   
        // }
        return shortenAddress(param);
    }
    if (param.length >= 30) {
        return shortenAddress(param);
    }
    // } catch{
    return param
    };

// primitives have no :: delimiter
// address::module::type (e.g. 0x1234::token::erc20)
export const splitType = (type:string) => {
    if (!type || type===undefined || type==="" ) {
        return {address:"0x1",module:"base",name:"empty"};
    }
    if(type.split("::").length === 1){
        return {address:"0x1",module:"base",name:type}
    }
    else{
        const splitt = type.split("::");
        if (splitt[1][0]==="<"){
            return {address:splitt[0],module:"base",name:splitt[1]}
        }
        return {address:splitt[0],module:splitt[1],name:splitt[2]}
    }
}


export const formatType = (type:string)=>{
    const spl = type.split("::",3)
    const mod = spl[1] || " "
    const act = shortenAddress(spl[0])
    
    if (spl.length>2){
    let res = spl[2]
    if(res.split("::").length>1){
       res = formatType(res.slice(res.split("::").length))
    }
    else{
        res=shortenAddress(res);
    }
    const rest = res
    
    return act+"::"+mod+"::"+rest
}
return act + "::"+mod;
}
  export const TimeAgo = (timestamp: string) => {
    // convert unix timestamp in microseconds to milliseconds
    // const date = new Date(parseInt(timestamp)/1000000000);
    
    const unix_ts = Number(timestamp);
    const diff = (Date.now()*1000 - unix_ts)/1000000/60/60
    const d =  diff.toFixed(1);
    // console.log("hours", minutes)
    return d.toString() + " hours ago";
  }