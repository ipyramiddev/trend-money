// import { estValue } from "../hooks/useMath";
// import { Cov } from "../types/types";

// interface GraphProps {
//     minPrice: number;
//     maxPrice: number;
// }

// const GraphOutline = ({ minPrice, maxPrice }: GraphProps) => {
//     const y_base = "230";
//     const line_length = "180";
//     const x_base = "30";
//     return (
//         <div className="graph-outline">
//             <svg width="300px" height="300px">
//                 // Vertical line on left
//                 <line x1={x_base} y1="50" x2={x_base} y2={y_base} stroke="white" strokeWidth="4" strokeLinecap="round" />
//                 <line x1={x_base} y1={y_base} x2={line_length} y2={y_base} stroke="white" strokeWidth="4" strokeLinecap="round" />
//             </svg>
//         </div>
//     )
// }

// const calcInterval = (price: number): GraphProps => {
//     return {
//         minPrice: price - price * 0.1,
//         maxPrice: price + price * 0.3,
//     }

// }

// const CovNFT = (cov: Cov) => {
//     const { strike, duration, collateral, collateralTokenSymbol, collateralTokenPrice } = cov;
//     const graphProps = calcInterval(strike);
//     return (
//         <div className=" w-80 h-100 rounded-3xl text-center text-white mx-auto  mt-10 bg-gradient-to-r p-[6px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
//             <div className="flex flex-col justify-between h-full bg-black text-white rounded-lg p-4">

//                 <h1 className="cov-header"> {collateral} {collateralTokenSymbol} @ {strike}</h1>
//                 <GraphOutline {...graphProps} />
//                 <p className="opacity-60 p-3 text-right w-full">est. val {estValue(cov)}</p>
//                 <div className="flex flex-row justify-end p-3">
//                     <img className={`w-10 h-10 rounded-full `} title={collateralTokenSymbol} src={`tokens/asset_${collateralTokenSymbol}.png`} alt={collateralTokenSymbol} />
//                     <button className="rounded-lg outline outline-2 outline-white px-4 py-2">Buy</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CovNFT;