import TxnList from "./TxnList";
import UserOverview from "./UserOverview";
import WagMemeContainer from "./WagMemeContainer";

interface Props {
    userProps: UserProps;

}

const UserExplorer = ({userProps}:Props) => {
    
    return (
        <div>
        <h1>User Explorer</h1>
            <div className='flex flex-row items-center justify-center px-2'>
            <UserOverview {...userProps} />
            <TxnList txns={userProps.user.txns} address={userProps.user.address}/>

            <WagMemeContainer />
            
            </div>
        </div>
    );
    }

export default UserExplorer;