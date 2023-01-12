import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
  @Input()
  type!: string;

  @Input()
  score!: number;
  
  @Input()
  level!: number;
  
  constructor() { }

  ngOnInit(): void {}
}
