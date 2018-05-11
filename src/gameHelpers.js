// game helpers
export default {
  length: 2,
  snakeX: 2,
  snakeY: 2,
  tailX: [this.snakeX],
  tailY: [this.snakeY],
  fruit: { height: 40, position: 22 },
  updateTail: () => {},
  updatePosition: (direction, snakeXCopy, snakeYCopy) => {
    if (direction === 'right') {
      snakeXCopy++;
    } else if (direction === 'left') {
      snakeXCopy--;
    } else if (direction === 'up') {
      snakeYCopy--;
    } else if (direction === 'down') {
      snakeYCopy++;
    }
    return {
      snakeXCopy,
      snakeYCopy
    }
  },
  createGrid: (grid = []) => {
    for (let i = 0; i < 60; i++) {
      grid.push(createGridRow('black'));
    }
    return grid;
  },
  createCell: (cell, x, y) => {
    let style = {
      width: '0.75rem',
      height: '0.75rem'
    };
    // wall
    if (x === 0 || x === 29 || y === 0 || y === 59) {
      cell = 'white';
    }

    style.border = 'black 1px solid';
    style.backgroundColor = cell;
    return {
      cell,
      style
    };
  },
  setDirection: (e, direction) => {
    if (e.keyCode === 65 && direction !== 'right') {
      direction = 'left';
    } else if (e.keyCode === 68 && direction !== 'left') {
      direction = 'right';
    } else if (e.keyCode === 87 && direction !== 'down') {
      direction = 'up';
    } else if (e.keyCode === 83 && direction !== 'up') {
      direction = 'down';
    }
    return direction;
  },
  checkWallCrash: (snakeX, snakeY, setState) => {
    if (snakeY < 1 || snakeY > 58 || snakeX < 1 || snakeX > 28) {
      setState({ crashed: true });
    }
  }
};

// helper helpers
const createGridRow = color => {
  return new Array(30).fill(color);
};
