import { Injectable } from '@angular/core';
import TetrisGame from '../helpers/TetrisGame';

@Injectable()
export class TetrisService extends TetrisGame {

  constructor() {
    super();
  }
}
