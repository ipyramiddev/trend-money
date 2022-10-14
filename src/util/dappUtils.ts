import { dapps } from "data/dapps/dapp_data";


export const dapp_map = () => {
  const mp = new Map(dapps.map(i => [i.address || "0x0x", { name: i.name, image: i.image }]));
  return mp
}

export const dappsByAddress = () => {
  const addy_map = new Map(dapps.map(i => [i.address || "0x0x", { ...i}]));
  return addy_map
}


const mapped = dapp_map()
const addr_mapped = dappsByAddress();

export const getDappImg = (address: string) => {
  const dm = dapp_map()
  const img = dm.get(address)?.image
  if (img) {
    return img
  }
  return "APT"
}

export const getDappData = (address: string) => {
  if (isDapp(address)) {
    
  }
}

export const dappByName = (name: string) => {
  const name_map = new Map(dapps.map(i => [i.name || "0x0x", { ...i}]));
  const dp = name_map.get(name);
  // if(dp){
    return dp
    // }
    // return name_map.get( "aptin")
  }
  
  
  
  export const isDapp = (address: string) => {
    if (mapped.get(address)) {
      return true;
    }
    return false;
  }
  
  
