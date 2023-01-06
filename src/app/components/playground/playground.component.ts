import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { createCustomElement } from "@angular/elements"

@Component({
  selector: 'game-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, AfterContentInit {
  playgroundRef!: HTMLDivElement;

  @ViewChild('playgroundContainer', { static: true })
  playgound!: ElementRef

  constructor() { }

  ngAfterContentInit(): void {
    this.playgroundRef = this.playgound.nativeElement;
    
    const block: HTMLDivElement = document.createElement('div')
    block.classList.add("block")

    this.playgroundRef.append(block)
  }

  ngOnInit(): void {}

}
