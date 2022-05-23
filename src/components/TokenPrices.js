import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import { BigNumber } from 'ethers';
import MobiIcon from './MobiIcon';

const TOKEN_PRICES_QUERY = gql`
    query GetTokens{
        
            tokens(first: 10, orderBy: totalLiquidity, orderDirection: asc) {
              name
              symbol
              totalLiquidity
              tradeVolumeUSD
            }
    }
`;

// name
// decimals
// derivedCUSD
// tradeVolumeUSD
export default function TokenPrices(props) {
    const { loading, error, data } = useQuery(TOKEN_PRICES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.toString()}</p>;
    // find tokens with highest trade volumes
    return data.tokens.map((token, i) => {
        return (<div className="flex flex-row justify-between gap-2 p-2 outline outline-dashed outline-2 my-4 mx-2 rounded-lg">
            <div>
                {token.name}
                <p>{token.symbol}</p>
            </div>
            <div>
                <p>${Math.trunc(token.tradeVolumeUSD)}</p>
                tot. vol
            </div>
            <div>
                <p>{token.totalLiquidity}</p>
                <p> total Liquidity </p>
            </div>
            <div>
                <p>{token.txCount}</p>
                <p> tx count </p>
            </div>
            <div>
                <p>{token.totalSupply}</p>
                <p> total supl. </p>
            </div>
            <MobiIcon href={`/token/${token.id}`} />

            {/* {token.decimals} */}
        </div>)

    });
}