import React, { Component } from 'react';
import gameHelpers from './gameHelpers';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    const grid = gameHelpers.createGrid();
    const snakeX = gameHelpers.snakeX;
    const snakeY = gameHelpers.snakeY;
    const fruit = gameHelpers.fruit;
    grid[snakeX][snakeY] = 'green';
    grid[fruit.height][fruit.position] = 'red';
    this.state = {
      grid,
      snakeX,
      snakeY,
      fruit,
      crashed: false
    };
    this.timer = setInterval(() => {
      if (this.state.crashed) {
        clearInterval(this.timer);
        return;
      }
      // copy of grid to change
      const gridCopy = [];
      const snakeXCopy = this.state.snakeX;
      const snakeYCopy = this.state.snakeY;
      const fruitCopy = this.state.fruit;

      gameHelpers.createGrid(gridCopy);
      gameHelpers.checkWallCrash(
        snakeXCopy,
        snakeYCopy,
        this.setState.bind(this)
      );

      gridCopy[snakeXCopy][snakeYCopy] = 'green';
      gridCopy[fruitCopy.height][fruitCopy.position] = 'red';

      // change game data
      this.setState({
        grid: gridCopy,
        snakeX: snakeXCopy,
        snakeY: snakeYCopy,
        fruit: fruitCopy
      });
    }, 5000);
  }

  componentDidMount() {
    this.divFocus.focus();
  }

  handleSnakeDirection(e) {
    const { direction } = this.state;
    this.setState({
      direction: gameHelpers.changeSnakeDirection(e, direction)
    });
  }

  render() {
    return (
      <div
        className="app container"
        tabIndex="0"
        ref={div => {
          this.divFocus = div;
        }}
        onKeyDown={e => this.handleSnakeDirection(e)}
      >
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
