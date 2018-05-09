// game helpers
export default {
  snake: [{ height: 10, position: 2 }],
  fruit: { height: 40, position: 22 },
  createSnakeSegment: (grid, segment) => {
    grid[segment.height][segment.position] = 'green';
  },
  createGrid: () => {
    const grid = [];
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
      row[29] = 'white'; // last column
      grid.push(row);
    }
    return grid;
  },
  createGridCopy: gridCopy => {
    for (let i = 0; i < 60; i++) {
      gridCopy.push(createGridRow('black'));
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
  moveSnakeSegment: (gridCopy, segment, direction) => {
    let gridPositionAndHeight;
    if (direction === 'left') {
      gridPositionAndHeight = gridCopy[segment.height][segment.position--];
    } else if (direction === 'right') {
      gridPositionAndHeight = gridCopy[segment.height][segment.position++];
    } else if (direction === 'up') {
      gridPositionAndHeight = gridCopy[segment.height--][segment.position];
    } else if (direction === 'down') {
      gridPositionAndHeight = gridCopy[segment.height++][segment.position];
    }

    return gridPositionAndHeight;
  },
  checkWallCrash: (snakeCopy, setState) => {
    if (
      snakeCopy[0].height < 1 ||
      snakeCopy[0].height > 58 ||
      snakeCopy[0].position < 1 ||
      snakeCopy[0].position > 28
    ) {
      setState({ crashed: true });
    }
  }
};

// helper helpers
const createGridRow = color => {
  return new Array(30).fill(color);
};
