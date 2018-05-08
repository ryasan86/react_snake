export default {
  snake: { height: 10, position: 2 },
  createGrid: () => {
    let grid = [];
    for (let i = 0; i < 60; i++) {
      grid.push(new Array(30).fill('black'));
    }
    return grid;
  },
  createGridCopy: (gridCopy) => {
    for (let i = 0; i < 60; i++) {
      gridCopy.push(new Array(30).fill('black'));
    }
    return gridCopy;
  }
};
