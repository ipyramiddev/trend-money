import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import TokenStack from './TokenStack';
import Stat from './Stat';

const UBE_USER_QUERY = gql`
    query GetubeUser($user_address: String) {
        users(where: {id: $user_address} limit: 1) {
            id
            liquidityPositions {
                id
                pair{
                    totalSupply
                    reserveUSD
                token0 {
                    id
                    name
                    symbol
                }
                token1 {
                    id
                    name
                    symbol
                }
            }
                liquidityTokenBalance
            }
            usdSwapped
        }
    }
`;
function LiqidityPosition(position){

    const value = position.liquidityTokenBalance * (position.pair.reserveUSD/position.pair.totalSupply);
    return (<div className="flex flex-row gap-1 items-center justify-between">
        <TokenStack tokens={[position.pair.token0.symbol, position.pair.token1.symbol]} />
        <p className="text-xl">{position.liquidityTokenBalance}</p>
        
        <Stat format={true} name="~val USD" value={value} unit="$"  />
        <p>{JSON.stringify(position.pair.token0.symbol)}</p>

    </div>)
}

function UserHeader(user) {
    console.log("user address", user.address);
    const { loading, error, data } = useQuery(UBE_USER_QUERY, {
        variables: {
            user_address: user.walletAddress
        }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;
    // console.log(data);
    const userData = data.users[0];



    return (
        <div className="flex flex-col p-3 m-3  bg-white rounded-lg text-left justify-between bg-opacity-20">
            <p className="text-lg sm:text-xs opacity-70">Welcome back</p>
            <p className="text-2xl sm:text-lg text-yellow1">{user.walletAddress}</p>
            
            {userData.liquidityPositions.map((position, i) => {
                return <LiqidityPosition key={i} {...position} />
            }
            )}
            <p className="text-lg sm:text-xs opacity-70 text-right">{data.users[0].usdSwapped} USD swapped</p>

        </div>
    )
}
export default UserHeader;