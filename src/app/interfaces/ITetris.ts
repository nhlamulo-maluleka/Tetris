export default interface ITetris {
    createBlock(): HTMLDivElement;
    createRowBlock(): HTMLDivElement;
    createBlockMatrix(rows: number, cols: number): Array<Array<HTMLDivElement>>;
    renderBlockMatrix(playgound: HTMLDivElement, rows: number, columns: number): void
}