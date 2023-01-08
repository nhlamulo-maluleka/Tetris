type Direction = "top" | "left" | "right" | "bottom"

export type Point = {
    row: number,
    col: number
}

export type Adjacent = {
    one: Point,
    two: Point,
    three: Point,
}

export interface ICoords {
    center: Point,
    adjacent: Adjacent
}

export default interface IPosition {
    shape: string,
    previous: ICoords | null,
    current: ICoords,
    image: string,
    rotate: Boolean,
    direction?: Direction,
    changeDirection?: {
        top: Adjacent,
        right: Adjacent,
        bottom: Adjacent,
        left: Adjacent
    }
}
