import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tetris';
  private score: number = 0;
  private level: number = 1;

  constructor() { }

  public setPlayerScore(scoreVal: number){
    this.score = scoreVal;
  }

  public increaseLevel(){
    this.level += 1;
  }

  public get gameLevel(){
    return this.level;
  }

  public get playerScore(){
    return this.score;
  }

  ngOnInit(): void { }
}
