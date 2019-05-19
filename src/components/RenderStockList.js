import React from 'react';
import { Navbar, Table, Container, Button } from 'react-bootstrap';
import StockRow from './StockRow';

const RenderStockList = (props) => {
  const { stocks } = props;

  return [
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand style={{width: "100%"}}>
          Stocks Listing &nbsp;
          <Button variant="light" size="sm" style={{float: "right"}}>Clear Data</Button>
        </Navbar.Brand>
      </Container>
    </Navbar>,
    <Table hover={true}>
      <thead>
        <tr>
          <th>Stock</th>
          <th>Current Price</th>
          <th>History</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
      {
        Object.keys(stocks).map((stock_name, index) => {
            const stock = stocks[stock_name];
            return (
              <StockRow stock={stock} key={stock.name}/>
            );
        })
      }
      </tbody>
    </Table>
  ];
};

export default RenderStockList;
