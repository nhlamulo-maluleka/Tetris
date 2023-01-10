import IPosition, { Point } from "../interfaces/IPosition";
import { IGame, IGameState } from "../interfaces/IGame";
import { Tetris } from "./Tetris";

export default class TetrisGame extends Tetris implements IGame, IGameState {
    gameOver: Boolean = false;

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

        if (!(this.isValidShift(center) && this.isValidShift(one) && this.isValidShift(two) && this.isValidShift(three)))
            this.moveHorizontal(shapeProps, +1)

        this.renderBlockShape(shapeProps)
    }

    public shiftRight(shapeProps: IPosition): void {
        this.setPreviousState(shapeProps)
        this.clearPreviousState(shapeProps);
        this.moveHorizontal(shapeProps, +1)

        const { current: { center, adjacent: { one, two, three } } } = shapeProps;

        if (!(this.isValidShift(center) && this.isValidShift(one) && this.isValidShift(two) && this.isValidShift(three)))
            this.moveHorizontal(shapeProps, -1)

        this.renderBlockShape(shapeProps)
    }

    public descendShapeOrGenerate(shapeProps: IPosition): Boolean {
        this.setPreviousState(shapeProps)
        this.clearPreviousState(shapeProps);
        this.moveVertical(shapeProps, +1)

        // Check if the block has reached the bottom
        if (this.isBottom(shapeProps) || this.isStacked(shapeProps)) {
            this.moveVertical(shapeProps, -1)
            this.renderBlockShape(shapeProps)
            return true;
        } else {
            this.renderBlockShape(shapeProps)
            console.log("Continue...")
            return false;
        }
    }

    /**
     * @brief The following section contains the available game states
     * @title GAME_STATES
     */
    isBottom(shapeProps: IPosition): Boolean {
        const { current: { center, adjacent: { one, two, three } } } = shapeProps;

        const bottom: number = this.blockMatrix.length;

        if (center.row >= bottom
            || one.row >= bottom
            || two.row >= bottom
            || three.row >= bottom) {
            return true;
        }
        return false;
    }

    isValidShift({ col }: Point): Boolean {
        if (col >= 0 && col < this.blockMatrix[0].length)
            return true;
        else return false;
    }

    isBlockEmpty({ row, col }: Point): Boolean {
        if (this.blockMatrix[row][col].dataset['filled'] === String(false))
            return true;
        return false;
    }

    isStacked(shapeProps: IPosition): Boolean {
        const { current: { center, adjacent: { one, two, three } } } = shapeProps;

        if (this.isBlockEmpty(center) && this.isBlockEmpty(one)
            && this.isBlockEmpty(two) && this.isBlockEmpty(three)) {
            return false;
        }
        return true;
    }

    public isGameOver(): Boolean {
        return this.gameOver;
    }
}