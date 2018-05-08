// game helpers
export default {
  snake: { height: 10, position: 2 },
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
  }
};

// helper helpers
const createGridRow = color => {
  return new Array(30).fill(color);
};
