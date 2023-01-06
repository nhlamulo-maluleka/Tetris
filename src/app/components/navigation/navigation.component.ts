import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  title!: any;

  constructor() { }

  ngOnInit(): void {
    
  }
}
