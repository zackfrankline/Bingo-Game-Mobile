import { Cell } from "../types/Cell";



export const createEmptyCell = (x: number, y: number): Cell => ({
    value: 0,
    x,
    y,
    color: "#F0FFF0",
  });

const userCellData: Cell[] = [];

for (let x = 0; x < 5; x++) {
  for (let y = 0; y < 5; y++) {
    userCellData.push(createEmptyCell(x, y));
  }
}

export default userCellData;

