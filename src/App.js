import React, { Component } from 'react';
import gameHelpers from './gameHelpers';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    // initialize grid
    const grid = gameHelpers.createGrid();
    this.state = {
      grid,
      length: 0,
      snakeX: 2,
      snakeY: 2,
      tailX: [this.snakeX],
      tailY: [this.snakeY],
      fruit: { height: 30, position: 22 },
      direction: 'right',
      crashed: false,
      score: 0
    };
    const { snakeX, snakeY, fruit } = this.state;

    grid[snakeY][snakeX] = 'green';
    grid[fruit.height][fruit.position] = 'red';

    this.timer = setInterval(() => {
      if (this.state.crashed) {
        clearInterval(this.timer);
        return;
      }
      // copy of game settings to set state at each interval
      const gridCopy = [];
      const { length, snakeX, snakeY, tailX, tailY, fruit, direction, score } = this.state;
      let lengthCopy = length;
      let snakeXC = snakeX;
      let snakeYC = snakeY;
      let tailXCopy = tailX;
      let tailYCopy = tailY;
      let fruitCopy = fruit;
      let scoreCopy = score;
      let setState = this.setState.bind(this);

      // map
      gameHelpers.createGrid(gridCopy);
      // update tail
      gameHelpers.updateTail(lengthCopy, tailXCopy, tailYCopy, snakeXC, snakeYC);
      // update snake
      let { snakeXCopy, snakeYCopy } = gameHelpers.updatePosition(direction, snakeXC, snakeYC);
      // check for wall collision
      gameHelpers.checkWallCrash(snakeXCopy, snakeYCopy, setState);
      // check for collisions with self
      /* TODO */
      // check for collisions with fruit

      tailXCopy.forEach((segment, i) => {
        gridCopy[tailYCopy[i]][segment] = 'green';
      });
      gridCopy[snakeYCopy][snakeXCopy] = 'green';
      gridCopy[fruitCopy.height][fruitCopy.position] = 'red';

      this.setState({
        grid: gridCopy,
        length: lengthCopy,
        snakeX: snakeXCopy,
        snakeY: snakeYCopy,
        tailX: tailXCopy,
        tailY: tailYCopy,
        fruit: fruitCopy,
        score: scoreCopy
      });
    }, 100);
  }

  componentDidMount() {
    this.divFocus.focus();
  }

  handleKeyPress(e) {
    const { direction } = this.state;
    this.setState({
      direction: gameHelpers.setDirection(e, direction)
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
        onKeyDown={e => this.handleKeyPress(e)}
      >
        <h1 align="center">Score: {this.state.score}</h1>
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
