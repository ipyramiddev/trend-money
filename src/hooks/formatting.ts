
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
        
    if( num<1000 ){
    return (num/1).toFixed(1)
    };
}

export const format_date = (date:number) => {
    if (date === null) {
        return '-';
    }
    const d = new Date(date*1000);
    // + d.toLocaleTimeString().slice(0, -3);
    return  d.toLocaleDateString().slice(0, -5)
    

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
    
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - date.getTime())));
    // console.log("seconds",date);
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    // console.log("hours", minutes)
    return hours + " hours ago";
  }