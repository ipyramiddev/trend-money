// import {useQuery} from '@apollo/react-hooks';
// import {gql} from '@apollo/client';
// import {BigNumber} from 'ethers';
// import UbeIcon from './UbeIcon';
// // import {UBE_SUBGRAPH} from utils;

// const UBESwap_OVERVIEW_QUERY = gql`
//     query GetUniv2Overview {
//         ubeswapDayDatas(orderBy: id, orderDirection: desc, first: 1) {
//             id
//             dailyVolumeUSD
//             txCount
//             totalVolumeUSD
//             totalLiquidityUSD
//             token0 {
//                 id
//                 name
//         }

//     }
// `;

// // const



// function PlatformOverview(){
//     const { loading, error, data } = useQuery(UBESwap_OVERVIEW_QUERY);
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error :( {error.toString()}</p>;
//     return (
//         <div className='bg-opacity-20 bg-white rounded-lg p-2 m-2'>
//             {/* <div className='absolute top-0 right-0 p-2'>
//                 <UbeIcon />
//                 </div> */}
//             {data.ubeswapDayDatas.map((ube,i)=>{
//                 return(
//                     <div>
//                         <p className='text-2xl p-2'> UBESWAP OVERVIEW </p>
//                         <p>{ube.id}</p>
//                         <p>{ube.dailyVolumeUSD}</p>
//                         <p>{ube.txCount}</p>
//                         <p>{ube.totalVolumeUSD}</p>
//                         <p>{ube.totalLiquidityUSD}</p>
                    
//                     </div>
//                 )
//             })}
//         </div>
//     )

// }

// export default PlatformOverview;