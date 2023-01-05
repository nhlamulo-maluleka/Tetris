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

  ngOnInit(): void {
    // this.playgroundElement =  
    // cols!: string
    // max: number = 7

    // this.cols = "*";

    // for (let i = 0; i <= this.max; i++) {
    //   console.log(this.cols)
    //   if (i < ((this.max / 2) | 0)) {
    //     this.cols += "*"
    //   } else {
    //     this.cols = this.cols.substring(0, this.cols.length - 1)
    //   }
    // }
    console.log("ngInit")
  }

}
