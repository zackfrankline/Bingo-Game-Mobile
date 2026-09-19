export interface WinRule {
  hasWon(): boolean;
  markRow(index: number): number;
  markCol(index: number): number;
  markDiagonal(rowIdx: number, colIdx: number): number;
}

export class FiveLineWinRule implements WinRule {
  private readonly rowsFreq: Array<number>;
  private readonly colsFreq: Array<number>;
  private diagonal1Freq: number;
  private diagonal2Freq: number;

  constructor() {
    this.rowsFreq = new Array(5).fill(0);
    this.colsFreq = new Array(5).fill(0);
    this.diagonal1Freq = 0;
    this.diagonal2Freq = 0;
  }

  public getRowsFreq() {
    return this.rowsFreq;
  }
  public getColsFreq() {
    return this.colsFreq;
  }
  public getDiagonal1Freq() {
    return this.diagonal1Freq;
  }
  public getDiagonal2Freq() {
    return this.diagonal2Freq;
  }

  public markRow(index: number) {
    this.rowsFreq[index]++;
    return this.rowsFreq[index] == 5 ? 1 : 0;
  }

  public markCol(index: number) {
    this.colsFreq[index]++;
    return this.colsFreq[index] == 5 ? 1 : 0;
  }

  public markDiagonal(rowIdx: number, colIdx: number) {
    const isLeftDiagonal = rowIdx == colIdx;
    const isRightDiagonal = rowIdx + colIdx == 4;
    let count = 0;
    if (!isLeftDiagonal && !isRightDiagonal) {
      return 0;
    }
    if (isLeftDiagonal) {
      this.diagonal1Freq++;
      count += this.diagonal1Freq >= 5 ? 1 : 0;
    }
    if (isRightDiagonal) {
      this.diagonal2Freq++;
      count += this.diagonal2Freq >= 5 ? 1 : 0;
    }
    return count;
  }

  hasWon(): boolean {
    let count = 0;
    this.rowsFreq.forEach((value) => (count += value >= 5 ? 1 : 0));
    this.colsFreq.forEach((value) => (count += value >= 5 ? 1 : 0));
    count += this.diagonal1Freq >= 5 ? 1 : 0;
    count += this.diagonal2Freq >= 5 ? 1 : 0;
    return count >= 5;
  }
}
