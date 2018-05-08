import React, { Component } from 'react';
import gameHelpers from './gameHelpers';
import './App.css';
// components
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      grid: gameHelpers.grid()
    }
  }

  render() {
    return (
      <div>
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
