import IPosition, { Point } from "./IPosition";

export default interface ITetris {
    createBlock(): HTMLDivElement;
    createRowBlock(): HTMLDivElement;
    createBlockMatrix(rows: number, cols: number): Array<Array<HTMLDivElement>>;
    renderBlockMatrix(gridContainer: HTMLDivElement, rows: number, columns: number): void
    renderBlockShape(sprops: IPosition): void
    moveHorizontal(shapeProps: IPosition, step: number): void
    moveVertical(shapeProps: IPosition, step: number): void
    fillBlock({ row, col }: Point, image: string): void
    clearBlock({ row, col }: Point): void
    rotateBlock(shapeProps: IPosition): void
    transformShape(shapeProps: IPosition): void
}