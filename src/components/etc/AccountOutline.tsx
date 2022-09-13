interface AccountProps {
    name?:string;
    addr: string | any
}
const AccountOutline = ({name,addr}:AccountProps)=>{
    return (<p className="account-outline text-center">{name}</p>)
}
export default AccountOutline

