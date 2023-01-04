// import { type } from "os";
// import { range } from "d3";
import React, { Component } from "react";
import Chart from "react-apexcharts";

// create some lambda functions
// const deposit_value = (amount, apr_yearly, days) => {
//   return amount * (1 + apr_yearly / 100) ** (days / 365)
// }

const AreaChart = () => {
  const data = {
    series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
    }],
    options: {
        chart: {
            id: "area-chart",
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            labels: {
                show: false,
            }
        },
        yaxis: {
            labels: {
                show: false,
            }
        },
        stroke: {
            show: false,
        },
    },
  };

  return (
    <div className="p-2">
      <div className="mixed-chart text-black">
        <Chart
          options={data.options}
          series={data.series}
          type="area"
          width="250"
          colors={["#BBBBBB", "#00A8FF"]}
        />
      </div>
    </div>
  );
};

export default AreaChart;
