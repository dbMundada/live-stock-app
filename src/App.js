import React, { Component } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './components/MainPage';

class App extends Component {
  render() {
    return [
      <head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"/>
      </head>,
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    ];
  }
}

export default App;
