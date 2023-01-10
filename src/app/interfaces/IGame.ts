import IPosition, { Point } from "./IPosition";

export interface IGame {
    shiftLeft(shapeProps: IPosition): void
    shiftRight(shapeProps: IPosition): void
    transformShape(shapeProps: IPosition): void
    descendShapeOrGenerate(shapeProps: IPosition): Boolean
}

export interface IGameState {
    isGameOver(): Boolean 
}