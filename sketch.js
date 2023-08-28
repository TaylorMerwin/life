function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;

function setup() {
  let canvas = createCanvas(1000, 1000);

  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //Random assortment of 1's and 0's
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(29, 36, 51); // Set background to dark blue

  noStroke();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) {
        //if alive, color spot yellow
        fill(255, 213, 124);
        rect(x, y, resolution, resolution);
      }
    }
  }

  let next = make2DArray(cols, rows);
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //current state for tile
      let state = grid[i][j];

      //Edge cases
      if (i == 0 || i == cols - 1 || (j == 0) | (j == rows - 1)) {
        //persistant edges
        next[i][j] = state;
      } else {
        //Count live neighbors
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);

        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
  }

  //Update the grid
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      sum += grid[x + i][y + j];
    }
  }
  sum -= grid[x][y];
  return sum;
}
