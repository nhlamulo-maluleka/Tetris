import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tetris';

  constructor() {
    // this.keyEmitter = new EventEmitter();
  }

  ngOnInit(): void {
    
  }
}
