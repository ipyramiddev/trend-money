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
      data: [51, 41, 20, 0, 40, 25, 40, 30, 50]
    }, {
      name: 'series2',
      data: [49, 39, 70, 50, 20, 25, 10, 28, 40]
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
      fill: {
        type: 'solid',
        colors: ["#18382E", "#4AA57A"],
        opacity: [0.5, 0.5],
      },
    },
  };

  return (
    <div className="p-8">
      <div className="mixed-chart text-black">
        <Chart
          options={data.options}
          series={data.series}
          type="area"
          width="100%"
        />
      </div>
    </div>
  );
};

export default AreaChart;
