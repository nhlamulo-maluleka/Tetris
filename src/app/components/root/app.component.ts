import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'tetris';
  private score: number = 0;
  private level: number = 1;
  private gameOver: boolean = false;

  @ViewChild('bgvideo')
  bgvideo!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const $wait = timer(2000, 100)
    const $stream = $wait.subscribe(() => {
      this.bgvideo.nativeElement.muted = false;
      // $stream.unsubscribe();
    })
  }

  public setPlayerScore(scoreVal: number) {
    this.score = scoreVal;
  }

  public setGameState(state: boolean) {
    if (state) {
      this.score = 0;
      this.level = 1;
    }
    this.gameOver = state;
  }

  public increaseLevel() {
    this.level += 1;
  }

  public get gameLevel() {
    return this.level;
  }

  public get playerScore() {
    return this.score;
  }

  public get isGameOver() {
    return this.gameOver;
  }

  ngOnInit(): void { }
}
