import React, { Component } from 'react';
import gameHelpers from './gameHelpers';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    const grid = gameHelpers.createGrid();
    // CHANGE ME
    const snake = gameHelpers.snake;
    const fruit = gameHelpers.fruit;
    // CHANGE ME
    grid[snake.height][snake.position] = 'green';
    grid[fruit.height][fruit.position] = 'red';
    this.state = {
      grid,
      snake,
      fruit,
      direction: 'right',
      crashed: false
    };
    this.timer = setInterval(() => {
      if (this.state.crashed) {
        clearInterval(this.timer);
        return;
      }
      // copy of grid to change
      let gridCopy = [];
      let snakeCopy = this.state.snake;
      let fruitCopy = this.state.fruit;
      let direction = this.state.direction;

      gameHelpers.createGridCopy(gridCopy);
      gameHelpers.createBorders(gridCopy);
      gameHelpers.moveSnake(gridCopy, snakeCopy, direction);
      gameHelpers.checkWallCrash(snakeCopy, this.setState.bind(this));
      // eat fruit
      if (
        snakeCopy.height === fruitCopy.height &&
        snakeCopy.position === fruitCopy.position
      ) {
      }

      // set snake and fruit
      gridCopy[snakeCopy.height][snakeCopy.position] = 'green';
      gridCopy[fruitCopy.height][fruitCopy.position] = 'red';

      // change game data
      this.setState({
        grid: gridCopy,
        snake: snakeCopy,
        fruit: fruitCopy
      });
    }, 750);
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
        <h1 align="center">Still Building This :D</h1>
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
