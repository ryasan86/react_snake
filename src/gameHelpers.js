// game helpers
export default {
  snake: { height: 38, position: 22 },
  fruit: { height: 40, position: 22 },
  createGrid: () => {
    let grid = [];
    for (let i = 0; i < 60; i++) {
      let row;
      // top row
      if (i === 0 || i === 59) {
        row = createGridRow('white');
        // bottom row
      } else {
        row = createGridRow('black');
      }
      row[0] = 'white'; // first column
      row[30] = 'white'; // last column
      grid.push(row);
    }
    return grid;
  },
  createGridCopy: gridCopy => {
    for (let i = 0; i < 60; i++) {
      gridCopy.push(new Array(30).fill('black'));
    }
  },
  createBorders: gridCopy => {
    for (let i = 0; i < gridCopy.length; i++) {
      for (let j = 0; j < gridCopy[i].length; j++) {
        if (
          i === 0 ||
          i === gridCopy.length - 1 ||
          j === 0 ||
          j === gridCopy[i].length - 1
        ) {
          gridCopy[i][j] = 'white';
        }
      }
    }
  },
  changeSnakeDirection: (e, direction) => {
    if (e.keyCode === 65) {
      direction = 'left';
    } else if (e.keyCode === 68) {
      direction = 'right';
    } else if (e.keyCode === 87) {
      direction = 'up';
    } else if (e.keyCode === 83) {
      direction = 'down';
    }
    return direction;
  },
  // CHANGE ME
  moveSnake: (gridCopy, snakeCopy, direction) => {
    if (direction === 'left') {
      return gridCopy[snakeCopy.height][snakeCopy.position--];
    } else if (direction === 'right') {
      return gridCopy[snakeCopy.height][snakeCopy.position++];
    } else if (direction === 'up') {
      return gridCopy[snakeCopy.height--][snakeCopy.position];
    } else if (direction === 'down') {
      return gridCopy[snakeCopy.height++][snakeCopy.position];
    }
  },
  // CHANGE ME
  checkWallCrash: (snakeCopy, setState) => {
    if (
      snakeCopy.height < 1 ||
      snakeCopy.height > 58 ||
      snakeCopy.position < 1 ||
      snakeCopy.position > 28
    ) {
      setState({ crashed: true });
    }
  }
};

// helper helpers
const createGridRow = color => {
  return new Array(30).fill(color);
};
