import React, { Component } from 'react';
import gameHelpers from './gameHelpers';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    const { createGrid, length, snakeX, snakeY, tailX, tailY, fruit, direction, crashed } = gameHelpers;
    const grid = createGrid();

    this.state = {
      grid,
      length,
      snakeX,
      snakeY,
      tailX,
      tailY,
      fruit,
      direction: 'right',
      crashed: false
    };

    grid[fruit.height][fruit.position] = 'red';
    grid[snakeY][snakeX] = 'green';

    this.timer = setInterval(() => {
      if (this.state.crashed) {
        clearInterval(this.timer);
        return;
      }
      // copy of game settings to change
      const gridCopy = [];
      const { length, snakeX, snakeY, tailX, tailY, fruit, direction } = this.state;
      const lengthCopy = length;
      let snakeXCopy = snakeX;
      let snakeYCopy = snakeY;
      let tailXCopy = tailX;
      let tailYCopy = tailY;
      const fruitCopy = fruit;

      // create map
      gameHelpers.createGrid(gridCopy);
      /********** START **********/
      
      // update tail
      gameHelpers.updateTail(lengthCopy, tailXCopy, tailYCopy, snakeXCopy, snakeYCopy);
      // set the last segment of the tail to black before moving snake
      snakeXCopy = gameHelpers.updatePosition(direction, snakeXCopy, null)
        .snakeXCopy;
      snakeYCopy = gameHelpers.updatePosition(direction, null, snakeYCopy)
        .snakeYCopy;

      for (let i = 0; i < tailXCopy.length; i++) {
        if (tailXCopy[i] && tailYCopy[i]) {
          gridCopy[tailYCopy[i]][tailXCopy[i]] = 'green';
        }
      }
      // update position

      gridCopy[snakeYCopy][snakeXCopy] = 'green';
      gridCopy[fruitCopy.height][fruitCopy.position] = 'red';

      /********** END ***********/


      this.setState({
        grid: gridCopy,
        length: lengthCopy,
        snakeX: snakeXCopy,
        snakeY: snakeYCopy,
        tailX: tailXCopy,
        tailY: tailYCopy,
        fruit: fruitCopy
      });
    }, 750);
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
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
