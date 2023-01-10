import { Injectable } from '@angular/core';
import TetrisGame from '../helpers/TetrisGame';
import ShapeGenerator from '../helpers/ShapeGenerator';
import IPosition, { Adjacent, Point } from '../interfaces/IPosition';

@Injectable()
export class BlockService extends TetrisGame{
	// private blockMatrix!: Array<Array<HTMLDivElement>>;

	constructor() {
		super();
		// this.blockMatrix = new Array<Array<HTMLDivElement>>();
	}

	// private createBlock(): HTMLDivElement {
	// 	const block: HTMLDivElement = document.createElement('div');
	// 	block.classList.add("block");
	// 	block.dataset['filled'] = String(false);
	// 	return block;
	// }

	// public createRowBlock() {
	// 	let row: HTMLDivElement = document.createElement('div');
	// 	row.classList.add("blockRow")
	// 	return row;
	// }

	// public createBlockMatrix(rows: number, cols: number): void {
	// 	for (let row = 0; row < rows; row++) {
	// 		this.blockMatrix.push(new Array<HTMLDivElement>());
	// 		for (let col = 0; col < cols; col++) {
	// 			this.blockMatrix[row].push(this.createBlock());
	// 		}
	// 	}
	// }

	// public drawBlockMatrix(playgound: HTMLDivElement, rows: number, columns: number): void {
	// 	this.createBlockMatrix(rows, columns);
	// 	// Reseting the playground
	// 	playgound.innerHTML = ''

	// 	for (let row of this.matrixBlock) {
	// 		let rowBlock: HTMLDivElement = this.createRowBlock();

	// 		for (let col of row) {
	// 			rowBlock.appendChild(col);
	// 		}
	// 		playgound.appendChild(rowBlock);
	// 	}
	// }

	public get matrixBlock(): Array<Array<HTMLDivElement>> {
		return this.blockMatrix;
	}

	public blockImage({ row, col }: Point, image: string): void {
		this.matrixBlock[row][col].style.backgroundImage = `url(../../../assets/blocks/${image})`;
		this.matrixBlock[row][col].style.backgroundSize = 'cover'
		this.matrixBlock[row][col].dataset['filled'] = String(true);
	}

	public resetBlock({ row, col }: Point): void {
		this.matrixBlock[row][col].style.background = 'none'
		this.matrixBlock[row][col].style.background = 'rgb(17, 16, 16)'
		this.matrixBlock[row][col].dataset['filled'] = String(false);
	}

	public drawBlock(sprops: IPosition): void {
		const { image, current: { center, adjacent: { one, two, three } } } = sprops;

		if (center) {
			this.blockImage(center, image);
			this.blockImage(one, image);
			this.blockImage(two, image);
			this.blockImage(three, image);
		}
	}

	public setPrevious(sprops: IPosition): void {
		sprops.previous = sprops.current;
	}

	public clearPreviousState(sprops: IPosition): void {
		const { previous, current: { center } } = sprops;

		if (previous) {
			// Clear the previous state
			const { adjacent: { one, two, three } } = previous;

			this.resetBlock(center)
			this.resetBlock(one)
			this.resetBlock(two)
			this.resetBlock(three)
		}
	}

	public transform(sprops: IPosition): void {
		const { rotate } = sprops;

		if (rotate) {
			this.setPrevious(sprops)

			this.clearPreviousState(sprops)

			const { direction } = sprops;
			// Set New State
			switch (direction) {
				case "top":
					// Rotate Right
					this.rotateBlock(sprops)
					sprops.direction = "right"
					break;
				case "right":
					// Rotate Bottom
					this.rotateBlock(sprops)
					sprops.direction = "bottom"
					break;
				case "bottom":
					// Rotate Left
					this.rotateBlock(sprops)
					sprops.direction = "left"
					break;
				case "left":
					// Rotate Top
					this.rotateBlock(sprops)
					sprops.direction = "top"
					break;
			}

			this.drawBlock(sprops)
		}
	}

	public rotateBlock(sprops: IPosition): void {
		if (sprops.changeDirection) {
			const { changeDirection: { top, bottom, right, left }, direction } = sprops;

			const changeObject: Adjacent = (direction === 'top' ? right : direction === 'right' ? bottom : direction === 'bottom' ? left : top);

			sprops.current.adjacent.one.row += changeObject.one.row;
			sprops.current.adjacent.one.col += changeObject.one.col;

			sprops.current.adjacent.two.row += changeObject.two.row;
			sprops.current.adjacent.two.col += changeObject.two.col;

			sprops.current.adjacent.three.row += changeObject.three.row;
			sprops.current.adjacent.three.col += changeObject.three.col;
		}
	}

	public shift(sprops: IPosition, step: number) {
		sprops.current.center.col += step
		sprops.current.adjacent.one.col += step
		sprops.current.adjacent.two.col += step
		sprops.current.adjacent.three.col += step
	}

	public isValidShift({ col }: Point): Boolean {
		if (col >= 0 && col < this.matrixBlock[0].length)
			return true;
		else return false;
	}

	public shiftLeft(sprops: IPosition): void {
		this.setPrevious(sprops)
		this.clearPreviousState(sprops);

		this.shift(sprops, -1)

		const { current: { center, adjacent: { one, two, three } } } = sprops;

		if (!(this.isValidShift(center) && this.isValidShift(one) && this.isValidShift(two) && this.isValidShift(three)))
			this.shift(sprops, +1)

		this.drawBlock(sprops)
	}

	public shiftRight(sprops: IPosition): void {
		this.setPrevious(sprops)
		this.clearPreviousState(sprops);

		this.shift(sprops, +1)

		const { current: { center, adjacent: { one, two, three } } } = sprops;

		if (!(this.isValidShift(center) && this.isValidShift(one) && this.isValidShift(two) && this.isValidShift(three)))
			this.shift(sprops, -1)

		this.drawBlock(sprops)
	}

	public down(sprops: IPosition, step: number): void {
		sprops.current.center.row += step
		sprops.current.adjacent.one.row += step
		sprops.current.adjacent.two.row += step
		sprops.current.adjacent.three.row += step
	}

	public isBottom(sprops: IPosition): boolean {
		const { current: { center, adjacent: { one, two, three } } } = sprops;

		const bottom: number = this.matrixBlock.length;

		if (center.row >= bottom
			|| one.row >= bottom
			|| two.row >= bottom
			|| three.row >= bottom) {
			return true;
		}
		return false;
	}

	public isBlockEmpty({ row, col }: Point): Boolean {
		if (this.matrixBlock[row][col].dataset['filled'] === String(false)) return true;
		return false;
	}

	public isStacked(sprops: IPosition): Boolean {
		const { current: { center, adjacent: { one, two, three } } } = sprops;

		if (this.isBlockEmpty(center) && this.isBlockEmpty(one)
			&& this.isBlockEmpty(two) && this.isBlockEmpty(three)) {
			return false;
		}
		return true;
	}

	public move(sprops: IPosition): Boolean {
		this.setPrevious(sprops)
		this.clearPreviousState(sprops);

		this.down(sprops, +1)

		// Check if the block has reached the bottom
		if (this.isBottom(sprops) || this.isStacked(sprops)) {
			this.down(sprops, -1)
			this.drawBlock(sprops)
			console.log("Generate...")
			return true;
		} else {
			this.drawBlock(sprops)
			console.log("Continue...")
			return false;
		}
	}
}
