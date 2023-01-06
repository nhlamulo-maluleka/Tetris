import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { createCustomElement } from "@angular/elements"
import { BlockService } from 'src/app/services/block.service';

@Component({
  selector: 'game-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, AfterContentInit {
  playgroundRef!: HTMLDivElement;

  @ViewChild('playgroundContainer', { static: true })
  playgound!: ElementRef

  constructor(private blocks: BlockService) { }

  ngAfterContentInit(): void {
    this.playgroundRef = this.playgound.nativeElement;
    
    this.blocks.insertBlockRows(this.playgroundRef, 16)
  }

  ngOnInit(): void {}
}
