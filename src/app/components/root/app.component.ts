import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, EventEmitter } from '@angular/core';

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
  private gameStarted: boolean = false;
  bgVideo!: ElementRef

  @ViewChild('bgVideoUnderlay')
  videoElement!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.bgVideo = this.videoElement;
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
    this.setStartGame(!state)
  }

  public increaseLevel() {
    this.level += 1;
  }

  public setStartGame(state: boolean) {
    this.gameStarted = state;
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

  public get isGameStarted() {
    return this.gameStarted;
  }

  ngOnInit(): void { }
}

