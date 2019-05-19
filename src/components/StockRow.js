import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import StockTrendChart from './StockTrendChart';
class StockRow extends Component {

  getStockValueColor = (trend) => {
    if(trend === 1){
      return 'red';
    } else if(trend === 0){
      return 'green';
    } else {
      return '#212529';
    }
  }

  render() {
    let { stock } = this.props;
    const color = this.getStockValueColor(stock.trend);
    return (
        <tr>
          <td>{stock.name.toUpperCase()}</td>
          <td style={{ color: color }}>{stock.value.toFixed(2)}</td>
          <td><StockTrendChart history={stock.history} color={color}/></td>
          <td>
            <TimeAgo date={ stock.lastModified } />
          </td>
        </tr>
    );
  }
}

export default StockRow;
