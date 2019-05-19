import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import ReactFC from 'react-fusioncharts';
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import data from './../assets/data.json';

ReactFC.fcRoot(FusionCharts, TimeSeries);

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

class OfflineGraph extends Component {
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
            text: "MSFT & EVA"
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

  generateGraphData(selectedKeys, historyData) {
    const data = [];
    Object.keys(historyData).forEach((timestamp, index) => {
      const dateObj = new Date(timestamp * 1000);
      let dateStr = dateObj.toLocaleTimeString();
      historyData[timestamp].forEach(item => {
        if (selectedKeys.indexOf(item[0])) {
          let arrItem = [dateStr];
          arrItem.push(item[0]);
          arrItem.push(parseInt(item[1], 10));
          data.push(arrItem);
        }
      });
    });
    return data;
  }


  componentDidMount() {
    const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
    timeseriesDs.dataSource.data = new FusionCharts.DataStore().createDataTable(data, schema);
    this.setState({ timeseriesDs });
  }

  render() {
    const { stocks, historyData } = this.props;
    const selectedKeys = Object.keys(stocks).map(item => item);
    const data = this.generateGraphData(selectedKeys, historyData);

    return (
      <div className="margin-top">
        <ReactFC {...this.state.timeseriesDs} />
      </div>
    );
  }
}

export default OfflineGraph;
