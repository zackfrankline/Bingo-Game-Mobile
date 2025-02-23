const row: number[] = new Array(5).fill(0);
const col: number[] = new Array(5).fill(0);
let win = 5;
const diagonal: number[] = new Array(2).fill(0);

interface Cell {
  value: number;
  x: number;
  y: number;
  color: string;
}

export const checkers = (userCell: Cell) => {
  let x = userCell.x; // row
  let y = userCell.y; //col
  if (row[x] + 1 == 5) {
    row[x]++;
    win--;
  } else {
    row[x]++;
    console.log(row[x]);
  }
  if (col[y] + 1 == 5) {
    col[y]++;
    win--;
  } else col[y]++;

  if (x == y && diagonal[0] + 1 == 5) {
    diagonal[0]++;
    win--;
  } else if (x == y) {
    diagonal[0]++;
  }

  if (x + y == 4 && diagonal[1] + 1 == 5) {
    diagonal[1]++;
    win--;
  } else if (x + y == 4) diagonal[1]++;

  console.log("win remaining for bingo: " + win);
  if (win == 0) alert("User Wins");
};
