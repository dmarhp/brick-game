export enum Axis {
  None,
  X,
  Y
}

export interface IBorders {
  left: ICell[];
  right: ICell[];
  top: ICell[];
  bottom: ICell[]
}

export type BorderPatter = boolean[];

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

export enum Figure {
  None = 0,
  BlockI,
  BlockJ,
  BlockL,
  BlockO,
  BlockS,
  BlockT,
  BlockZ,
  Car,
  CarPlayer,
  Crash1,
  Crash2,
  Tank,
  TankPlayer,
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

export enum GameStatus {
  NewGame = 'newGame',
  Play = 'play',
  Win = 'win',
  Lose = 'lose'
}

export enum Icon {
  Music = 'music',
  Pause = 'pause',
  Poo = 'poo'
}

export type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export enum LetterPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum View {
  None,
  ClearScreen,
  Game,
  SelectGame,
}
