import IPosition, { Point } from "./IPosition";

export interface IGame {
    shiftLeft(shapeProps: IPosition): void
    shiftRight(shapeProps: IPosition): void
    transformShape(shapeProps: IPosition): void
    descendShapeOrGenerate(shapeProps: IPosition): Boolean
}

export interface IGameState {
    isBottom(shapeProps: IPosition): Boolean
    isValidShift({ col }: Point): Boolean
    isBlockEmpty({ row, col }: Point): Boolean
    isStacked(shapeProps: IPosition): Boolean
    isGameOver(): Boolean
}