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
    snake.forEach(segment => {
      gameHelpers.createSnakeSegment(grid, segment);
    });
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
      const gridCopy = [];
      const snakeCopy = this.state.snake;
      const fruitCopy = this.state.fruit;
      const direction = this.state.direction;

      gameHelpers.createGridCopy(gridCopy);
      gameHelpers.createBorders(gridCopy);
      snakeCopy.forEach(segment => {
        gameHelpers.moveSnakeSegment(gridCopy, segment, direction);
      });
      gameHelpers.checkWallCrash(snakeCopy, this.setState.bind(this));

      // console.log(
      //   `height: ${snakeCopy[0].height} position: ${snakeCopy[0].position}`
      // );
      if (
        snakeCopy[0].height === fruitCopy.height &&
        snakeCopy[0].position === fruitCopy.position
      ) {
        console.log('eat fruit');
      }

      snakeCopy.forEach(segment => {
        gridCopy[segment.height][segment.position] = 'green';
      });
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
