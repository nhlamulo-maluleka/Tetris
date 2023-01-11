import IPosition, { Adjacent, Point } from "../interfaces/IPosition";
import { IGame, IGameState } from "../interfaces/IGame";
import { Tetris } from "./Tetris";
import { ErrorsAndBounds } from "./ErrorsAndBounds";

export default class TetrisGame extends Tetris implements IGame, IGameState {
    private gameOver: boolean = false;
    private errorBound!: ErrorsAndBounds;

    constructor() {
        super();
    }

    public override renderBlockMatrix(gridContainer: HTMLDivElement, rows: number, columns: number): void {
        // Reseting the playground
        gridContainer.innerHTML = ''

        for (let row of this.createBlockMatrix(rows, columns)) {
            let rowBlock: HTMLDivElement = this.createRowBlock();

            for (let col of row) {
                rowBlock.appendChild(col);
            }
            gridContainer.appendChild(rowBlock);
        }

        /**
         * @brief Instantiating the ErrorsAndBounds class after creating the 
         * @param blockMatrix and keeping the reference for later use in the errors class.
         */
        this.errorBound = new ErrorsAndBounds(this.blockMatrix);
    }

    public override renderBlockShape(shapeProps: IPosition): void {
        const { image, current: { center, adjacent: { one, two, three } } } = shapeProps;

        if (center) {
            this.fillBlock(center, image);
            this.fillBlock(one, image);
            this.fillBlock(two, image);
            this.fillBlock(three, image);
        }
    }

    public override transformShape(shapeProps: IPosition): void {
        const { rotate } = shapeProps;

        if (rotate) {
            this.setPreviousState(shapeProps)
            this.clearPreviousState(shapeProps)

            const { direction } = shapeProps;

            switch (direction) {
                case "top":
                    // Rotate Right
                    this.rotateBlock(shapeProps)
                    shapeProps.direction = "right"
                    break;
                case "right":
                    // Rotate Bottom
                    this.rotateBlock(shapeProps)
                    shapeProps.direction = "bottom"
                    break;
                case "bottom":
                    // Rotate Left
                    this.rotateBlock(shapeProps)
                    shapeProps.direction = "left"
                    break;
                case "left":
                    // Rotate Top
                    this.rotateBlock(shapeProps)
                    shapeProps.direction = "top"
                    break;
            }

            this.renderBlockShape(shapeProps)
        }
    }

    setPreviousState(shapeProps: IPosition): void {
        shapeProps.previous = shapeProps.current;
    }

    clearPreviousState(shapeProps: IPosition): void {
        const { previous, current: { center } } = shapeProps;

        if (previous) {
            // Clear the previous state
            const { adjacent: { one, two, three } } = previous;

            this.clearBlock(center)
            this.clearBlock(one)
            this.clearBlock(two)
            this.clearBlock(three)
        }
    }

    public shiftLeft(shapeProps: IPosition): void {
        this.setPreviousState(shapeProps)
        this.clearPreviousState(shapeProps);
        this.moveHorizontal(shapeProps, -1)

        const { current: { center, adjacent: { one, two, three } } } = shapeProps;

        if (!(this.errorBound.isValidShift(center)
            && this.errorBound.isValidShift(one)
            && this.errorBound.isValidShift(two)
            && this.errorBound.isValidShift(three))
            || !(this.errorBound.isBlockEmpty(center)
                && this.errorBound.isBlockEmpty(one)
                && this.errorBound.isBlockEmpty(two)
                && this.errorBound.isBlockEmpty(three))) {
            this.moveHorizontal(shapeProps, +1)
        }

        this.renderBlockShape(shapeProps)
    }

    public shiftRight(shapeProps: IPosition): void {
        this.setPreviousState(shapeProps)
        this.clearPreviousState(shapeProps);
        this.moveHorizontal(shapeProps, +1)

        const { current: { center, adjacent: { one, two, three } } } = shapeProps;

        if (!(this.errorBound.isValidShift(center) && this.errorBound.isValidShift(one)
            && this.errorBound.isValidShift(two) && this.errorBound.isValidShift(three))
            || !(this.errorBound.isBlockEmpty(center) && this.errorBound.isBlockEmpty(one)
                && this.errorBound.isBlockEmpty(two) && this.errorBound.isBlockEmpty(three))) {
            this.moveHorizontal(shapeProps, -1)
        }

        this.renderBlockShape(shapeProps)
    }

