// game helpers
export default {
  createGrid(grid = []) {
    for (let i = 0; i < 25; i++) {
      grid.push(createGridRow('black'));
    }
    return grid;
  },
  updateTail(length, tailXCopy, tailYCopy, snakeXCopy, snakeYCopy) {
    for (let i = length; i > 0; i--) {
      tailXCopy[i] = tailXCopy[i - 1];
      tailYCopy[i] = tailYCopy[i - 1];
    }
    tailXCopy[0] = snakeXCopy;
    tailYCopy[0] = snakeYCopy;
  },
  updatePosition(direction, snakeXCopy, snakeYCopy) {
    if (direction === 'right') {
      snakeXCopy++;
    } else if (direction === 'left') {
      snakeXCopy--;
    } else if (direction === 'down') {
      snakeYCopy++;
    } else if (direction === 'up') {
      snakeYCopy--;
    }
    return {
      snakeXCopy,
      snakeYCopy
    };
  },
  setDirection(e, direction) {
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
  checkWallCollision(snakeXCopy, snakeYCopy, setState) {
    if (snakeYCopy < 1 || snakeYCopy > 23 || snakeXCopy < 1 || snakeXCopy > 23) {
      setState({ gameOver: true });
    }
  },
  checkSelfCollision(snakeXCopy, snakeYCopy, tailXCopy, tailYCopy, setState) {
    tailXCopy.forEach((segment, i) => {
      if (segment === snakeXCopy && tailYCopy[i] === snakeYCopy) {
        setState({ gameOver: true });
      }
    });
  },
  checkFruitCollision(gridCopy, lengthCopy, snakeXCopy, snakeYCopy, fruitCopy, scoreCopy) {
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
  return new Array(25).fill(color);
};

const random = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createFruit = (gridCopy, fruitCopy, isBlackCell = false) => {
  /* THIS DOES NOT WORK */
  while (isBlackCell === false) {
    let randHeight   = random(22, 2);
    let randPosition = random(22, 2);

    if (gridCopy[randHeight][randPosition] === 'black') {
      fruitCopy.height   = randHeight;
      fruitCopy.position = randPosition;
      isBlackCell        = true;
    }
  }
  return fruitCopy;
};
