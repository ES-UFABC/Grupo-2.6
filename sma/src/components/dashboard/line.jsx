import React, { Component } from "react";
import Chart from "react-apexcharts";
import { getReceita } from "../../middleware/servicesDashboard";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "R$",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    };
  }

  getData = async () => {
    var dados = await getReceita(localStorage.getItem("id"));
    console.log("receita", dados.data);
    this.setState({
      series: [
        {
          name: "R$",
          data: dados.data.grafico_dados.receita_mensal,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Receita Mensal - Último ano",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: dados.data.grafico_dados.categorias,
        },
      },
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <div id="chart">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={300}
            width={500}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default LineChart;
