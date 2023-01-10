import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import ShapeGenerator from 'src/app/helpers/ShapeGenerator';
import IPosition from 'src/app/interfaces/IPosition';
import { TetrisService } from 'src/app/services/tetris.service';

@Component({
	selector: 'game-playground',
	templateUrl: './playground.component.html',
	styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, AfterViewInit {
	private gameContainer!: HTMLDivElement;
	private currentShape!: IPosition | null;
	private ROW_SIZE: number = 21;
	private COLUMN_SIZE: number = 17;
	private duration: number = 1000;
	private gameState$!: Subscription;

	@ViewChild('playgroundContainer', { static: true })
	container!: ElementRef

	constructor(private game: TetrisService) { }

	ngAfterViewInit(): void {
		const update$ = interval(this.duration)
		this.gameContainer = this.container.nativeElement;

		this.game.renderBlockMatrix(this.gameContainer, this.ROW_SIZE, this.COLUMN_SIZE);
		this.currentShape = ShapeGenerator.generateRandomBlockShape(this.COLUMN_SIZE);

		// this.gameState$ = update$.subscribe(() => {
		// 	if (this.blocks.move(this.currentShape!))
		// 		this.currentShape = ShapeGenerator.generateRandomBlockShape(this.COLUMN_SIZE);
		// })
	}

	ngOnInit(): void {
		document.addEventListener("keydown", (event: KeyboardEvent) => {
			if ((event.code === "Space" || event.code === "ArrowLeft"
				|| event.code === "ArrowRight" || event.code === "ArrowDown")
				&& (this.currentShape !== null)) {

				// switch (event.code) {
				// 	case "Space":
				// 		this.blocks.transform(this.currentShape)
				// 		break;
				// 	case "ArrowLeft":
				// 		this.blocks.shiftLeft(this.currentShape)
				// 		break;
				// 	case "ArrowRight":
				// 		this.blocks.shiftRight(this.currentShape)
				// 		break;
				// 	case "ArrowDown":
				// 		this.blocks.move(this.currentShape)
				// 		break;
				// }
			}
		})
	}
}
