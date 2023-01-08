import IPosition from "../interfaces/IPosition";
import Shapes from "./Shapes";

export default class ShapeGenerator extends Shapes {
    constructor(centerRow: number, centerColumn: number) {
        super(centerRow, centerColumn);
    }

    public getRandomShape(): IPosition {
        const index = Math.floor(Math.random() * this.blockShapes.length)
        return this.blockShapes[index];
    }
}