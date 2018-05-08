import React, { Component } from 'react';
import gameHelpers from './gameHelpers';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    let grid = gameHelpers.createGrid()
    let snake = gameHelpers.snake;

    this.state = {
      // starting grid
      grid,
      // starting snake
      snake
    };


    this.timer = setInterval(() => {
      
      // copy of grid to change
      let gridCopy = [];
      gameHelpers.createGridCopy(gridCopy)
      // create borders
      for (let i = 0; i < gridCopy.length; i++) {
        for (let j = 0; j < gridCopy[i].length; j++) {
          if (i === 0) {
            gridCopy[i][j] = 'white'
          }
        }
      }

      // change game data
      this.setState({
        grid: gridCopy
      })
    }, 750);
  }

  render() {
    return (
      <div className="app container">
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
