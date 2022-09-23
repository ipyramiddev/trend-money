import { shortenAddress } from "hooks/formatting";
import DappLogo from "sections/dapps/DappLogo";
import { getDappImg, isDapp } from "util/dappUtils";

interface AccountProps {
    name?:string;
    addr: string | any
}
const AccountOutline = ({name,addr}:AccountProps)=>{

    
    return (<p className="account-outline text-center">{isDapp(addr) ? (DappLogo(getDappImg(addr))) : shortenAddress(addr)}</p>)
}
export default AccountOutline

