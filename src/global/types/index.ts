export enum Axis {
  None,
  X,
  Y
}

export interface ICell {
  x: number;
  y: number;
  blink?: boolean;
}

// don't change values!
export enum Direction {
  None = 0,
  Up = 1,
  Right = 2,
  Down = 3,
  Left = 4
}

export enum ControlButton {
  None = 'none',
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Rotate = 'rotate',
  Pause = 'pause',
}

export enum Game {
  None,
  Snake,
  Racing,
  Tanks,
  Tetris,
  LockedGame,
  RowFiller,
}

export interface IGameCatalogItem {
  name: string;
  game: Game;
  letter: Letter;
  lives: number;
  locked?: boolean;
}

export enum LetterPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum GameStatus {
  NewGame = 'newGame',
  Play = 'play',
  Win = 'win',
  Lose = 'lose'
}

export type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export enum Icon {
  Music = 'music',
  Pause = 'pause',
  Poo = 'poo'
}

export enum View {
  None,
  ClearScreen,
  Game,
  SelectGame,
}

export enum Figure {
  BlockI = 'blockI',
  BlockJ = 'blockJ',
  BlockL = 'blockL',
  BlockO = 'blockO',
  BlockS = 'blockS',
  BlockT = 'blockT',
  BlockZ = 'blockZ',
  Car = 'car',
  Car2 = 'car2',
  Tank = 'tank',
  Tank2 = 'tank2',
}