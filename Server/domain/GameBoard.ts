import { FiveLineWinRule, WinRule } from "./BingoChecker";

export class GameBoard {
  private readonly grid: Array<number>;
  //stores cellNumber -> Index map in grid
  private readonly valueIndexMap: Map<number, number>;
  private readonly checker: WinRule;

  constructor(grid: Array<number>) {
    this.grid = grid;
    this.valueIndexMap = new Map<number, number>();
    this.checker = new FiveLineWinRule();
    //mark the grid cells with corresponding index
    this.markValueIndexMap();
  }

  private markValueIndexMap() {
    this.grid.forEach((cell, index) => {
      this.valueIndexMap.set(cell, index);
    });
  }

  public getChecker() {
    return this.checker;
  }

  public markCellInGrid(cellNumber: number) {
    const index = this.valueIndexMap.get(cellNumber) as number;
    const row = index / 5;
    const col = index % 5;
    return this.markCheckerHash(row, col);
  }

  private markCheckerHash(row: number, col: number) {
    const rowCount = this.checker.markRow(row);
    const colCount = this.checker.markCol(col);
    const diagonalCount = this.checker.markDiagonal(row, col);
    return rowCount + colCount + diagonalCount;
  }
}
