import React, { Component } from 'react';
import gameHelpers from './gameHelpers';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    const grid = gameHelpers.createGrid();
    const snake = gameHelpers.snake;
    const fruit = gameHelpers.fruit;
    grid[snake.height][snake.position] = 'green';
    grid[fruit.height][fruit.position] = 'red';
    this.state = {
      grid,
      snake,
      fruit,
      direction: 'right',
      crashed: false
    };
    console.log(grid);
    this.timer = setInterval(() => {
      // copy of grid to change
      let gridCopy = [];
      let snakeCopy = this.state.snake;
      let fruitCopy = this.state.fruit;
      let direction = this.state.direction;
      // create grid
      gameHelpers.createGridCopy(gridCopy);
      // create borders
      gameHelpers.createBorders(gridCopy);

      gameHelpers.moveSnake(gridCopy, snakeCopy, direction);

      // check crash
      for (let i = 0; i < gridCopy.length; i++) {
        for (let j = 0; j < gridCopy[i].length; j++) {
          
        }
      }

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
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
