import { dapps } from "data/dapps/dapp_data";


export const dapp_map = () => {
    const mp = new Map(dapps.map(i => [i.address||"0x0x",{name:i.name,image:i.image}]));
    return mp
  }
  
  export const getDappImg = (address:string ) => {
    const dm = dapp_map()
    const img = dm.get(address)?.image
    if (img){
      return img
    }
    return "APT"
  }

  export const dappByName = (name:string)=>{
    const name_map = new Map(dapps.map(i => [i.name||"0x0x",{name:i.name,image:i.image}]));
    const dp = name_map.get(name);
    // if(dp){
      return dp
    // }
    // return {}
  }