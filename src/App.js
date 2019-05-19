import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import './App.css';
import RenderStockList from './components/RenderStockList';
import StockGraph from './components/StockGraph';
import { API } from './common/api';


class App extends Component {
  /*
    stocks : {
      TEST: {
        name: 'TEST',
        value: '',
        trend: 0/1/2,
        lastModified: '',
        history: [
          { value: 12, time: '' }
        ]
      }
    }
  */

  constructor() {
    super();
    this.state = {
      stocks: {}
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
    const { stocks } = this.state;
    let newstocks = JSON.parse(event.data);

    newstocks.forEach(stock => {
      const stockName = stock[0];
      const stockVal  = stock[1];
      const timeStamp = Date.now();

      if (stocks[stockName]) {
        let history = stocks[stockName].history;
        history.push(stocks[stockName].value, stocks[stockName].timeStamp);

        stocks[stockName] = {
          name: stockName,
          value: stockVal,
          trend: this.getTrend(stockVal, stocks[stockName].value),
          lastModified: timeStamp,
          history: history
        };

      } else {
        stocks[stockName] = {
          name: stockName,
          value: stockVal,
          trend: 2,
          lastModified: timeStamp,
          history: []
        };
      }
    });

    this.setState({
      stocks: stocks
    });
  }

  componentDidMount() {
    console.log(API.LIVE_STOCK_URL);
    this.socket = new WebSocket(API.LIVE_STOCK_URL);
    this.socket.onmessage = this.onNewMsgReceived.bind(this);
    this.socket.onclose = (err) => {
      console.log('OnClose: ', err);
      // this.setState({connectionError: true});
    };

  }

  renderStocks() {

  }

  render() {
    const { stocks } = this.state;
    return [
      <head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"/>
      </head>,
      <Row>
        <Col md="7">
          <Navbar expand="lg" variant="dark" bg="dark">
            <Container>
              <Navbar.Brand href="#">
                <Button variant="success" size="sm">Live Data</Button>
                &nbsp;&nbsp;&nbsp;Analysis
              </Navbar.Brand>
            </Container>
          </Navbar>
          <StockGraph stocks={stocks}/>
        </Col>
        <Col md="5">
          <RenderStockList stocks={stocks}/>
        </Col>
      </Row>
    ];
  }
}

export default App;
