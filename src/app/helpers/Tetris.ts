import ITetris from "../interfaces/ITetris";

export abstract class Tetris implements ITetris {
    protected blockMatrix!: Array<Array<HTMLDivElement>>;

    constructor() {
        this.blockMatrix = new Array<Array<HTMLDivElement>>();
    }

    createBlock(): HTMLDivElement {
        const block: HTMLDivElement = document.createElement('div');
        block.classList.add("block");
        block.dataset['filled'] = String(false);
        return block;
    }

    createRowBlock(): HTMLDivElement {
        let rowBlock: HTMLDivElement = document.createElement('div');
        rowBlock.classList.add("rowBlock")
        return rowBlock;
    }

    createBlockMatrix(rowSize: number, columnSize: number): Array<Array<HTMLDivElement>> {
        for (let row = 0; row < rowSize; row++) {
            this.blockMatrix.push(new Array<HTMLDivElement>());

            for (let col = 0; col < columnSize; col++) {
                this.blockMatrix[row].push(this.createBlock());
            }
        }
        return this.blockMatrix;
    }

    abstract renderBlockMatrix(playgound: HTMLDivElement, rows: number, columns: number): void;
}