    public descendShapeOrGenerate(shapeProps: IPosition): Boolean {
        this.setPreviousState(shapeProps)
        this.clearPreviousState(shapeProps);
        this.moveVertical(shapeProps, +1)

        // Check if the block has reached the bottom
        if (this.errorBound.isBottom(shapeProps) || this.errorBound.isStacked(shapeProps)) {
            this.moveVertical(shapeProps, -1)

            if (this.errorBound.isTop(shapeProps)) {
                this.setGameOver(true)
                return true;
            }

            this.renderBlockShape(shapeProps)
            return true;
        }

        this.renderBlockShape(shapeProps)
        return false;
    }

    rotateBlock(shapeProps: IPosition): void {
        if (shapeProps.changeDirection) {
            const { changeDirection: { top, bottom, right, left }, direction } = shapeProps;

            const changeObject: Adjacent = (direction === 'top' ? right : direction === 'right' ? bottom : direction === 'bottom' ? left : top);

            shapeProps.current.adjacent.one.row += changeObject.one.row;
            shapeProps.current.adjacent.one.col += changeObject.one.col;

            shapeProps.current.adjacent.two.row += changeObject.two.row;
            shapeProps.current.adjacent.two.col += changeObject.two.col;

            shapeProps.current.adjacent.three.row += changeObject.three.row;
            shapeProps.current.adjacent.three.col += changeObject.three.col;

            const { previous, current: { center, adjacent: { one, two, three } } } = shapeProps;

            if (previous) {
                // Checking the sides....
                if (!(this.errorBound.isValidShift(center) && this.errorBound.isValidShift(one)
                    && this.errorBound.isValidShift(two) && this.errorBound.isValidShift(three))
                    || this.errorBound.isBottom(shapeProps)
                    || !(this.errorBound.isBlockEmpty(center) && this.errorBound.isBlockEmpty(one)
                        && this.errorBound.isBlockEmpty(two) && this.errorBound.isBlockEmpty(three))) {
                    shapeProps.current.adjacent.one.row -= changeObject.one.row;
                    shapeProps.current.adjacent.one.col -= changeObject.one.col;

                    shapeProps.current.adjacent.two.row -= changeObject.two.row;
                    shapeProps.current.adjacent.two.col -= changeObject.two.col;

                    shapeProps.current.adjacent.three.row -= changeObject.three.row;
                    shapeProps.current.adjacent.three.col -= changeObject.three.col;
                }
                else
                    shapeProps.direction = (direction === 'top' ? 'right' : direction === 'right' ? 'bottom' : direction === 'bottom' ? 'left' : 'top');
            }
        }
    }

    public setGameOver(state: boolean) {
        this.gameOver = state;
    }

    public isGameOver(): boolean {
        return this.gameOver;
    }

    public matchedBlocks(): number {
        // const arrSize: Array<Array<HTMLDivElement>> = ;
        let matchCount: number = 0;

        for (let rowIndex = this.blockMatrix.length - 1; rowIndex >= 0; rowIndex--) {
            /**
             * We start by assuming that the [row] is filled
             * And then attempt to prove the assumption (true | false)
             */
            let rowFilled: boolean = true;

            for (let colIndex in this.blockMatrix[rowIndex]) {
                /**
                 * If the assumption is found to be incorrect, 
                 * break the loop and try again.
                 */
                if (this.blockMatrix[rowIndex][colIndex].dataset['filled'] === String(false)) {
                    rowFilled = false;
                    break;
                }
            }

            /**
             * Assumption [correct]
             */
            if (rowFilled) {
                matchCount += 1;

                this.updateGridBlocks()

                return this.matchedBlocks();
            }
        }

        return matchCount;
    }

    public updateGridBlocks(): void {
        for (let rowIndex = this.blockMatrix.length - 1; rowIndex >= 0; rowIndex--) {
            for (let blockIndex in this.blockMatrix[rowIndex]) {
                const point: Point = { row: rowIndex, col: Number(blockIndex) }
                this.clearBlock(point)

                if (rowIndex - 1 >= 0) {
                    this.blockMatrix[rowIndex][point.col].style.backgroundImage = this.blockMatrix[rowIndex - 1][point.col].style.backgroundImage;
                    this.blockMatrix[rowIndex][point.col].style.backgroundSize = this.blockMatrix[rowIndex - 1][point.col].style.backgroundSize;
                    this.blockMatrix[rowIndex][point.col].dataset['filled'] = this.blockMatrix[rowIndex - 1][point.col].dataset['filled'];
                }
            }
        }
    }
}