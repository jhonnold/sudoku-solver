export default class Sudoku {
  private board: Array<Array<number>>;

  constructor(input: string) {
    this.board = new Array(9);
    for (let i = 0; i < 9; i++)
      this.board[i] = new Array(9);

    input.split('').forEach((c, i) => {
      const row = Math.floor(i / 9);
      const col = i % 9;

      if (c !== '.') {
        this.board[row][col] = parseInt(c);
      } else {
        this.board[row][col] = 0;
      }
    });
  }

  toString(): string {
    return this.board.map(row => row.join('')).join('');
  }

  solve(): boolean {
    return this.recursiveSolve(0, 0);
  }

  private recursiveSolve(row: number, col: number): boolean {
    if (row === 8 && col === 9) return true;
    if (col === 9) row++, col = 0;

    if (this.board[row][col] !== 0)
      return this.recursiveSolve(row, col + 1);

    for (let i = 1; i <= 9; i++) {
      if (this.isValidNewPlacement(row, col, i)) {
        this.board[row][col] = i;
        if (this.recursiveSolve(row, col + 1))
          return true;
        this.board[row][col] = 0;
      }
    }

    return false;
  }

  private isValidNewPlacement(row: number, col: number, val: number): boolean {
    if (this.board[row].includes(val)) return false;
    if (this.board.map(r => r[col]).includes(val)) return false;

    const boxRow = row - (row % 3);
    const boxCol = col - (col % 3);
    for (let i = boxRow; i < boxRow + 3; i++)
      for (let j = boxCol; j < boxCol + 3; j++)
        if (this.board[i][j] === val) return false;

    return true;
  }
}
