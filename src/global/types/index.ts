export interface ICell {
  x: number;
  y: number;
  blink?: boolean;
}

export enum Direction {
  None = 0,
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4
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
  LockedGame,
}

export interface IGameCatalogItem {
  name: string;
  game: Game;
  letter: Letter;
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