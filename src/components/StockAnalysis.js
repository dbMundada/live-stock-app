import React, { Component } from 'react';
import { Container, Col, Navbar, Button } from 'react-bootstrap';
import LiveGraph from './LiveGraph';
import OfflineGraph from './OfflineGraph';

class StockRow extends Component {
  state = {
    isLiveGraphs: false
  };

  toggleLiveData = () => {
    const { isLiveGraphs } = this.state;
    this.setState({
      isLiveGraphs: !isLiveGraphs
    });
  }

  render() {
    const { isLiveGraphs } = this.state;
    const { stocks, historyData } = this.props;
    return (
      <Col md="7">
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="#">
              <Button variant="success"
                size="sm"
                onClick={this.toggleLiveData}>
                {isLiveGraphs ? 'Live Data' : 'Offline Data'}
              </Button>
              &nbsp;&nbsp;&nbsp;Analysis
            </Navbar.Brand>
          </Container>
        </Navbar>
        {
            isLiveGraphs
            ? <LiveGraph stocks={stocks} historyData={historyData}/>
            : <OfflineGraph stocks={stocks} historyData={historyData}/>
        }
      </Col>
    );
  }
}

export default StockRow;
