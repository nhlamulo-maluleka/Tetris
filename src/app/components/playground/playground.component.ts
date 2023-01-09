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
  private ROW_SIZE: number = 23;
  private COLUMN_SIZE: number = 20;
  private movementDuration: number = 500;
  private timer!: NodeJS.Timeout;
  private isKeyed!: Boolean;

  @ViewChild('playgroundContainer', { static: true })
  playgound!: ElementRef

  constructor(private blocks: BlockService) { }

  ngAfterViewInit(): void {
    this.playgroundRef = this.playgound.nativeElement;
    this.blocks.drawBlockMatrix(this.playgroundRef, this.ROW_SIZE, this.COLUMN_SIZE);
    this.currentShape = this.blocks.generateBlockShape();
    this.isKeyed = false;

    this.startGame();
  }

  ngOnInit(): void {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if ((event.code === "Space" || event.code === "ArrowLeft"
        || event.code === "ArrowRight" || event.code === "ArrowDown")
        && (this.currentShape !== null)) {
        this.isKeyed = true;
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

  public blockComp(): void {
    if (!this.isKeyed) {
      if (this.blocks.move(this.currentShape!)) {
        // Reset current object
        this.currentShape = null;
        this.currentShape = this.blocks.generateBlockShape();
        // console.log("Inner😎😋😊...", this.currentShape)
        // return;
        // Clearing the Interval
        // this.stopGame();

        // Restarting the Interval
        // this.startGame();
      }

      this.stopGame();
      this.startGame();
    } else console.log("Keyed....😎😴😴")
  }

  public startGame(): void {
    this.timer = setTimeout(this.blockComp.bind(this), this.movementDuration);
  }

  public stopGame(): void {
    clearInterval(this.timer);
  }
}
