import IPosition, { Point } from "../interfaces/IPosition";

/**
 * @brief A singleton class which provides a single instance into the 
 * @class ErrorsAndBounds
 */
export class ErrorsAndBounds {
    private blockMatrix!: Array<Array<HTMLDivElement>>;

    constructor(matrix: Array<Array<HTMLDivElement>>) {
        this.blockMatrix = matrix;
    }

    public isTop(shapeProps: IPosition): Boolean {
        const { current: { center, adjacent: { one, two, three } } } = shapeProps;

        const bound: number = 0;

        if (center.row <= bound
            || one.row <= bound
            || two.row <= bound
            || three.row <= bound) {
            return true;
        }
        return false;
    }

    public isBottom(shapeProps: IPosition): Boolean {
        const { current: { center, adjacent: { one, two, three } } } = shapeProps;

        const bottomBound: number = this.blockMatrix.length;

        if (center.row >= bottomBound
            || one.row >= bottomBound
            || two.row >= bottomBound
            || three.row >= bottomBound) {
            return true;
        }
        return false;
    }

    public isValidShift({ col }: Point): Boolean {
        if (col >= 0 && col < this.blockMatrix[0].length)
            return true;
        else return false;
    }

    public isBlockEmpty({ row, col }: Point): Boolean {
        if (this.blockMatrix[row][col].dataset['filled'] === String(false))
            return true;
        return false;
    }

    public isStacked(shapeProps: IPosition): Boolean {
        const { current: { center, adjacent: { one, two, three } } } = shapeProps;

        if (this.isBlockEmpty(center) && this.isBlockEmpty(one)
            && this.isBlockEmpty(two) && this.isBlockEmpty(three)) {
            return false;
        }
        return true;
    }
}