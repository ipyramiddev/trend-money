// import React, { PureComponent } from "react";

// let data = [
//   { name: "CELO-mcUSD", value: 12, apr: 0.26, fill: "#8884d8" },
//   { name: "mcUSD-mcEUR", value: 25, apr: 0.13, fill: "#8884d8" },
//   { name: "CELO-mcEUR", apr: 0.13, value: 25, fill: "#8884d8" },
//   { name: "Group D", apr: 0.13, value: 30, fill: "#8884d8" },
// ];

// class PiePool extends React.Component {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       series: [44, 55, 41, 17, 15],
//       options: {
//         chart: {
//           type: "donut",
//         },
//         responsive: [
//           {
//             breakpoint: 480,
//             options: {
//               chart: {
//                 width: 200,
//               },
//               legend: {
//                 position: "bottom",
//               },
//             },
//           },
//         ],
//       },
//     };
//   }

//   render() {
//     return (
//       <div id="chart">
//         <PiePool
//           options={this.state.options}
//           series={this.state.series}
//           type="donut"
//         />
//       </div>
//     );
//   }
// }
