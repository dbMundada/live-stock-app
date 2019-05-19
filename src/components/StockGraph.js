import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import ReactFC from 'react-fusioncharts';
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import data from './data.json';

ReactFC.fcRoot(FusionCharts, TimeSeries);

class StockGraph extends Component {
  constructor() {
    super();
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "chart-container",
        width: "100%",
        height: "500",
        dataSource: {
          chart: {},
          caption: {
            text: "Stocks Analysis"
          },
          subcaption: {
            text: "ABCD & XYZ & PQR"
          },
          series: "Type",
          yaxis: [
            {
              plot: "Stocks Value",
              title: "Stock Value",
              format: {
                prefix: "$"
              }
            }
          ]
        }
      }
    };
  }

  componentDidMount() {
    const schema = [{
      name: "Time",
      type: "date",
      format: "%d-%b-%y"
    }, {
      name: "Type",
      type: "string"
    }, {
      name: "Stocks Value",
      type: "number"
    }];
    const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
    timeseriesDs.dataSource.data = new FusionCharts.DataStore().createDataTable(data, schema);

    this.setState({ timeseriesDs });
  }
  render() {
    // let { stocks } = this.props;

    return (
      <div className="margin-top">
        <ReactFC {...this.state.timeseriesDs} />
      </div>
    );
  }
}

export default StockGraph;
