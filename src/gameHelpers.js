// game helpers
export default {
  createGrid: (grid = []) => {
    for (let i = 0; i < 40; i++) {
      grid.push(createGridRow('black'));
    }
    return grid;
  },
  createCell: (cell, x, y) => {
    let style = {
      width: '1rem',
      height: '1rem'
    };
    // wall
    if (x === 0 || x === 29 || y === 0 || y === 39) {
      cell = 'white';
    }

    style.border = 'black 1px solid';
    style.backgroundColor = cell;
    return {
      cell,
      style
    };
  },
  updateTail: (length, tailXCopy, tailYCopy, snakeXCopy, snakeYCopy) => {
    for (let i = length; i > 0; i--) {
      tailXCopy[i] = tailXCopy[i - 1];
      tailYCopy[i] = tailYCopy[i - 1];
    }
    tailXCopy[0] = snakeXCopy;
    tailYCopy[0] = snakeYCopy;
  },
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
    };
  },
  setDirection: (e, direction) => {
    const key = e.keyCode;
    if (key === 65 && direction !== 'right') {
      direction = 'left';
    } else if (key === 68 && direction !== 'left') {
      direction = 'right';
    } else if (key === 87 && direction !== 'down') {
      direction = 'up';
    } else if (key === 83 && direction !== 'up') {
      direction = 'down';
    }
    return direction;
  },
  checkWallCollision: (snakeXCopy, snakeYCopy, setState) => {
    if (
      snakeYCopy < 1 ||
      snakeYCopy > 38 ||
      snakeXCopy < 1 ||
      snakeXCopy > 28
    ) {
      setState({ gameOver: true });
    }
  },
  checkFruitCollision: (
    gridCopy,
    lengthCopy,
    snakeXCopy,
    snakeYCopy,
    fruitCopy,
    scoreCopy
  ) => {
    if (snakeXCopy === fruitCopy.position && snakeYCopy === fruitCopy.height) {
      lengthCopy += 1;
      scoreCopy += 5;
      fruitCopy = createFruit(gridCopy, fruitCopy);
    }
    return { lengthCopy, scoreCopy, fruitCopy };
  }
};

// helper helpers
const createGridRow = color => {
  return new Array(30).fill(color);
};

const random = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createFruit = (gridCopy, fruitCopy, isBlackCell = false) => {
  while (isBlackCell === false) {
    let randHeight = random(38, 1);
    let randPosition = random(28, 1);
    if (gridCopy[randHeight][randPosition] === 'black') {
      fruitCopy.height = randHeight;
      fruitCopy.position = randPosition;
      isBlackCell = true;
    }
  }
  return fruitCopy;
};
