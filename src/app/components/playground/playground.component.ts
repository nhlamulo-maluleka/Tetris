import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
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
	private update$!: Observable<number>;
	private totalScore: number = 0;
	private matchedBlocks!: number;

	@Output()
	scoreEmitter!: EventEmitter<number>; 

	@ViewChild('playgroundContainer', { static: true })
	container!: ElementRef

	constructor(private game: TetrisService) { 
		this.scoreEmitter = new EventEmitter();
	}

	private startGame(gridContainer: HTMLDivElement): void {
		this.update$ = interval(this.duration)
		this.game.setGameOver(false)

		this.game.renderBlockMatrix(this.gameContainer, this.ROW_SIZE, this.COLUMN_SIZE);
		this.currentShape = ShapeGenerator.generateRandomBlockShape(this.COLUMN_SIZE);

		this.gameState$ = this.update$.subscribe(() => {
			if (this.game.isGameOver()) {
				this.gameState$.unsubscribe()

				this.startGame(gridContainer)
			}

			if (this.game.descendShapeOrGenerate(this.currentShape!)) {
				this.matchedBlocks = this.game.matchedBlocks();
				if(this.matchedBlocks > 0){
					this.totalScore += (this.matchedBlocks * 5);
					this.scoreEmitter.emit(this.totalScore);
				}
				this.currentShape = ShapeGenerator.generateRandomBlockShape(this.COLUMN_SIZE);
			}
		})	
	}

	ngAfterViewInit(): void {
		this.gameContainer = this.container.nativeElement;
		this.startGame(this.gameContainer);
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
