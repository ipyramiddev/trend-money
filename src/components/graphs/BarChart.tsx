// import { type } from "os";
// import { range } from "d3";
import React, { Component } from "react";
import Chart from "react-apexcharts";

// create some lambda functions
// const deposit_value = (amount, apr_yearly, days) => {
//   return amount * (1 + apr_yearly / 100) ** (days / 365)
// }

const BarChart = () => {
  const data = {
    series: [
      {
        name: "Net Profit",
        data: [440, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 250,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 3,
        // colors: ['transparent']
      },
      xaxis: {
        categories: ["Jul", "Aug", "Sep", "Oct"],
      },
      yaxis: {
        title: {
          text: "Volume",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };

  return (
    <div className="p-2">
      <div className="mixed-chart text-black" id="chart">
        <Chart
          options={data}
          series={data.series}
          type="bar"
          width="300"
          colors={["#BBBBBB", "#00A8FF", "#00A8FF"]}
        />
      </div>
    </div>
  );
};

export default BarChart;
