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
	private duration: number = 500;
	private gameState$!: Subscription;

	@ViewChild('playgroundContainer', { static: true })
	container!: ElementRef

	constructor(private game: TetrisService) { }

	ngAfterViewInit(): void {
		const update$ = interval(this.duration)
		this.gameContainer = this.container.nativeElement;

		this.game.renderBlockMatrix(this.gameContainer, this.ROW_SIZE, this.COLUMN_SIZE);
		this.currentShape = ShapeGenerator.generateRandomBlockShape(this.COLUMN_SIZE);

		this.gameState$ = update$.subscribe(() => {
			if(this.game.isGameOver()) this.gameState$.unsubscribe()

			if (this.game.descendShapeOrGenerate(this.currentShape!))
				this.currentShape = ShapeGenerator.generateRandomBlockShape(this.COLUMN_SIZE);
		})
	}

	ngOnInit(): void {
		document.addEventListener("keydown", (event: KeyboardEvent) => {
			if ((event.code === "Space" || event.code === "ArrowLeft"
				|| event.code === "ArrowRight" || event.code === "ArrowDown")
				&& (this.currentShape !== null)) {

				switch (event.code) {
					case "Space":
						this.game.transformShape(this.currentShape)
						break;
					case "ArrowLeft":
						this.game.shiftLeft(this.currentShape)
						break;
					case "ArrowRight":
						this.game.shiftRight(this.currentShape)
						break;
					case "ArrowDown":
						this.game.descendShapeOrGenerate(this.currentShape)
						break;
				}
			}
		})
	}
}
