import IPosition, { Point } from "../interfaces/IPosition";
import ITetris from "../interfaces/ITetris";

export abstract class Tetris implements ITetris {
    protected blockMatrix!: Array<Array<HTMLDivElement>>;

    constructor() {}

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
        this.blockMatrix = new Array<Array<HTMLDivElement>>();
        
        for (let row = 0; row < rowSize; row++) {
            this.blockMatrix.push(new Array<HTMLDivElement>());

            for (let col = 0; col < columnSize; col++) {
                this.blockMatrix[row].push(this.createBlock());
            }
        }
        return this.blockMatrix;
    }

    moveHorizontal(shapeProps: IPosition, step: number): void {
        shapeProps.current.center.col += step
        shapeProps.current.adjacent.one.col += step
        shapeProps.current.adjacent.two.col += step
        shapeProps.current.adjacent.three.col += step
    }

    moveVertical(shapeProps: IPosition, step: number): void {
        shapeProps.current.center.row += step
        shapeProps.current.adjacent.one.row += step
        shapeProps.current.adjacent.two.row += step
        shapeProps.current.adjacent.three.row += step
    }
    
    fillBlock({ row, col }: Point, image: string): void {
        this.blockMatrix[row][col].style.backgroundImage = `url(../../../assets/blocks/${image})`;
        this.blockMatrix[row][col].style.backgroundSize = 'cover'
        this.blockMatrix[row][col].dataset['filled'] = String(true);
    }
    
    clearBlock({ row, col }: Point): void {
        this.blockMatrix[row][col].style.background = 'none'
        this.blockMatrix[row][col].style.background = 'rgb(19, 9, 9)'
        this.blockMatrix[row][col].dataset['filled'] = String(false);
    }

    public getBlockMatrix(){
        return this.blockMatrix;
    }
    
    // For rendering the grid matrix 
    abstract renderBlockMatrix(gridContainer: HTMLDivElement, rows: number, columns: number): void;
    abstract rotateBlock(shapeProps: IPosition): void
    abstract transformShape(shapeProps: IPosition): void
    abstract renderBlockShape(sprops: IPosition): void
}
