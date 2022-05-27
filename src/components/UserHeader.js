import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';

const UBE_USER_QUERY = gql`
    query GetubeUser($user_address: String) {
        users(where: {id: $user_address} limit: 1) {
            id
            liquidityPositions
            usdSwapped
        }
    }
`;

// const UBE_USER_QUERY = gql`
//     query GetubeUser($user_address: String) {
//         users(where: {id: $user_address} limit: 1) {
//             id
//             liquidityPositions {
//                 id
//                 pair {
//                     id
//                     volumeUSD
//                     token0 {
//                         id
//                         name
//                         symbol
//                         decimals
//                         derivedCUSD
//                     }
//                     token1 {
//                         id
//                         name
//                         symbol
//                         decimals
//                         derivedCUSD
//                     }
//                 }
//             }
//         }
//     }
// `;



function UserHeader(user) {
    console.log("user address", user.address);
    const { loading, error, data } = useQuery(UBE_USER_QUERY, {
        variables: {
            user_address: user.walletAddress
        }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;
    console.log(data);



    return (
            <div className="flex flex-col p-3 m-3  bg-white rounded-lg text-left justify-between bg-opacity-20">
                <p className="text-lg sm:text-xs opacity-70">Welcome back</p>
                <p className="text-2xl sm:text-lg text-yellow1">{user.walletAddress}</p>
                <p className="text-lg sm:text-xs opacity-70">{data.users[0].usdSwapped} USD</p>
                
            </div>
            )
}
export default UserHeader;