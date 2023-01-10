import IPosition from "../interfaces/IPosition";
import Shapes from "./Shapes";

export default class ShapeGenerator extends Shapes {
    public static generateRandomBlockShape(colSize: number): IPosition {
        const index = Math.floor(Math.random() * this.getBlockShapes(1, Number(colSize / 2) | 0).length)
        return this.getBlockShapes(1, Number(colSize / 2) | 0)[index];
    }
}