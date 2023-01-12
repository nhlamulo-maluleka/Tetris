import {
	Component,
	AfterViewInit, ElementRef,
	OnInit, ViewChild,
	EventEmitter, Output, Input,
	OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import ShapeGenerator from 'src/app/helpers/ShapeGenerator';
import IPosition from 'src/app/interfaces/IPosition';
import { TetrisService } from 'src/app/services/tetris.service';

@Component({
	selector: 'game-playground',
	templateUrl: './playground.component.html',
	styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, AfterViewInit, OnChanges {
	private gameContainer!: HTMLDivElement;
	private currentShape!: IPosition | null;
	private ROW_SIZE: number = 21;
	private COLUMN_SIZE: number = 17;
	private duration: number = 900;
	private gameState$!: Subscription;
	private update$!: Observable<number>;
	private totalScore: number = 0;
	private matchedBlocks!: number;
	private video!: ElementRef;
	private levelBound: number = 100;

	@Input()
	videoElement!: ElementRef;

	@Output()
	gameLevelEmitter!: EventEmitter<any>

	@Input()
	startGame: boolean = false;

	@Output()
	scoreEmitter!: EventEmitter<number>;

	@Output()
	gameOverEmitter!: EventEmitter<boolean>;

	@ViewChild('playgroundContainer', { static: true })
	container!: ElementRef

	constructor(private game: TetrisService) {
		this.scoreEmitter = new EventEmitter();
		this.gameOverEmitter = new EventEmitter();
		this.gameLevelEmitter = new EventEmitter();
	}

	ngAfterViewInit(): void {
		this.gameContainer = this.container.nativeElement;
		this.game.renderBlockMatrix(this.gameContainer, this.ROW_SIZE, this.COLUMN_SIZE);
	}

	ngOnChanges(changes: SimpleChanges) {
		const currentGameChange: SimpleChange = changes['startGame'];
		const videoElementRef: SimpleChange = changes['videoElement']

		if (videoElementRef) {
			this.video = videoElementRef.currentValue;
		}

		if (currentGameChange) {
			// Resets the Game Matrix for game replay
			if (currentGameChange.previousValue !== undefined && currentGameChange.currentValue) {
				this.game.renderBlockMatrix(this.gameContainer, this.ROW_SIZE, this.COLUMN_SIZE);
			}

			// Starts the game
			if (currentGameChange.currentValue) {
				this.currentShape = ShapeGenerator.generateRandomBlockShape(this.COLUMN_SIZE);
				this.video.nativeElement.play()
				this.beginTetris();
			}
			else if (!currentGameChange.currentValue) {
				this.gameState$?.unsubscribe();
				if (this.video) {
					this.video.nativeElement.pause();
					this.video.nativeElement.currentTime = 0;
				}
			}
		}
	}

	ngOnInit(): void {
		document.addEventListener("keydown", (event: KeyboardEvent) => {
			if ((event.code === "ArrowUp" || event.code === "ArrowLeft"
				|| event.code === "ArrowRight" || event.code === "ArrowDown")
				&& (this.currentShape !== null)) {

				switch (event.code) {
					case "ArrowUp":
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

	private beginTetris(): void {
		this.update$ = interval(this.duration)
		this.game.setGameOver(false)

		this.gameState$ = this.update$.subscribe(() => {
			if (this.game.isGameOver()) {
				this.gameOverEmitter.emit(true);
				this.totalScore = 0;
				this.levelBound = 100;
				this.gameState$.unsubscribe()
			}
			
			if (this.game.descendShapeOrGenerate(this.currentShape!)) {
				this.matchedBlocks = this.game.matchedBlocks();
				if (this.matchedBlocks > 0) {
					this.totalScore += (this.matchedBlocks * this.COLUMN_SIZE);
					this.scoreEmitter.emit(this.totalScore);

					if (this.totalScore >= this.levelBound) {
						// Resetting the counter speed
						this.gameState$.unsubscribe();

						this.duration -= 50;
						this.levelBound += this.levelBound;

						if (this.duration <= 50) {
							this.duration = 50;
						}

						// Used to invoke the increaseLevel() method in the [AppComponent]
						this.gameLevelEmitter.emit()

						// Applying the interval changes
						this.beginTetris();
					}
				}
				this.currentShape = ShapeGenerator.generateRandomBlockShape(this.COLUMN_SIZE);
			}
		})
	}
}
