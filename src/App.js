import React, { Component } from 'react';
import gameHelpers from './gameHelpers';
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
      fruit: { height: 15, position: 15 },
      direction: 'right',
      gameOver: false,
      score: 0
    };
    const { snakeX, snakeY, fruit } = this.state;

    grid[snakeY][snakeX] = '#0099ff';
    grid[fruit.height][fruit.position] = 'red';

    this.timer = setInterval(() => {
      // copy of game settings to set state at each interval
      const { length, snakeX, snakeY, tailX, tailY, fruit, direction, score, gameOver } = this.state;
      if (gameOver) {
        clearInterval(this.timer);
        return;
      }
      const setState = this.setState.bind(this);
      const gridCopy = gameHelpers.createGrid();
      let lengthCopy = length;
      let snakeXCopy = snakeX;
      let snakeYCopy = snakeY;
      let tailXCopy = tailX;
      let tailYCopy = tailY;
      let fruitCopy = fruit;
      let scoreCopy = score;

      // update tail
      gameHelpers.updateTail(lengthCopy, tailXCopy, tailYCopy, snakeXCopy, snakeYCopy);
      // update snake
      ({ snakeXCopy, snakeYCopy } = gameHelpers.updatePosition(direction, snakeXCopy, snakeYCopy, setState));
      // check for wall collision
      gameHelpers.checkWallCollision(snakeXCopy, snakeYCopy, setState);
      // check for collisions with self
      gameHelpers.checkSelfCollision(snakeXCopy, snakeYCopy, tailXCopy, tailYCopy, setState);
      // check for collisions with fruit
      ({ lengthCopy, scoreCopy, fruitCopy } = gameHelpers.checkFruitCollision(gridCopy, lengthCopy, snakeXCopy, snakeYCopy, fruitCopy, scoreCopy));
      
      tailXCopy.forEach((segment, i) => {
        gridCopy[tailYCopy[i]][segment] = '#0099ff';
      });
      gridCopy[snakeYCopy][snakeXCopy] = '#0099ff';
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
    let resume = <h1 align="center">Score: {this.state.score}</h1>;
    let gameOver = (
      <div align="center">
        <h1>Final Score: {this.state.score}</h1>
      </div>
    );

    return (
      <div
        className="app container"
        tabIndex="0"
        ref={div => {
          this.divFocus = div;
        }}
        onKeyDown={e => this.handleKeyPress(e)}>
        {this.state.gameOver ? gameOver : resume}
        <Grid grid={this.state.grid} />
      </div>
    );
  }

}

export default App;
