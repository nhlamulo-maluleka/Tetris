import { Tetris } from "./Tetris";

export default class TetrisGame extends Tetris {
    constructor() {
        super();
    }

    public override renderBlockMatrix(playgound: HTMLDivElement, rows: number, columns: number): void {
        // Reseting the playground
        playgound.innerHTML = ''

        for (let row of this.createBlockMatrix(rows, columns)) {
            let rowBlock: HTMLDivElement = this.createRowBlock();

            for (let col of row) {
                rowBlock.appendChild(col);
            }
            playgound.appendChild(rowBlock);
        }
    }
}