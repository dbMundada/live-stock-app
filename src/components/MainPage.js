import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import StockList from './StockList';
import StockAnalysis from './StockAnalysis';
import { API } from './../common/api';
/*
  stocks : {
    TEST: {
      name: 'TEST',
      value: '',
      trend: 0/1/2,
      isSelected: false,
      lastModified: '',
      history: [
        { value: 12, time: '' }
      ]
    }
  }
*/

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      stocks: {},
      historyData: {}
    };
  }

  getTrend = (curr, prev) => {
    if (curr > prev) {
      return 0;
    } else if (prev > curr) {
      return 1;
    }
    return 2;
  }

  onNewMsgReceived(event) {
    const { stocks, historyData } = this.state;
    let newstocks = JSON.parse(event.data);
    const timeStamp = Date.now();

    historyData[timeStamp] = [];

    newstocks.forEach(stock => {
      const stockName = stock[0].toUpperCase();
      const stockVal  = stock[1];

      historyData[timeStamp].push([ stockName, stockVal ]);

      if (stocks[stockName]) {
        let history = stocks[stockName].history;

        history.push([stocks[stockName].value, stocks[stockName].lastModified]);

        stocks[stockName] = {
          name: stockName,
          value: stockVal,
          trend: this.getTrend(stockVal, stocks[stockName].value),
          lastModified: timeStamp,
          isSelected: true,
          history: history
        };

      } else {
        stocks[stockName] = {
          name: stockName,
            value: stockVal,
          trend: 2,
          lastModified: timeStamp,
          isSelected: true,
          history: []
        };
      }
    });

    this.setState({
      stocks: stocks,
      historyData: historyData
    });
  }

  componentDidMount() {
    console.log(API.LIVE_STOCK_URL);
    this.socket = new WebSocket(API.LIVE_STOCK_URL);
    this.socket.onmessage = this.onNewMsgReceived.bind(this);
    this.socket.onclose = (err) => {
      console.log('OnClose: ', err);
      this.setState({ error: true });
    };

  }

  clearAllData = () => {
    this.setState({
      stocks: {},
      historyData: {},
    });
  }

  render() {
    const { stocks, historyData } = this.state;
    return (
      <Row>
        <StockAnalysis stocks={stocks} historyData={historyData} />
        <StockList stocks={stocks} clearAllData={this.clearAllData}/>
      </Row>
    );
  }
}

export default MainPage;
