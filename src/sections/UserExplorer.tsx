import TxnList from "./TxnList";
import UserOverview from "./UserOverview";

interface Props {
    userProps: UserProps;

}

const UserExplorer = ({userProps}:Props) => {
    
    return (
        <div>
        <h1>User Explorer</h1>
            <div className='flex flex-row items-center justify-center px-2'>
            <UserOverview {...userProps} />
            <TxnList txns={userProps.user.txns} address={"0x1d40175352316901bb8306b29a919da75f8b305f9bb9fa265f308c67cb409270"}/>
            </div>
        </div>
    );
    }

export default UserExplorer;