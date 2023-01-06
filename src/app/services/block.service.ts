import { Injectable } from '@angular/core';

@Injectable()
export class BlockService {
  private blockRows!: Array<HTMLDivElement>;

  constructor() { 
    this.blockRows = new Array<HTMLDivElement>();
  }

  selected(e: any){
    console.log(e.clientX, e.clientY)
  }

  private createBlock(x: number, y: number): HTMLDivElement {
    const block: HTMLDivElement = document.createElement('div');
    block.classList.add("block")
    block.dataset['x'] = `${x}`;
    block.dataset['y'] = `${y}`;
    block.onclick = this.selected;

    return block;
  }

  public createBlockRows(size: number): HTMLDivElement[] {
    for (let r = 0; r < size; r++) {
      const row: HTMLDivElement = document.createElement('div');

      for (let b = 0; b < size; b++) {
        row.appendChild(this.createBlock(r, b))
      }

      this.blockRows.push(row)
    }
    return this.blockRows;
  }

  public insertBlockRows(playgound: HTMLDivElement, size: number): void{
    // Reseting the playground
    playgound.innerHTML = ''

    for(let blockRow of this.createBlockRows(size)){
      playgound.appendChild(blockRow)
    }
  }
}
