import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faPlay } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'game-banner',
  templateUrl: './game-banner.component.html',
  styleUrls: ['./game-banner.component.scss']
})
export class GameBannerComponent implements OnInit {
  faPlay = faPlay;
  
  @Output()
  startGameEmitter!: EventEmitter<boolean>;
  
  constructor() { 
    this.startGameEmitter = new EventEmitter();
  }

  ngOnInit(): void {}

  public startGame(){
    this.startGameEmitter.emit(true)
  }
}
