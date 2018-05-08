export default {
  grid: () => {
    let grid = [];
    for (let i = 0; i < 90; i++) {
      grid.push(new Array(30).fill('black'));
    }
    return grid;
  }
};
