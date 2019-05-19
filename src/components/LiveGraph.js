import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class LiveGraph extends Component {

  generateGraphData(selectedKeys, historyData) {
    const data = Object.keys(historyData).map((timestamp, index) => {
      const dateObj = new Date(timestamp * 1000);
      let obj = {
        name: dateObj.toLocaleTimeString()
      };

      historyData[timestamp].forEach(item => {
        if (selectedKeys.indexOf(item[0])) {
          obj[item[0]] = parseInt(item[1], 10);
        }
      });
      return obj;
    });
    return data;
  }

  render() {
    const { stocks, historyData } = this.props;
    const selectedKeys = Object.keys(stocks).map(item => item);
    const data = this.generateGraphData(selectedKeys, historyData);

    return (
      <div className="margin-top">
        <LineChart
          width={750}
          height={450}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {
            selectedKeys.map((key, index) => (
              <Line type="monotone" dataKey={key} stroke="#8884d8" />
            ))
          }
        </LineChart>
      </div>
    );
  }
}

export default LiveGraph;
