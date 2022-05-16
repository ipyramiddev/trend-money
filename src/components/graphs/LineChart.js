// import { type } from "os";
import { range } from "d3";
import React, { Component } from "react";
import Chart from "react-apexcharts";

// create some lambda functions

// create time series example
const initial_amounts = [100, 200, 300]

// const yearly_to_monthly = () => {

const days_series = range(0, 10)
const amount = initial_amounts[0]
const apr_yearly = 0.1
const days = 100
const celo_price = 2.32
const deposit_value = (amount, apr_yearly, days) => {
  return amount * (1 + apr_yearly / 100) ** (days / 365)
}

// create list of celo prices with center at current price
const celo_prices = range(0, 5, 0.5);
console.log(celo_prices)


class PvChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "",
          type: 'line',
          height: 350,

        },
        theme: {
          mode: 'dark',
          pallet: 'pallet10',
        },
        grid: {
          show: false
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            // inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: []
          }
        },
        // tool
        xaxis: {
          categories: celo_prices,
          title: {
            text: 'Celo Price(USD)'
          },
        },
        yxis: {
          title: {
            text: 'Deposit Value(USD)'
          }
        },
      },
        series: [
          {
            name: "celo-price",
            type: "line",
            data: celo_prices
          }
        ]
    }
  }

  render() {
        return (
          <div className="p-2">
            <div className="row">
              <div className="mixed-chart text-black">
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="line"
                  width="300"
                  colors={["#ffffff"]}
                />
              </div>
            </div>
          </div>
        );
      }
    }

    export default PvChart;