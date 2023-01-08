import { AfterViewInit, Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import IPosition from 'src/app/interfaces/IPosition';
import { BlockService } from 'src/app/services/block.service';

type validKeys = "Space" | "ArrowLeft" | "ArrowRight" | "ArrowDown" | null

@Component({
  selector: 'game-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, AfterViewInit {
  private playgroundRef!: HTMLDivElement;
  private currentShape!: IPosition | null;
  private ROW_SIZE: number = 25;
  private COLUMN_SIZE: number = 20;
  private movementDuration: number = 500;
  private timer!: NodeJS.Timeout;

  @ViewChild('playgroundContainer', { static: true })
  playgound!: ElementRef

  constructor(private blocks: BlockService) { }

  public startGame(): void {
    this.currentShape = this.blocks.generateBlockShape();

    this.timer = setInterval(() => {
      if (this.blocks.move(this.currentShape!)) {
        // Reset current object
        this.currentShape = null;

        // Clearing the Interval
        this.stopGame();

        // Restarting the Interval
        this.startGame();
      }
    }, this.movementDuration)
  }

  public stopGame(): void {
    clearInterval(this.timer);
  }

  ngAfterViewInit(): void {
    this.playgroundRef = this.playgound.nativeElement;
    this.blocks.drawBlockMatrix(this.playgroundRef, this.ROW_SIZE, this.COLUMN_SIZE);
    this.startGame();
  }

  ngOnInit(): void {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if ((event.code === "Space" || event.code === "ArrowLeft"
        || event.code === "ArrowRight" || event.code === "ArrowDown")
        && (this.currentShape !== null)) {
        switch (event.code) {
          case "Space":
            this.blocks.transform(this.currentShape)
            break;
          case "ArrowLeft":
            this.blocks.shiftLeft(this.currentShape)
            break;
          case "ArrowRight":
            this.blocks.shiftRight(this.currentShape)
            break;
          case "ArrowDown":
            this.blocks.move(this.currentShape)
            break;
        }
      }
    })
  }
}
