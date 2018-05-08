import React, { Component } from 'react';
import gameHelpers from './gameHelpers';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    let grid = gameHelpers.createGrid();
    let snake = gameHelpers.snake;
    grid[snake.height][snake.position] = 'green';

    this.state = {
      grid,
      snake
    };

    this.timer = setInterval(() => {
      // copy of grid to change
      let gridCopy = [];
      let snakeCopy = this.state.snake;

      gameHelpers.createGridCopy(gridCopy);
      // create borders
      gameHelpers.createBorders(gridCopy);

      gridCopy[snakeCopy.height][snakeCopy.position] = 'green';
      // change game data
      this.setState({
        grid: gridCopy,
        snake: snakeCopy
      });
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
